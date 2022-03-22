import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { SiteAuthService } from '../../services/site/site-auth.service';

@Injectable({
  providedIn: 'root',
})
export class isClientConnect implements CanActivate {
  constructor(private auth: SiteAuthService, private router: Router) {}

  canActivate(): any {
    return this.auth.statut().pipe(
      map((LoggedIn: boolean) => {
        if (!LoggedIn) {
          return true;
        } else {
          return this.router.createUrlTree(['/site/home']);
        }
      })
    );
  }
}
