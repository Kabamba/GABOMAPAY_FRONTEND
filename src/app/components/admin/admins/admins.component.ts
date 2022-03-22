import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminAdminService } from 'src/app/services/admin/admin-admin.service';
import { CountryService } from '../../../services/admin/country.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  admins: any[] = [];

  isLoading: any;
  isAdding: any;

  isError = false;
  errors: any;

  showModal = false;

  brandForm: FormGroup;

  countries: any;

  key = 'id';
  reverse: boolean = false;

  p: number = 1;

  nom :string;
  addActive = false;

  constructor(
    private admin: AdminAdminService,
    private pays: CountryService,
    private toastr: ToastrService
  ) {}

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      name: new FormControl(''),
      prenom: new FormControl(''),
      email: new FormControl(''),
      country: new FormControl(''),
      sexe: new FormControl(''),
      password: new FormControl(''),
      password_conf: new FormControl(''),
      admin_level: new FormControl(''),
    });
  }

  toggle(event: Event) {
    if (this.addActive == false) {
      this.addActive = true;
    } else {
      this.addActive = false;
    }
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.resetForm();
    this.list();
    this.getCountries();
  }

  list() {
    this.isLoading = true;
    this.admin.list().subscribe(
      (res: any) => {
        this.admins = res.data;
        console.log(res)
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
      }
    );
  }

  getCountries() {
    this.pays.list().subscribe(
      (res:any) => {
        this.countries = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  activer(id: any) {
    this.admin.active(id).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
      },
      (err) => {}
    );
  }

  sauvegarder() {
    this.isAdding = true;

    if (this.brandForm.value.id == '0') {
      this.admin
        .ajouter(
          this.brandForm.value.name,
          this.brandForm.value.prenom,
          this.brandForm.value.email,
          this.brandForm.value.sexe,
          this.brandForm.value.country,
          this.brandForm.value.admin_level,
          this.brandForm.value.password,
          this.brandForm.value.password_conf
        )
        .subscribe(
          (res: any) => {
            this.toastr.success(res.message);
            this.ngOnInit();
            this.disableModal();
            this.isAdding = false;
          },
          (err) => {
            this.errors = err.error.errors;
            console.log(this.errors);
            this.isError = true;
            this.isAdding = false;
          }
        );
    } else {
      this.admin
        .editer(
          this.brandForm.value.id,
          this.brandForm.value.name,
          this.brandForm.value.prenom,
          this.brandForm.value.email,
          this.brandForm.value.sexe,
          this.brandForm.value.country,
          this.brandForm.value.admin_level,
          this.brandForm.value.password,
          this.brandForm.value.password_conf
        )
        .subscribe(
          (res: any) => {
            this.toastr.success(res.message);
            this.ngOnInit();
            this.disableModal();
            this.isAdding = false;
          },
          (err) => {
            this.errors = err.error.errors;
            this.isError = true;
            this.isAdding = false;
          }
        );
    }
  }

  // Events
  activeModal() {
    this.showModal = true;
  }

  disableModal() {
    this.showModal = false;
    this.errors = '';
    this.isError = false;
    this.resetForm();
  }

  stopEvent(event: Event) {
    event.stopPropagation();
  }

  show(id) {
    this.admin.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          name: new FormControl(res.name),
          prenom: new FormControl(res.prenom),
          email: new FormControl(res.email),
          sexe: new FormControl(res.sexe),
          country: new FormControl(res.country_id),
          admin_level: new FormControl(res.admin_level),
        });
        this.activeModal();
      },
      (err) => {}
    );
  }

  search() {
    if (this.nom == '') {
      this.ngOnInit();
    } else {
      this.admins = this.admins.filter((res: any) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.nom.toLocaleLowerCase());
      });
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngAfterViewInit(): void {
    document.querySelector('html').addEventListener('click', () => {
      this.addActive = false;
    })
  }
}
