import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  private accountId: string;
  private jwt: string;
  errorMsg: string;
  showErrorMsg: boolean;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.accountId = this.activatedRoute.snapshot.paramMap.get('id');
    this.jwt = this.activatedRoute.snapshot.paramMap.get('token');
    this.errorMsg = '';
    this.showErrorMsg = false;
  }

  resetPassword(password: string, confirmPassword: string): void {
    if (password !== confirmPassword) {
      // TODO
    } else {
      this.authService.resetPassword(password, this.accountId, this.jwt).subscribe(
        (res: any) => {
          this.router.navigate(['signin']);
        },
        (err: any) => {
          this.errorMsg = err.error.message;
          this.showErrorMsg = true;
        }
      );
    }
  }
}
