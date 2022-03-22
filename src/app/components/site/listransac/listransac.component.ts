import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/site/transaction.service';

@Component({
  selector: 'app-listransac',
  templateUrl: './listransac.component.html',
  styleUrls: ['./listransac.component.css'],
})
export class ListransacComponent implements OnInit {
  transactions: any[] = [];
  p: number = 1;
  ShowSkeleon = false;

  user = {
    id : '',
    country : ''
  };

  constructor(
    private transac: TransactionService
  ) {}

  ngOnInit(): void {
   
  }

 
}
