import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { ChatComponent } from './components/chat/chat.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ChatModalComponent } from './components/chat/chat-modal/chat-modal.component';
import { ChatModalAnchorDirective } from './directives/chat/chat-modal-anchor.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    ChatComponent,
    ChatModalComponent,
    ChatModalAnchorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
