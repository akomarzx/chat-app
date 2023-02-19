import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogInSignUpRequestDTO } from '../interfaces/LogInSignUpRequestDTO';
import { LogInResponseDTO } from '../interfaces/LogInResponseDTO';
import { SignUpResponseDTO } from '../interfaces/SignUpResponseDTO';
import { GetUserResponseDTO } from '../interfaces/GetUserResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    this.isPending = new BehaviorSubject<boolean>(false);
    this.isLogin = false;
  }

  baseUrl = 'http://192.168.2.229:3001/auth/';

  logIn(loginRequestDTO: LogInSignUpRequestDTO) {
    return this.http.post<LogInResponseDTO>(this.baseUrl + 'login', loginRequestDTO);
  }

  register(signUpRequestDTO: LogInSignUpRequestDTO) {
    return this.http.post<SignUpResponseDTO>(this.baseUrl + 'register', signUpRequestDTO);
  }

  getUser() {
    return this.http.get<GetUserResponseDTO>(this.baseUrl + 'user');
  }

  token: string | undefined;
  currentUser: string | undefined;
  isPending: BehaviorSubject<boolean>;
  isLogin: boolean;
}
