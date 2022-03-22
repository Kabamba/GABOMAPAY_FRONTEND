import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PubliciteService } from 'src/app/services/admin/publicite.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-publicites',
  templateUrl: './publicites.component.html',
  styleUrls: ['./publicites.component.css'],
})
export class PublicitesComponent implements OnInit {
  pubs: any[] = [];

  isLoading: any;
  isAdding: any;

  isError = false;
  errors: any;

  showModal = false;
  showImg = false;

  key = 'id';
  reverse: boolean = false;

  p: number = 1;
  descriptions: string;

  brandForm: FormGroup;

  file: any;
  url: string;
  urlPath: string;

  image = environment.apiImage;
  addActive = false;

  constructor(private pub: PubliciteService, private toastr: ToastrService) {}


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
    this.resetForm();
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      description: new FormControl(''),
      image: new FormControl(''),
    });
  }

  onSelectedFile(event) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.url = reader.result as string;
      this.urlPath = '';
    };
  }

  sauvegarder() {
    this.isAdding = true;

    const formData = new FormData();
    formData.append('id', this.brandForm.value.id);
    formData.append('description', this.brandForm.value.description);
    if (this.file) {
      formData.append('image', this.file, this.file.name);
    }

    if (this.brandForm.value.id == '0') {
      this.pub.ajouter(formData).subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          this.ngOnInit();
          this.disableModal();
          this.isAdding = false;
          this.file = '';
        },
        (err) => {
          this.errors = err.error.errors;
          this.isError = true;
          this.isAdding = false;
        }
      );
    } else {
      this.pub.editer(formData).subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          this.ngOnInit();
          this.disableModal();
          this.isAdding = false;
          this.file = '';
        },
        (err) => {
          this.errors = err.error.errors;
          this.isError = true;
          this.isAdding = false;
        }
      );
    }
  }

  list() {
    this.isLoading = true;
    this.pub.list().subscribe(
      (res: any) => {
        this.pubs = res;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
      }
    );
  }

  activer(id: any) {
    this.pub.active(id).subscribe(
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
    if (this.descriptions == '') {
      this.ngOnInit();
    } else {
      this.pubs = this.pubs.filter((res: any) => {
        return res.libelle
          .toLocaleLowerCase()
          .match(this.descriptions.toLocaleLowerCase());
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
    this.errors = '';
    this.url = '';
    this.isError = false;
    this.resetForm();
  }

  stopEvent(event: Event) {
    event.stopPropagation();
  }

  show(id) {
    this.showImg = true;
    this.pub.show(id).subscribe(
      (res: any) => {
        console.log(res);
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          description: new FormControl(res.description),
          image: new FormControl(''),
        });
        this.urlPath = res.chemin;
        this.activeModal();
      },
      (err) => {
        this.showImg = false;
      }
    );
  }

  ngAfterViewInit(): void {
    document.querySelector('html').addEventListener('click', () => {
      this.addActive = false;
    })
  }
}
