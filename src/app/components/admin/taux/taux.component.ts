import { Component, OnInit, AfterViewInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TauxService } from '../../../services/admin/taux.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-taux',
  templateUrl: './taux.component.html',
  styleUrls: ['./taux.component.css']
})
export class TauxComponent implements OnInit {

  tauxes: any[] = [];

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
  
  constructor(private taux: TauxService, private toastr: ToastrService) {}

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
      taux: new FormControl(''),
    });
  }

  update() {
    this.isAdding = true;

    this.taux
        .update(
          this.brandForm.value.id,
          this.brandForm.value.taux,
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

  list() {
    this.isLoading = true;
    this.taux.list().subscribe(
      (res: any) => {
        this.tauxes = res;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
      }
    );
  }

  search() {
    if (this.libelle == '') {
      this.ngOnInit();
    } else {
      this.tauxes = this.tauxes.filter((res: any) => {
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
    this.taux.show(id).subscribe(
      (res: any) => {
        console.log(res)
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          libelle: new FormControl(res.libelle),
          taux: new FormControl(res.taux_change),
        });
        this.activeModal();
      },
      (err) => {}
    );
  }

  ngAfterViewInit(): void {
    document.querySelector('html').addEventListener('click', () => {
      this.addActive = false;
    })
  }
}
