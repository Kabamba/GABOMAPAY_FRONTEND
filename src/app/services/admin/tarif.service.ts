import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TarifService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + `/admin/tarifs/list`);
  }

  ajouter(frais_ope, frais_perso, operator_id) {
    return this.http.post(environment.apiUrl + '/admin/tarifs/store', {
      frais_ope: frais_ope,
      frais_perso: frais_perso,
      operator_id: operator_id,
    });
  }

  update(id, frais_ope, frais_perso) {
    return this.http.post(environment.apiUrl + '/admin/tarifs/update', {
      id: id,
      frais_ope: frais_ope,
      frais_perso: frais_perso,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/tarifs/show/${id}`);
  }
}
