import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { ExploreCoursesComponent } from './explore-courses/explore-courses.component';
import { ExploreSchedulesComponent } from './explore-schedules/explore-schedules.component';
import { Err404Component } from './errors/err404/err404.component';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { EditScheduleComponent } from './edit-schedule/edit-schedule.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    RequestPasswordResetComponent,
    PasswordResetComponent,
    ConfirmAccountComponent,
    HomeComponent,
    HeaderComponent,
    AccountComponent,
    ExploreCoursesComponent,
    ExploreSchedulesComponent,
    Err404Component,
    CreateScheduleComponent,
    EditScheduleComponent,
    CourseDetailComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
