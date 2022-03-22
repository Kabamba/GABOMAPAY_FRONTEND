import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SwiperOptions } from 'swiper';
import { PubService } from '../../../services/site/pub.service';
import { environment } from '../../../../environments/environment.prod';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { TransactionService } from '../../../services/site/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-home',
  templateUrl: './site-home.component.html',
  styleUrls: ['./site-home.component.css'],
})
export class SiteHomeComponent implements OnInit, AfterViewInit {
  pubs: any[] = [];
  transactions: any[] = [];

  src = environment.apiImage;

  showSkeleton = false;
  showSkeletonTrans = false;

  user = {
    id: '',
    name: '',
    prenom: '',
    profile: '',
    country_id: '',
    solde: '',
  };

  infos: any;
  pays = '';

  urlImage = environment.apiImage;

  constructor(
    private pub: PubService,
    public auth: SiteAuthService,
    private transac: TransactionService,
    private router: Router
  ) {}

  openModal(event: Event) {
    const simuleModal = document.querySelector('.simule-modal');
    simuleModal.classList.add('active');
    event.preventDefault();
  }

  closeModal(event: Event) {
    const simuleModal = document.querySelector('.simule-modal');
    event.preventDefault();
    event.stopPropagation();
    simuleModal.classList.remove('active');
  }

  stop(event: Event) {
    event.stopPropagation();
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('site');
  }

  ngOnInit(): void {
    this.getPubs();
    this.getUser();
    this.getInfos();
  }

  getPubs() {
    this.pub.list().subscribe((res: any) => {
      this.pubs = res;
    });
  }

  getUser() {
    this.showSkeleton = true;

    this.auth.user().subscribe(
      (res: any) => {
        this.user = res;
   
        this.transac.listLast(this.user.id).subscribe(
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
        console.log(err)
        this.showSkeleton = false;
      }
    );
  }

  getInfos() {
     this.infos = this.auth.getInfos();
  }

  config: SwiperOptions = {
    // npm install --save ngx-useful-swiper@latest swiper
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: -30,
    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: -50,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: -90,
      },
    },
    loop: true,
    speed: 2000,
    autoplay: true,
  };
}
