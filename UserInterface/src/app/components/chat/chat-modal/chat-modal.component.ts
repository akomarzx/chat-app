import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent implements OnInit, AfterViewInit {

  @Input() otherUsername!: string
  @Input() otherUserId!: string

  messages$: BehaviorSubject<{ message: string | null | undefined, username: string | undefined | null }[]>;
  constructor(private socketService: SocketService, private fb: FormBuilder, private auth: AuthService) {
    this.messages$ = new BehaviorSubject<{ message: string | null | undefined, username: string | null | undefined }[]>([]);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.socketService.socket.on('recieve message', (data) => {
      this.messages$.next([...this.messages$.getValue(), data])
      console.log('Received a message');
    })
  }

  onSendMessage() {
    this.messages$.next([...this.messages$.getValue(), { message: this.messageForm.get('messageBox')?.value, username: this.auth.currentUser }])
    this.socketService.socket.emit('sent message', { id: this.otherUserId, username: this.auth.currentUser, message: this.messageForm.get('messageBox')?.value });
    this.messageForm.reset();
  }

  messageForm = this.fb.group({
    messageBox: []
  })
}
