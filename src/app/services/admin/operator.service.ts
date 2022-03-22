import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OperatorService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/operators/list');
  }

  active(id) {
    return this.http.get(
      environment.apiUrl + `/admin/operators/activate/${id}`
    );
  }

  ajouter(libelle, agent_number, min, max) {
    return this.http.post(environment.apiUrl + '/admin/operators/store', {
      libelle: libelle,
      agent_number: agent_number,
      min: min,
      max: max,
    });
  }

  editer(id, libelle, agent_number, min, max) {
    return this.http.post(environment.apiUrl + '/admin/operators/update', {
      id: id,
      libelle: libelle,
      agent_number: agent_number,
      min: min,
      max: max,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/operators/show/${id}`);
  }
}
