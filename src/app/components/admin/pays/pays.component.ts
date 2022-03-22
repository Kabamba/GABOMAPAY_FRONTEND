import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from '../../../services/admin/country.service';
import { DevisesService } from '../../../services/admin/devises.service';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css'],
})
export class PaysComponent implements OnInit {
  countries: any[] = [];
  devises : any[] = [];

  isLoading: any;
  isAdding: any;

  isError = false;
  errors: any;

  showModal = false;

  key = 'id';
  reverse: boolean = false;

  p: number = 1;
  name: string;

  brandForm: FormGroup;

  constructor(private pays: CountryService,private devise:DevisesService,private toastr: ToastrService) {}

  addActive = false;
  
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
    this.getDevise();
  }

  getDevise(){
    this.devise.list().subscribe((res:any)=>{
      this.devises = res;
    },(err)=>{
    })
  }


  list() {
    this.isLoading = true;
    this.pays.list().subscribe(
      (res: any) => {
        this.countries = res.data;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = true;
      }
    );
  }

  activer(id: any) {
    this.pays.active(id).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success(res.message);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  search() {
    if (this.name == '') {
      this.ngOnInit();
    } else {
      this.countries = this.countries.filter((res: any) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.name.toLocaleLowerCase());
      });
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  stopEvent(event: Event) {
    event.stopPropagation();
  }

  ngAfterViewInit(): void {
    document.querySelector('html').addEventListener('click', () => {
      this.addActive = false;
    })
  }
}
