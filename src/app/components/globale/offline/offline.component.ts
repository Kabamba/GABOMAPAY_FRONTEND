import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { fromEvent, merge, of, Subscription, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.css'],
})
export class OfflineComponent implements OnInit, OnDestroy {
  ShowUnavailable = false;

  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    // this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    // this.networkStatus$.unsubscribe();
  }

  // checkNetworkStatus() {
  //   this.networkStatus = navigator.onLine;
  //   this.networkStatus$ = merge(
  //     of(null),
  //     fromEvent(window, 'online'),
  //     fromEvent(window, 'offline')
  //   )
  //     .pipe(map(() => navigator.onLine))
  //     .subscribe((status) => {
  //       if (status == true) {
  //         this.toastr.success('Connexion internet rétablie.');
  //         this.router.navigate(['site/home']);
  //       }
  //       this.networkStatus = status;
  //     });
  // }
}
