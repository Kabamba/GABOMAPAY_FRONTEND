import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TarifService } from '../../../services/admin/tarif.service';
import { ToastrService } from 'ngx-toastr';
import { OperatorService } from '../../../services/admin/operator.service';

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.css'],
})
export class TarifComponent implements OnInit, AfterViewInit {
  tarifs: any[] = [];
  operators: any[] = [];

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
  
  constructor(
    private tarife: TarifService,
    private toastr: ToastrService,
    private ope: OperatorService
  ) {}

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
    this.getOperators();
  }

  getOperators() {
    this.ope.list().subscribe(
      (res: any) => {
        this.operators = res;
      },
      (err) => {}
    );
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      operator_id: new FormControl(''),
      operator_name: new FormControl(''),
      tarif_ope: new FormControl(''),
      tarif_perso: new FormControl(''),
    });
  }

  sauvegarder() {
    this.isAdding = true;

    if (this.brandForm.value.id == '0') {
      this.tarife
        .ajouter(
          this.brandForm.value.tarif_ope,
          this.brandForm.value.tarif_perso,
          this.brandForm.value.operator_id
        )
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
      this.tarife
        .update(
          this.brandForm.value.id,
          this.brandForm.value.tarif_ope,
          this.brandForm.value.tarif_perso
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
    this.tarife.list().subscribe(
      (res: any) => {
        this.tarifs = res.data;
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
      this.tarifs = this.tarifs.filter((res: any) => {
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
    this.tarife.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.data.id),
          operator_id: new FormControl(res.data.operateur_id),
          operator_name: new FormControl(res.data.operator_name),
          tarif_ope: new FormControl(res.data.frais_operateur),
          tarif_perso: new FormControl(res.data.frais_perso),
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
