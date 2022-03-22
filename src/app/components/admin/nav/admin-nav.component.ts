import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { AdminAuthService } from '../../../services/admin/admin-auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TransactionsService } from 'src/app/services/admin/transactions.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit, AfterViewInit {
  @Input() addActive:any;
  
  constructor(private auth: AdminAuthService, private router:Router,private tarif:TransactionsService) { }

  showModal = false;

  brandForm: FormGroup;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      const links = document.querySelectorAll('.nav-links ul li');
      const addActive  = function(){
        links.forEach(item => {
          item.classList.remove('active');
          this.classList.add('active');
        });
      }
      
      for(var i = 0; i < links.length; i++){
        links[i].addEventListener('mouseover', addActive)
      }
  }

  Logout(){
    this.auth.Logout().subscribe((res)=>{
      localStorage.removeItem('user')
      this.auth.toggleLogin(false);
      this.router.navigate(['/login']);
    }, (err) =>{
      console.log(err);
      this.router.navigate(['/login']);
    });
  }
}
