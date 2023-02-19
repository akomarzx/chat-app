import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { AuthService } from 'src/app/services/auth.service';
import { io } from 'socket.io-client';
import { SocketService, User } from 'src/app/services/socket.service';
import { BehaviorSubject } from 'rxjs';
import { ChatModalComponent } from './chat-modal/chat-modal.component';
import { ChatModalAnchorDirective } from 'src/app/directives/chat/chat-modal-anchor.directive';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  thisUser!: string;
  @ViewChild(ChatModalAnchorDirective, { static: true }) chatModalAnchor!: ChatModalAnchorDirective;

  constructor(private authService: AuthService,
    private appState: AppStateService,
    private socketService: SocketService
  ) {
    this.connectedUser$ = this.socketService.currentUsers;
  }
  ngAfterViewInit(): void {
  }

  connectedUser$: BehaviorSubject<User[]>;

  ngOnInit(): void {
    if (!this.authService.currentUser) {
      this.authService.isPending.next(true);
      this.authService.getUser().subscribe({
        next: (data) => {
          this.thisUser = data.user;
          this.authService.currentUser = data.user;
          this.authService.isPending.next(false);
          this.socketService.afterAuthConnection();
        },
        error: (error) => {
          this.appState.hasError.next(true);
          this.authService.isPending.next(false)
        }
      })
    }
  }

  onSelectUser(userId: string, username: string) {
    this.openChatModal(userId, username);
  }


  openChatModal(id: string, username: string) {
    const chatModalAnchorVcr = this.chatModalAnchor.vcr;
    chatModalAnchorVcr.clear();
    const chatModalComponent = chatModalAnchorVcr.createComponent<ChatModalComponent>(ChatModalComponent);
    chatModalComponent.instance.otherUserId = id;
    chatModalComponent.instance.otherUsername = username;
  }
}
