import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';

interface User {
  userId: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  serverUrl = 'http://localhost:5001';

  socket!: Socket;
  socketId: string | undefined;
  currentUsers: User[] = [];
  constructor(private authService: AuthService) {
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
      this.currentUsers = [...this.currentUsers, ...users];
    })

    this.socket.on('new user', (newUser: User) => {
      this.currentUsers = [...this.currentUsers, newUser];
    })

    this.socket.on('user disconnected', (userId) => {
      this.currentUsers = this.currentUsers.filter((user) => {
        if (user.userId === userId) {
          return false
        }
        return true;
      })
    })

  
  }
}
