import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  brandForm: FormGroup;

  constructor(private auth: SiteAuthService, private router: Router,private toastr: ToastrService) {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('site');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('site');
  }

  resetForm() {
    this.brandForm = new FormGroup({
      email: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  isLoading = false;
  invalide: any;
  errors = {
    email: '',
  };

  forgot() {
    this.isLoading = true;

    this.auth.forgot(this.brandForm.value.email).subscribe(
      (res:any) => {
        if (res.visibility == true) {
          this.toastr.success(res.message)
          this.errors.email = "";
          this.invalide = "";
          this.resetForm();
          this.isLoading = false;
          this.router.navigate(['/site/login'])
        }else{
          this.isLoading = false;
          this.invalide = res.message;
          this.errors.email = ""
        }
       console.log(res)
      },
      (err) => {
        this.errors = err.error.errors;
        console.log(err)
        this.isLoading = false;
      }
    );
  }
}
