import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/site/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { SiteAuthService } from '../../../services/site/site-auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-details-trans',
  templateUrl: './details-trans.component.html',
  styleUrls: ['./details-trans.component.css'],
})
export class DetailsTransComponent implements OnInit {
  ShowSkeleton = false;
  user: any;
  details: any;
  urlImage = environment.apiImage;

  constructor(
    private transac: TransactionService,
    private auth: SiteAuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.ShowSkeleton = true;
    const transac = this.route.snapshot.params['id'];

    this.auth.user().subscribe(
      (res: any) => {
        this.user = res;

        this.transac.detail(transac, this.user.id).subscribe(
          (res: any) => {
            this.details = res.data;
            console.log(this.details)
          },
          (err) => {
            console.log(err);
          }
        );
        this.ShowSkeleton = false;
      },
      (err) => {
        this.toastr.error(err.error.message);
        console.log(err);
        this.ShowSkeleton = false;
      }
    );
  }
}
