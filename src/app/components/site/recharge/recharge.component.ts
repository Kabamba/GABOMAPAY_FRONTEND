import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { TransactionService } from '../../../services/site/transaction.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

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
        });
      },
      (err) => {
        window.location.reload();
        console.log(err);
      }
    );
  }

  envoyer() {
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
    this.toastr.warning('Fonctionnalité en cours de développement.')
  }

}
