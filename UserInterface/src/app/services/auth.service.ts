import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInSignUpRequestDTO } from '../interfaces/LogInSignUpRequestDTO';
import { LogInResponseDTO } from '../interfaces/LogInResponseDTO';
import { SignUpResponseDTO } from '../interfaces/SignUpResponseDTO';
import { GetUserResponseDTO } from '../interfaces/GetUserResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { 
    this.isPending = false;
    this.isLogin = false;
  }

  logIn(loginRequestDTO: LogInSignUpRequestDTO) {
    return this.http.post<LogInResponseDTO>('http://localhost:3001/auth/login', loginRequestDTO);
  }

  register(signUpRequestDTO: LogInSignUpRequestDTO) {
    return this.http.post<SignUpResponseDTO>('http://localhost:3001/auth/register', signUpRequestDTO);
  }

  getUser() {
    return this.http.get<GetUserResponseDTO>('http://localhost:3001/auth/user');
  }

  token: string | undefined;
  currentUser: string | undefined;
  isPending: boolean;
  isLogin : boolean;
}
