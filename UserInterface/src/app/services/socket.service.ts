import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';

export interface User {
  userId: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  serverUrl = 'http://192.168.2.229:5001';

  socket!: Socket;
  socketId: string | undefined;
  currentUsers: BehaviorSubject<User[]>;

  constructor(private authService: AuthService) {
    this.currentUsers = new BehaviorSubject<User[]>([]);
  }

  connectSocket() {
    this.socket = io(this.serverUrl, { autoConnect: false });
    this.socket.onAny((event, args) => {
      console.log(event, args);
    })
  }

  afterAuthConnection() {
    this.socket.auth = { username: this.authService.currentUser };
    this.socket.connect();

    this.socket.on('users', (users: User[]) => {
      this.currentUsers.next([...this.currentUsers.getValue(), ...users])
    })

    this.socket.on('new user', (newUser: User) => {
      this.currentUsers.next([...this.currentUsers.getValue(), newUser]);
    })

    this.socket.on('user disconnected', (userId) => {
      let currentUsersTemp = this.currentUsers.getValue().filter((user: User) => {
        if (user.userId === userId) {
          return false
        }
        return true;
      })
      this.currentUsers.next(currentUsersTemp);
    })


  }
}
