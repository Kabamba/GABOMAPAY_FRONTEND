import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css'],
})
export class KycComponent implements OnInit {
  ShowSkeleton = false;
  isLoading = false;

  user: any;

  brandForm: FormGroup;

  url: any;
  identite: any;
  file: any;

  errors = {
    identite: '',
  };

  urlImage = environment.apiImage;

  constructor(
    private auth: SiteAuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.getUser();
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl(''),
      identite: new FormControl(''),
    });
  }

  getUser(){
    this.ShowSkeleton = true;

    this.auth.user().subscribe(
      (res: any) => {
        this.user = res;
        this.brandForm = new FormGroup({
          id: new FormControl(this.user.id),
          identite: new FormControl(''),
        });
        this.identite = res.identite;
        this.ShowSkeleton = false;
      },
      (err) => {
        this.ShowSkeleton = false;
        console.log(err);
      }
    );
  }

  resetError(){
    this.errors.identite = ''
  }
  
  uploading(event) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.url = reader.result as string;
    };
  }

  update() {
    this.isLoading = true;

    const formData = new FormData();

    formData.append('id', this.brandForm.value.id);

    if (this.file) {
      formData.append('identite', this.file, this.file.name);
    }

    this.auth.kyc(formData).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.isLoading = false;
        this.resetForm();
        this.resetError();
      },
      (err) => {
        this.errors = err.error.errors;
        console.log(err)
        this.isLoading = false;
      }
    );
  }
}
