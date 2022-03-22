import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get(environment.apiUrl + '/admin/pays/list')
  }

  
  listoccupe(){
    return this.http.get(environment.apiUrl + '/admin/pays/listoccupe')
  }
  
  active(id) {
    return this.http.get(environment.apiUrl + `/admin/pays/activate/${id}`);
  }

  ajouter(
    libelle,
    devise
  ) {
    return this.http.post(environment.apiUrl + '/admin/pays/store', {
      libelle: libelle,
      devise:devise
    });
  }

  editer(id, libelle, devise) {
    return this.http.post(environment.apiUrl + '/admin/pays/update', {
      id: id,
      libelle: libelle,
      devise: devise,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/pays/show/${id}`);
  }
}
