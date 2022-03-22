import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { TransactionService } from '../../../services/site/transaction.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from '../../../services/admin/country.service';

@Component({
  selector: 'app-transac-international',
  templateUrl: './transac-international.component.html',
  styleUrls: ['./transac-international.component.css']
})
export class TransacInternationalComponent implements OnInit {

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
    country : ''
  };

  details: any;
  countries: any[] = [];

  file: any;
  url: any;

  constructor(
    private auth: SiteAuthService,
    private transac: TransactionService,
    private countri: CountryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl(''),
      amount: new FormControl(''),
      recever_number: new FormControl(''),
      country: new FormControl(''),
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
    this.getCountry();
    this.resetForm();
  }

  resetError(){
    this.errors.amount = '';
    this.errors.recever_number = '';
  }

  getUser() {
    this.ShowSkeleton = true;
    
    this.auth.user().subscribe(
      (res: any) => {
        this.user = res;
        this.brandForm = new FormGroup({
          id: new FormControl(this.user.id),
          amount: new FormControl(''),
          recever_number: new FormControl(''),
          country: new FormControl(''),
        });
        this.ShowSkeleton = false;
      },
      (err) => {
        this.ShowSkeleton = false;
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

  getCountry() {
    this.ShowSkeleton = true;
    this.countri.listoccupe().subscribe(
      (res: any) => {
        this.countries = res.data;
        this.ShowSkeleton = false;
      },
      (err) => {
        this.ShowSkeleton = false;
        console.log(err);
      }
    );
  }

  SetValue(id){
    this.brandForm.value.country = id;
  }

}
