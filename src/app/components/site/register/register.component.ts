import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from '../../../services/admin/country.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  brandForm: FormGroup;

  isLoading = false;
  ShowSkeleton = false;

  invalide: any;
  errors = {
    name: '',
    email: '',
    phone: '',
    prenom: '',
    country: '',
    password: '',
    password_confirmation: '',
  };

  countries: any[] = [];

  constructor(
    private auth: SiteAuthService,
    private countri: CountryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('site');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('site');
  }

  resetForm() {
    this.brandForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      prenom: new FormControl(''),
      country: new FormControl(''),
      password: new FormControl(''),
      password_confirmation: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.resetForm();
    this.getCountry();
  }

  register() {
    this.isLoading = true;
    this.auth
      .register(
        this.brandForm.value.name,
        this.brandForm.value.prenom,
        this.brandForm.value.email,
        this.brandForm.value.phone,
        this.brandForm.value.country,
        this.brandForm.value.password,
        this.brandForm.value.password_confirmation
      )
      .subscribe(
        (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.auth.toggleLogin(true);
          this.router.navigate(['/site/home']);
        },
        (err) => {
          console.log(err);
          this.errors = err.error.errors;
          this.isLoading = false;
        }
      );
  }

  getCountry() {
    this.ShowSkeleton = true;
    this.countri.list().subscribe(
      (res: any) => {
        this.countries = res.data;
        this.ShowSkeleton = false;
      },
      (err) => {
        this.ShowSkeleton = false;
        console.log(err);
      }
    );
  }

  SetValue(id){
    this.brandForm.value.country = id;
  }

  removeAutocomplete(e) {
    if (e.target.hasAttribute('readonly')) {
      e.target.removeAttribute('readonly');
      // fix for mobile safari to show virtual keyboard
      e.target.blur();
      e.target.focus();
    }
  }
}
