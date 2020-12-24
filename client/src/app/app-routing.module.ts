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
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {DmcaPolicyComponent} from './dmca-policy/dmca-policy.component';
import {AcceptableUsePolicyComponent} from './acceptable-use-policy/acceptable-use-policy.component';
import {SecurityPolicyComponent} from './security-policy/security-policy.component';
import {AdminComponent} from './admin/admin.component';
import {ManageAccountsComponent} from './manage-accounts/manage-accounts.component';
import {ManageReviewsComponent} from './manage-reviews/manage-reviews.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'request-password-reset', component: RequestPasswordResetComponent},
  {path: 'password-reset/:id/:token', component: PasswordResetComponent},
  {path: 'confirm-account/:token', component: ConfirmAccountComponent},
  {path: 'account', component: AccountComponent},
  {path: 'courses', component: ExploreCoursesComponent},
  {path: 'courses/:id', component: CourseDetailComponent},
  {path: 'schedules', component: ExploreSchedulesComponent},
  {path: 'schedules/create', component: CreateScheduleComponent},
  {path: 'schedules/edit/:id', component: EditScheduleComponent},
  {path: 'privacy', component: PrivacyPolicyComponent},
  {path: 'dmca', component: DmcaPolicyComponent},
  {path: 'acceptable-use', component: AcceptableUsePolicyComponent},
  {path: 'security', component: SecurityPolicyComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/manage-accounts', component: ManageAccountsComponent},
  {path: 'admin/manage-reviews', component: ManageReviewsComponent},
  {path: '**', component: Err404Component},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
