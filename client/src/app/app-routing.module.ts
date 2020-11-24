import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {RequestPasswordResetComponent} from './request-password-reset/request-password-reset.component';

const routes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'request-password-reset', component: RequestPasswordResetComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
