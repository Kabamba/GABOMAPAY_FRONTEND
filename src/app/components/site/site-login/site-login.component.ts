import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-site-login',
  templateUrl: './site-login.component.html',
  styleUrls: ['./site-login.component.css'],
})
export class SiteLoginComponent implements OnInit {
  brandForm: FormGroup;

  constructor(private auth: SiteAuthService, private router: Router,private tosatr:ToastrService) {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('site');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('site');
  }

  resetForm() {
    this.brandForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  isLoading = false;
  invalide: any;
  errors = {
    email: '',
    password: '',
  };

  login() {
    this.isLoading = true;
    this.auth
      .Login(this.brandForm.value.email, this.brandForm.value.password)
      .subscribe(
        (res: any) => {
          if (res.visibility == true) {
            if (res.is_admin == 2) {
              
              if (res.is_active == 0) {
                this.tosatr.error('Votre compte est désactivé');
                this.router.navigate(['/site/login']);
              } else {
                localStorage.setItem('user', JSON.stringify(res));
                this.auth.toggleLogin(true);
                this.router.navigate(['/site/home']);
              }
            }else {
              this.router.navigate(['/site/login']);
            }
          } else {
            this.invalide = res.message;
            this.resetForm();
          }
         
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
          this.errors = err.error.errors;
        }
      );
  }

  removeAutocomplete(e){
    if (e.target.hasAttribute('readonly')) {
      e.target.removeAttribute('readonly');
      // fix for mobile safari to show virtual keyboard
      e.target.blur();    e.target.focus();  }
  }

  showPass(){
    const input  = document.querySelector("#password");
    if(input.getAttribute("type") == "password"){
      input.setAttribute("type", "text");
    }else{
      input.setAttribute("type", "password");
    }
  }
}
