import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { TransactionService } from '../../../services/site/transaction.service';
import { SiteAuthService } from '../../../services/site/site-auth.service';

@Component({
  selector: 'app-site-transactions',
  templateUrl: './site-transactions.component.html',
  styleUrls: ['./site-transactions.component.css'],
})
export class SiteTransactionsComponent implements OnInit {
  user = {
    id: '',
    name: '',
    prenom: '',
    profile: '',
    country_id: '',
    solde: '',
  };

  transactions: any[] = [];

  showSkeleton = false;

  p: number = 1;

  constructor(
    public auth: SiteAuthService,
    private transac: TransactionService
  ) {}

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.showSkeleton = true;

    this.auth.user().subscribe(
      (res: any) => {
        this.user = res;
        
        this.transac.list(this.user.id).subscribe(
          (res: any) => {
            this.transactions = res;
            console.log(this.transactions)
          },
          (err) => {
            console.log(err);
          }
        );
        this.showSkeleton = false;
      },
      (err) => {
        this.showSkeleton = false;
      }
    );
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('site');

    // this.canvas = this.mychart.nativeElement;
    // this.ctx = this.canvas.getContext('2d');

    // new Chart(this.ctx, {
    //   type: 'bar',
    //   display: false,
    //   data: {
    //     labels: [
    //       'Janvier',
    //       'Février',
    //       'Mars',
    //       'Avril',
    //       'Mais',
    //       'Juin',
    //       'Juillet',
    //       'Aôut',
    //       'Octombre',
    //       'Septembre',
    //       'Novembre',
    //       'Decembre',
    //     ],
    //     datasets: [
    //       {
    //         data: [12, 19, 3, 80, 2, 55, 10, 60, 90, 55, 14, 69],
    //         backgroundColor: [
    //           '#BE3726',
    //           '#BE3726',
    //           '#BE3726',
    //           '#BE3726',
    //           '#BE3726',
    //           '#BE3726',
    //           '#BE3726',
    //           '#BE3726',
    //           '#BE3726',
    //           '#BE3726',
    //           '#BE3726',
    //           '#BE3726',
    //         ],
    //         borderColor: [],
    //         borderWidth: 0,
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //       legend: {
    //         display: false,
    //       },
    //     },
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // });
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('site');
  }
}
