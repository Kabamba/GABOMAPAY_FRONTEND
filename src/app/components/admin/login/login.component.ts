import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminAuthService } from '../../../services/admin/admin-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  invalide: any;
  errors = {
    email: '',
    password: '',
  };

  constructor(
    private auth: AdminAuthService,
    private router: Router,
    private tosatr: ToastrService
  ) {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('login');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('login');
  }

  ngOnInit(): void {}

  login(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    this.auth.Login(email, password).subscribe(
      (res: any) => {
        if (res.visibility == true) {
          if (res.is_admin == 1) {
            if (res.is_active == 0) {
              this.tosatr.error('Compte administrateur désactivé');
              this.router.navigate(['/site/login']);
            } else {
              localStorage.setItem('user', JSON.stringify(res));
              this.auth.toggleLogin(true);
              this.router.navigate(['/admin/home']);
            }
          } else {
            this.router.navigate(['/site/login']);
          }

          console.log(res);
        } else {
          this.invalide = res.message;
          this.errors.email = '';
          this.errors.password = '';
        }

        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);

        this.errors = err.error.errors;
      }
    );
  }
}
