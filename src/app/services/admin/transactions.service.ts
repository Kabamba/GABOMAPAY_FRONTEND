import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http:HttpClient) { }
  
  list() {
    return this.http.get(environment.apiUrl + `/admin/transactions/list`);
  }

  current() {
    return this.http.get(environment.apiUrl + `/admin/transactions/currenthirty`);
  }

  today() {
    return this.http.get(environment.apiUrl + `/admin/transactions/listoday`);
  }

  last(limit) {
    return this.http.get(environment.apiUrl + `/admin/transactions/limitation/${limit}`);
  }

  valider(id) {
    return this.http.get(environment.apiUrl + `/admin/transactions/valider/${id}`);
  }

  invalider(id,raison) {
    return this.http.post(environment.apiUrl + `/admin/transactions/invalider`,{
      id:id,
      raison:raison
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/transactions/show/${id}`);
  }

  searchDate(start,end){
    return this.http.post(environment.apiUrl + `/admin/transactions/searchperdate`,{
      start:start,
      end:end
    });

  }

  
}
