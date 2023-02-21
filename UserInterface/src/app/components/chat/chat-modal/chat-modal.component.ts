import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent implements OnInit, AfterViewInit {

  @Input() otherUsername!: string
  @Input() otherUserId!: string


  messages$: BehaviorSubject<{ message: string | null | undefined, sender: string | undefined | null }[]>;
  constructor(private socketService: SocketService, private fb: FormBuilder, private auth: AuthService, private chatService: ChatServiceService) {
    this.messages$ = new BehaviorSubject<{ message: string | null | undefined, sender: string | null | undefined }[]>([]);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.socketService.socket.on('recieve message', (data) => {
      this.messages$.next([...this.messages$.getValue(), data])
    })
    this.chatService.getAllMessages(this.auth.currentUser!, this.otherUsername).subscribe(
      {
        next: (data: any) => {
          if (!data.messages) {
            this.messages$.next([]);
            return;
          }
          this.messages$.next(data.messages);
        }
      }
    )
  }

  onSendMessage() {
    console.log(this.messages$.getValue());
    this.messages$.next([...this.messages$.getValue(), { message: this.messageForm.get('messageBox')?.value, sender: this.auth.currentUser }])
    this.socketService.socket.emit('sent message', {
      id: this.otherUserId,
      message: this.messageForm.get('messageBox')?.value,
      recepient: this.otherUsername,
      sender: this.auth.currentUser,
    });
    this.messageForm.reset();
  }

  messageForm = this.fb.group({
    messageBox: [null, Validators.required]
  })
}
