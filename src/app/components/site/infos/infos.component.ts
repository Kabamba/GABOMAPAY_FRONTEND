import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css'],
})
export class InfosComponent implements OnInit {
  brandForm: FormGroup;

  isLoading = false;
  ShowSkeleton = false;

  invalide: any;
  errors = {
    id: '',
    name: '',
    email: '',
    prenom: '',
    sexe: '',
    phone: '',
    adresse: '',
    profile : ''
  };

  user = {
    id: '',
    name: '',
    email: '',
    prenom: '',
    sexe: '',
    phone: '',
    adresse: '',
  };

  url: any;
  file: any;

  constructor(
    private auth: SiteAuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('site');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('site');
  }

  ngOnInit(): void {
    this.resetForm();
    this.getUser();
  }

  uploading(event) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.url = reader.result as string;
    };
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      prenom: new FormControl(''),
      sexe: new FormControl('0'),
      phone: new FormControl(''),
      adresse: new FormControl(''),
      profile: new FormControl(''),
    });
  }

  resetError(){
    this.errors.email = "";
    this.errors.adresse = ""
    this.errors.name = "";
    this.errors.prenom = "";
    this.errors.phone = "";
    this.errors.sexe = "";
    this.errors.profile = "";
  }

  getUser() {
    this.ShowSkeleton = true;

    this.auth.user().subscribe(
      (res: any) => {
        this.user = res;
        this.brandForm = new FormGroup({
          id: new FormControl(this.user.id),
          name: new FormControl(this.user.name),
          email: new FormControl(this.user.email),
          prenom: new FormControl(this.user.prenom),
          sexe: new FormControl(this.user.sexe),
          phone: new FormControl(this.user.phone),
          adresse: new FormControl(this.user.adresse),
          profile: new FormControl(''),
        });
        this.ShowSkeleton = false;
      },
      (err) => {
        this.ShowSkeleton = false;
        console.log(err);
      }
    );
  }

  update() {
    this.isLoading = true;

    const formData = new FormData();

    formData.append('id', this.brandForm.value.id);
    formData.append('name', this.brandForm.value.name);
    formData.append('email', this.brandForm.value.email);
    formData.append('prenom', this.brandForm.value.prenom);
    formData.append('sexe', this.brandForm.value.sexe);
    formData.append('phone', this.brandForm.value.phone);
    formData.append('adresse', this.brandForm.value.adresse);

    if (this.file) {
      formData.append('profile', this.file, this.file.name);
    }

    this.auth.update(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.toastr.success(res.message);
        this.resetError();
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        this.errors = err.error.errors;
        this.isLoading = false;
      }
    );
  }
}
