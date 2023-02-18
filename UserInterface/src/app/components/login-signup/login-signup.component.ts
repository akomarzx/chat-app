import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { LogInSignUpRequestDTO } from 'src/app/interfaces/LogInSignUpRequestDTO';
import { AppStateService } from 'src/app/services/app-state.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit, OnDestroy {

  isLogInMode: boolean;
  disableButton: boolean;

  isPendingSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private appState: AppStateService,
    private router: Router) {
    this.isLogInMode = true;
    this.disableButton = false;
    this.isPendingSubscription = this.authService.isPending.subscribe(
      (data) => {
        this.disableButton = data;
      }
    )
  }
  ngOnDestroy(): void {
    this.isPendingSubscription.unsubscribe();
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
      this.authService.isPending.next(true);
      this.authService.logIn(this.credentialsForm.value as LogInSignUpRequestDTO).subscribe(
        {
          next: (data) => {
            this.authService.token = data.token;
            this.authService.isLogin = true;
            this.authService.isPending.next(false);
            this.appState.hasError.next(false);
            this.router.navigate(['/', 'chat']);
          },
          error: (err) => {
            this.appState.hasError.next(true);
            this.authService.isPending.next(false);
          }
        }
      )
    } else {
      this.authService.isPending.next(true);
      this.authService.register(this.credentialsForm.value as LogInSignUpRequestDTO).subscribe(
        {
          next: (data) => {
            this.authService.isPending.next(false);
            this.isLogInMode = true;
          },
          error: (err) => {
            this.appState.hasError.next(true);
            this.authService.isPending.next(false);
          }
        }
      )
    }
  }
}
