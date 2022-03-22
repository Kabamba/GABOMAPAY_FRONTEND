import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  brandForm: FormGroup;
  token: any;

  constructor(
    private auth: SiteAuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('site');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('site');
  }

  resetForm() {
    this.brandForm = new FormGroup({
      password: new FormControl(''),
      password_confirmation: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.resetForm();
    this.route.queryParams.subscribe((param: any) => {
      this.token = param.token;
    });
  }

  isLoading = false;
  invalide: any;
  errors = {
    password: '',
    password_confirmation: '',
  };

  reset() {
    this.isLoading = true;

    this.auth
      .reset(
        this.token,
        this.brandForm.value.password,
        this.brandForm.value.password_confirmation
      )
      .subscribe(
        (res: any) => {
          if (res.visibility == true) {
            this.router.navigate(['/site/login']);
          } else {
            this.errors.password = '';
            this.invalide = res.message;
          }

          console.log(res);
          this.isLoading = false;
        },
        (err) => {
          this.errors = err.error.errors;
          console.log(err);
          this.isLoading = false;
        }
      );
  }
}
