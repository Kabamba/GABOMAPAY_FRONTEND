import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/admin/transactions.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todaytrans',
  templateUrl: './todaytrans.component.html',
  styleUrls: ['./todaytrans.component.css'],
})
export class TodaytransComponent implements OnInit {
  transactions: any[] = [];

  isLoading: boolean;
  isAdding:boolean;

  showModal: boolean;
  showModalRaison :boolean;

  isShowing: boolean = false;
  isInvalding :boolean;
  
  isError = false;
  errors: any;

  key = '';
  reverse: boolean = false;

  p: number = 1;
  nom: string;

  details: any;

  image = environment.apiImage;

  dateStart: any;
  dateEnd: any;

  brandForm: FormGroup;
  addActive = false;

  constructor(
    private transac: TransactionsService,
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
      raison: new FormControl(''),
    });
  }

  list() {
    this.isLoading = true;
    this.transac.today().subscribe(
      (res: any) => {
        this.transactions = res.data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
      }
    );
  }

  valider(id: any) {
    this.transac.valider(id).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.ngOnInit();
      },
      (err) => {}
    );
  }

  invalider() {
    this.isAdding = true;

    this.transac
      .invalider(this.brandForm.value.id, this.brandForm.value.raison)
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

  search() {
    if (this.nom == '') {
      this.ngOnInit();
    } else {
      this.transactions = this.transactions.filter((res: any) => {
        return res.user.name
          .toLocaleLowerCase()
          .match(this.nom.toLocaleLowerCase());
      });
    }
  }

  searchPerDate() {
    if (!this.dateStart || !this.dateEnd) {
      this.toastr.warning('Veuillez remplire les deux dates');
    } else if (this.dateStart > this.dateEnd) {
      this.toastr.warning('La date de d??but doit toujours ??tre inf??rieure');
    } else {
      this.isLoading = false;
      this.transac.searchDate(this.dateStart, this.dateEnd).subscribe(
        (res: any) => {
          this.transactions = res.data;
          this.isLoading = true;
        },
        (err) => {
          this.isLoading = true;
        }
      );
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  activeModal() {
    this.showModal = true;
  }

  activeModalRaison() {
    this.showModalRaison = true;
  }

  disableModal() {
    this.showModal = false;
    this.showModalRaison = false;
  }

  stopEvent(event: Event) {
    event.stopPropagation();
  }

  show(id) {
    this.isShowing = false;
    this.transac.show(id).subscribe(
      (res: any) => {
        console.log(res.data);
        this.details = res.data;
        this.isShowing = true;
        this.activeModal();
      },
      (err) => {
        this.isShowing = true;
      }
    );
  }

  refuse(id) {
    this.isInvalding = true;

    this.transac.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.data.id),
          raison: new FormControl(res.data.raison),
        });
        this.isInvalding = false;

        this.activeModalRaison();
      },
      (err) => {
        this.isInvalding = false;
      }
    );
  }

  ngAfterViewInit(): void {
    document.querySelector('html').addEventListener('click', () => {
      this.addActive = false;
    })
  }
}
