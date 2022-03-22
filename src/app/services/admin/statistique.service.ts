import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class StatistiqueService {
  constructor(private http: HttpClient) {}

  userNombre() {
    return this.http.get(environment.apiUrl + '/admin/stats/usersnumber');
  }

  transacNombre() {
    return this.http.get(environment.apiUrl + '/admin/stats/transacnumber');
  }

  depotNombre() {
    return this.http.get(environment.apiUrl + '/admin/stats/depotnumber');
  }

  envoieNombre() {
    return this.http.get(environment.apiUrl + '/admin/stats/envoienumber');
  }
}
