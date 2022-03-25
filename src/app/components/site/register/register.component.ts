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
  showImg = true;

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
  ) { }

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

  SetValue(id) {
    this.brandForm.value.country = id;
    const selctImg: any = document.querySelector('.sl-inp-txt img');
    const selctP: any = document.querySelector('.sl-inp-txt p');


    this.countries.forEach(country => {
      if (country.id == id) {
        selctImg.setAttribute('src', `../../../../assets/flags/${country.iso}.SVG`)
        selctP.textContent = country.name;
        this.showImg = false;
      }
    });
    
    const selectDropDown = document.querySelector('.select-dropdown');
    selectDropDown.classList.remove('active');
  }

  removeAutocomplete(e) {
    if (e.target.hasAttribute('readonly')) {
      e.target.removeAttribute('readonly');
      // fix for mobile safari to show virtual keyboard
      e.target.blur();
      e.target.focus();
    }
  }

  showSelect(event: Event) {
    const selectDropDown = document.querySelector('.select-dropdown');
    const icon = document.querySelector('.select-input .icon');
    icon.classList.toggle('active');
    selectDropDown.classList.toggle('active');
    event.stopPropagation();
  }

  // hiddenImg() {
  //   const selctImg: any = document.querySelector('.sl-inp-txt img');
  //   if (selctImg.src == "http://localhost:4200/") {
  //     selctImg.style.display = "none";
  //   } else {
  //     selctImg.style.display = "block";
  //   }
  // }

  showPass() {
    const input = document.querySelector("#password");
    const inputConfirm = document.querySelector("#password_confirmation");

    if (input.getAttribute("type") == "password" && inputConfirm.getAttribute("type") == "password") {
      input.setAttribute("type", "text");
      inputConfirm.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
      inputConfirm.setAttribute("type", "password");
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  ngAfterViewInit() {
    document.querySelector('html').addEventListener('click', function (e) {
      const selectDropDown = document.querySelector('.select-dropdown');
      const icon = document.querySelector('.select-input .icon');
      selectDropDown.classList.remove('active');
      icon.classList.remove('active');

    })
  }

}
