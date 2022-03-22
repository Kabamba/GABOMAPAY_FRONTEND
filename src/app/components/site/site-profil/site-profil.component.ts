import { Component, OnInit } from '@angular/core';
import { SiteAuthGuard } from '../../../guards/site/site-auth.guard';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-site-profil',
  templateUrl: './site-profil.component.html',
  styleUrls: ['./site-profil.component.css'],
})
export class SiteProfilComponent implements OnInit {
  
  user = {
    name : '',
    prenom : '',
    profile : ''
  }

  urlImage = environment.apiImage;

  showSkeleton = false;

  constructor(private auth: SiteAuthService, private router: Router) {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('site');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('site');
  }

  ngOnInit(): void {
    this.getUser();
  }

  logout() {
    this.auth.logout().subscribe(
      (res) => {
        localStorage.removeItem('user');
        this.auth.toggleLogin(false);
        this.router.navigate(['/login']);
      },
      (err) => {
        this.router.navigate(['/login']);
      }
    );
  }
  
  getUser() {
    this.showSkeleton = true;

    this.auth.user().subscribe(
      (res:any) => {
        this.user = res;
        this.showSkeleton = false;

      },
      (err) => {
        console.log(err)
        this.showSkeleton = false;
      }
    );
  }
}
