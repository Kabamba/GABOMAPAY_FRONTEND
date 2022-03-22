import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DevisesService } from 'src/app/services/admin/devises.service';

@Component({
  selector: 'app-devises',
  templateUrl: './devises.component.html',
  styleUrls: ['./devises.component.css'],
})
export class DevisesComponent implements OnInit {

  devises: any[] = [];

  isLoading: any;
  isAdding: any;

  isError = false;
  errors: any;

  showModal = false;

  key = 'id';
  reverse: boolean = false;

  p: number = 1;
  libelle: string;

  brandForm: FormGroup;
  addActive = false;
  
  constructor(private devise: DevisesService, private toastr: ToastrService) {}

  toggle(event: Event) {
    if (this.addActive == false) {
      this.addActive = true;
    } else {
      this.addActive = false;
    }

    event.stopPropagation();
  }
  
  ngOnInit(): void {
    this.list();
    this.resetForm();
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      libelle: new FormControl(''),
      symbole: new FormControl(''),
    });
  }

  sauvegarder() {
    this.isAdding = true;

    if (this.brandForm.value.id == '0') {
      this.devise
        .ajouter(this.brandForm.value.libelle, this.brandForm.value.symbole)
        .subscribe(
          (res: any) => {
            this.toastr.success(res.message);
            this.ngOnInit();
            this.disableModal();
            this.isAdding = false;
          },
          (err) => {
            console.log(err);
            this.errors = err.error.errors;
            this.isError = true;
            this.isAdding = false;
          }
        );
    } else {
      this.devise
        .editer(
          this.brandForm.value.id,
          this.brandForm.value.libelle,
          this.brandForm.value.symbole
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

  list() {
    this.isLoading = true;
    this.devise.list().subscribe(
      (res: any) => {
        this.devises = res;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
      }
    );
  }

  activer(id: any) {
    this.devise.active(id).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
      },
      (err) => {
      }
    );
  }

  search() {
    if (this.libelle == '') {
      this.ngOnInit();
    } else {
      this.devises = this.devises.filter((res: any) => {
        return res.libelle
          .toLocaleLowerCase()
          .match(this.libelle.toLocaleLowerCase());
      });
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

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
    this.devise.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          libelle: new FormControl(res.libelle),
          symbole: new FormControl(res.symbole),
        });
        this.activeModal();
      },
      (err) => {}
    );
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    document.querySelector('html').addEventListener('click', () => {
      this.addActive = false;
    })
  }
}
