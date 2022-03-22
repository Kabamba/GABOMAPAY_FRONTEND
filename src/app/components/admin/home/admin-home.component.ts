import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from '../../../services/admin/transactions.service';
import { StatistiqueService } from '../../../services/admin/statistique.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, AfterViewInit {

  transactions: any[] = [];

  isLoading: boolean;

  p: number = 1;
  key = 'id';
  reverse: boolean = false;

  userNombre: any;
  transacNombre: any;
  depotNombre: any;
  envoieNombre: any;

  addActive = false;

  constructor(
    private transac: TransactionsService,
    private stat: StatistiqueService
  ) { }

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
    this.statUser();
    this.statTrasac();
    this.statDepot();
    this.statEnvoie();
  }

  statUser() {
    this.stat.userNombre().subscribe((res: any) => {
      this.userNombre = res;
    }, (err) => {
      console.log(err)
    })
  }

  statTrasac() {
    this.stat.transacNombre().subscribe((res: any) => {
      this.transacNombre = res;
    })
  }

  statDepot() {
    this.stat.depotNombre().subscribe((res: any) => {
      this.depotNombre = res;
    })
  }

  statEnvoie() {
    this.stat.envoieNombre().subscribe((res: any) => {
      this.envoieNombre = res;
    })
  }

  list() {
    this.isLoading = true;
    this.transac.list().subscribe(
      (res: any) => {
        this.transactions = res.data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
      }
    );
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'bar',
      display: false,
      data: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mais', 'Juin', 'Juillet', 'Aôut', 'Octombre', 'Septembre', 'Novembre', 'Decembre'],
        datasets: [{
          data: [12, 19, 3, 80, 2, 55, 10, 60, 90, 55, 14, 69],
          backgroundColor: [
            "#080B0A",
            "#080B0A",
            "#080B0A",
            "#080B0A",
            "#080B0A",
            "#080B0A",
            "#080B0A",
            "#080B0A",
            "#080B0A",
            "#080B0A",
            "#080B0A",
            "#080B0A",
          ],
          borderColor: [

          ],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },

    });

    document.querySelector('html').addEventListener('click', () => {
      this.addActive = false;
    })
  }
}
