import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs/operators';
import { fromEvent, merge, of, Subscription, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  ShowUnavailable = false;

  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  constructor(
    updates: SwUpdate,
    private router: Router,
    private toastr: ToastrService
  ) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit(): void {
    this.checkNetworkStatus();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        var adminRoute = event.url.split('/');
        if (adminRoute[1] == 'admin' || adminRoute[1] == 'connect') {
          this.ShowUnavailable = true;
        } else {
          this.ShowUnavailable = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        if (status == false) {
          this.toastr.error(
            "Vous n'êtes pas connecté. Vérifiez votre connexion internet."
          );
          this.router.navigate(['connect/offline']);
        }
        
        this.networkStatus = status;
      });
  }

  ngAfterViewInit() {
    const navLeft = document.querySelector('.container-navigation');
    const html = document.querySelector('html');
    const toggle = document.querySelector('#toggle');
    const navRight = document.querySelector('.right-verticale-bloc');
    const btnRight = document.querySelector('.btn-wrapper-right');
    const dropProfil = document.querySelector('.dropdown');

    // toggle.addEventListener('click', (e) => {
    //   e.stopPropagation()
    //   navLeft.classList.toggle('active');
    // });

    // navRight.addEventListener('click', (e) => {
    //   e.stopPropagation()
    //   dropProfil.classList.remove('active');
    // });

    // btnRight.addEventListener('click', (e) => {
    //   e.stopPropagation()
    //   navRight.classList.toggle('active');
    //   navLeft.classList.remove('active');
    // });

    // html.addEventListener('click', (e) => {
    //   navLeft.classList.remove('active');
    //   navRight.classList.remove('active');
    //   e.stopPropagation();
    // })

    // window.oncontextmenu = function (event) {
    //   event.preventDefault();
    //   return false;
    // };
  }
}
