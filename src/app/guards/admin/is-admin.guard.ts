import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../../services/admin/admin-auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  constructor(private auth: AdminAuthService, private router: Router,private toastr:ToastrService) {}

  canActivate(): any {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const isAdmin = userObj.is_admin;
    const status = userObj.is_active;

    console.log(status)

    if (isAdmin == 1 && status == '1') {
      return true;
    } else {
      this.toastr.error('Compte administrateur désactivé');
      return this.router.createUrlTree(['/site/login']);
    }
  }
}
