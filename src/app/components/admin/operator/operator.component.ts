import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OperatorService } from '../../../services/admin/operator.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css'],
})
export class OperatorComponent implements OnInit {
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
    private operator: OperatorService,
    private toastr: ToastrService
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
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      libelle: new FormControl(''),
      agent_number: new FormControl(''),
      min: new FormControl(''),
      max: new FormControl(''),
    });
  }

  sauvegarder() {
    this.isAdding = true;

    if (this.brandForm.value.id == '0') {
      this.operator
        .ajouter(
          this.brandForm.value.libelle,
          this.brandForm.value.agent_number,
          this.brandForm.value.min,
          this.brandForm.value.max
        )
        .subscribe(
          (res: any) => {
            if (res.visibility == false) {
              this.toastr.error(res.message);
            } else {
              this.toastr.success(res.message);
            }

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
      this.operator
        .editer(
          this.brandForm.value.id,
          this.brandForm.value.libelle,
          this.brandForm.value.agent_number,
          this.brandForm.value.min,
          this.brandForm.value.max
        )
        .subscribe(
          (res: any) => {
            if (res.visibility == false) {
              this.toastr.error(res.message);
            } else {
              this.toastr.success(res.message);
            }
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
    this.operator.list().subscribe(
      (res: any) => {
        this.operators = res;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = true;
      }
    );
  }

  activer(id: any) {
    this.operator.active(id).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success(res.message);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  search() {
    if (this.libelle == '') {
      this.ngOnInit();
    } else {
      this.operators = this.operators.filter((res: any) => {
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
    this.operator.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          libelle: new FormControl(res.libelle),
          max: new FormControl(res.max),
          min: new FormControl(res.min),
          agent_number: new FormControl(res.agent_number),
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
