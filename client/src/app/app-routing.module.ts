import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {RequestPasswordResetComponent} from './request-password-reset/request-password-reset.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {ConfirmAccountComponent} from './confirm-account/confirm-account.component';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';
import {ExploreCoursesComponent} from './explore-courses/explore-courses.component';
import {ExploreSchedulesComponent} from './explore-schedules/explore-schedules.component';
import {Err404Component} from './errors/err404/err404.component';
import {CreateScheduleComponent} from './create-schedule/create-schedule.component';
import {EditScheduleComponent} from './edit-schedule/edit-schedule.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'request-password-reset', component: RequestPasswordResetComponent},
  {path: 'password-reset/:id/:token', component: PasswordResetComponent},
  {path: 'confirm-account/:token', component: ConfirmAccountComponent},
  {path: 'account', component: AccountComponent},
  {path: 'courses', component: ExploreCoursesComponent},
  {path: 'schedules', component: ExploreSchedulesComponent},
  {path: 'schedules/create', component: CreateScheduleComponent},
  {path: 'schedules/edit/:id', component: EditScheduleComponent},
  {path: '**', component: Err404Component},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
