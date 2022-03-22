import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-site-nav',
  templateUrl: './site-nav.component.html',
  styleUrls: ['./site-nav.component.css'],
})
export class SiteNavComponent implements OnInit {
  public route: boolean;

  constructor(public router: Router, private _location: Location) {
    this.route = this.router.url === '/site/home' ? true : false;
  }
  ngOnInit(): void {}

  goback() {
    this._location.back();
  }
}
