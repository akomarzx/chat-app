import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LogInSignUpRequestDTO } from 'src/app/interfaces/LogInSignUpRequestDTO';
import { AppStateService } from 'src/app/services/app-state.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  isLogInMode: boolean;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private appState: AppStateService,
    private router: Router) {
    this.isLogInMode = true;
  }

  changeMode() {
    this.isLogInMode = !this.isLogInMode;
  }
  ngOnInit(): void {
  }

  credentialsForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(7)]]
  })

  onSubmit() {
    if (this.isLogInMode) {
      this.authService.isPending = true;
      this.authService.logIn(this.credentialsForm.value as LogInSignUpRequestDTO).subscribe(
        {
          next: (data) => {
            this.authService.token = data.token;
            this.authService.isLogin = true;
            this.authService.isPending = false;
            this.router.navigate(['/', 'chat']);
          },
          error: (err) => {
            this.appState.hasError.next(true);
            this.authService.isPending = false;
          }
        }
      )
    } else {
      this.authService.isPending = true;
      this.authService.register(this.credentialsForm.value as LogInSignUpRequestDTO).subscribe(
        {
          next: (data) => {
            this.authService.isPending = false;
            this.isLogInMode = true;
          },
          error: (err) => {
            this.appState.hasError.next(true);
            this.authService.isPending = false;
          }
        }
      )
    }
  }
}
