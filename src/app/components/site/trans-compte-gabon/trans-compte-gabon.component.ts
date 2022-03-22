import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { TransactionService } from '../../../services/site/transaction.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trans-compte-gabon',
  templateUrl: './trans-compte-gabon.component.html',
  styleUrls: ['./trans-compte-gabon.component.css']
})
export class TransCompteGabonComponent implements OnInit {

  user: any;

  brandForm: FormGroup;

  isLoading = false;
  ShowSkeleton = false;
  isConfirming = false;

  invalide: any;

  showModal: boolean;

  errors = {
    amount: '',
    recever_number: '',
  };

  details: any;

  file: any;
  url: any;

  constructor(
    private auth: SiteAuthService,
    private transac: TransactionService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl(''),
      amount: new FormControl(''),
      recever_number: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('site');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('site');
  }

  ngOnInit(): void {
    this.getUser();
    this.resetForm();
  }

  resetError(){
    this.errors.amount = '';
    this.errors.recever_number = '';
  }

  getUser() {
    this.auth.user().subscribe(
      (res: any) => {
        this.user = res;
        this.brandForm = new FormGroup({
          id: new FormControl(this.user.id),
          amount: new FormControl(''),
          recever_number: new FormControl(''),
        });
      },
      (err) => {
        window.location.reload();
        console.log(err);
      }
    );
  }

  envoyer() {
    this.isConfirming = true;

    this.transac
      .TransCompteGabon(
        this.brandForm.value.id,
        this.brandForm.value.amount,
        this.brandForm.value.recever_number
      )
      .subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          this.isConfirming = false;
          this.router.navigate(['site/transactions']);
          this.closeModal();
          this.resetError();
        },
        (err) => {
          this.isConfirming = false;
          console.log(err);
        }
      );
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  stop(event: Event) {
    event.stopPropagation();
  }

  simuler() {
    this.isLoading = true;

    this.transac
      .simuler_compte_gabon(
        this.brandForm.value.id,
        this.brandForm.value.amount,
        this.brandForm.value.recever_number
      )
      .subscribe(
        (res: any) => {
          if (res.visibility == false) {
            this.toastr.error(res.message);
          } else {
            this.openModal();
            this.details = res;
            this.resetError();
          }
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;

          this.errors = err.error.errors;
        }
      );
  }

}
