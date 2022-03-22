import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TauxService {
  
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + `/admin/taux/list`);
  }

  update(taux_id, taux_amount) {
    return this.http.post(environment.apiUrl + '/admin/taux/update', {
      taux_id: taux_id,
      taux_amount: taux_amount,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/taux/getaux/${id}`);
  }
}
