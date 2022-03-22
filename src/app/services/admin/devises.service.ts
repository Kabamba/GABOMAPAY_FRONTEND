import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DevisesService {

  constructor(private http: HttpClient) {}

  list(){
    return this.http.get(environment.apiUrl + '/admin/devises/list')
  }

  active(id) {
    return this.http.get(environment.apiUrl + `/admin/devises/activate/${id}`);
  }

  ajouter(
    libelle,
    symbole
  ) {
    return this.http.post(environment.apiUrl + '/admin/devises/store', {
      libelle: libelle,
      symbole:symbole
    });
  }

  editer(id, libelle, symbole) {
    return this.http.post(environment.apiUrl + '/admin/devises/update', {
      id: id,
      libelle: libelle,
      symbole: symbole,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/devises/show/${id}`);
  }
}
