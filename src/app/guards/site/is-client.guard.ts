import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsClientGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): any {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const isAdmin = userObj.is_admin;

    if (isAdmin == 2) {
      return true;
    } else {
      return this.router.createUrlTree(['/site/login']);
    }
  }
  
}
