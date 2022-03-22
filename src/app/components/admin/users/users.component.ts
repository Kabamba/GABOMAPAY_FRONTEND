import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/admin/user.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  isLoading: boolean;

  showModal : boolean;

  isShowing : boolean = false;

  key = 'id';
  reverse: boolean = false;

  p: number = 1;
  nom :string;

  details : any;
  image = environment.apiImage;
  addActive = false;

  constructor(
    private user: UserService,
    private toastr: ToastrService
  ) {}

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
  }

  list() {
    this.isLoading = true;
    this.user.list().subscribe(
      (res: any) => {
        this.users = res.data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
      }
    );
  }

  activer(id: any) {
    this.user.active(id).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
      },
      (err) => {}
    );
  }

  search() {
    if (this.nom == '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter((res: any) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.nom.toLocaleLowerCase());
      });
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  activeModal() {
    this.showModal = true;
  }

  disableModal() {
    this.showModal = false;
  }

  stopEvent(event: Event) {
    event.stopPropagation();
  }

  show(id) {
    this.isShowing = false;
    this.user.show(id).subscribe(
      (res: any) => {
        this.details = res.data;
        console.log(this.details)
        this.isShowing = true;
        this.activeModal();
      },
      (err) => {
        this.isShowing = true;
      }
    );
  }

  ngAfterViewInit(): void {
    document.querySelector('html').addEventListener('click', () => {
      this.addActive = false;
    })
  }
}
