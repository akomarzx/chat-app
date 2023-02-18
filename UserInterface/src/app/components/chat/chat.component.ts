import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { AuthService } from 'src/app/services/auth.service';
import { io } from 'socket.io-client';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private authService: AuthService,
    private appState: AppStateService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    if (!this.authService.currentUser) {
      this.authService.isPending.next(true);
      this.authService.getUser().subscribe({
        next: (data) => {
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

}
