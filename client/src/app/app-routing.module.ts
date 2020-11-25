import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {RequestPasswordResetComponent} from './request-password-reset/request-password-reset.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {ConfirmAccountComponent} from './confirm-account/confirm-account.component';

const routes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'request-password-reset', component: RequestPasswordResetComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'confirm-account/:token', component: ConfirmAccountComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
