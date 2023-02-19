import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from './services/app-state.service';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {

  errorSubscription!: Subscription;
  shouldDisplay: boolean;

  onErrorDismissed() {
    this.appState.hasError.next(false);
  }

  constructor(private appState: AppStateService, private socket: SocketService, public auth: AuthService) {
    this.shouldDisplay = false;
  }
  ngOnInit(): void {
    this.errorSubscription = this.appState.hasError.subscribe(
      (data) => {
        this.shouldDisplay = data;
      }
    )
    this.socket.connectSocket();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}


