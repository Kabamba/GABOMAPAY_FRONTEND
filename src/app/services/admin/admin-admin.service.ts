import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminAdminService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/admins/list');
  }

  active(id) {
    return this.http.get(environment.apiUrl + `/admin/admins/activate/${id}`);
  }

  ajouter(
    name,
    prenom,
    email,
    sexe,
    country,
    admin_level,
    password,
    password_conf
  ) {
    return this.http.post(environment.apiUrl + '/admin/admins/store', {
      name: name,
      sexe: sexe,
      country: country,
      prenom: prenom,
      email: email,
      admin_level,
      password: password,
      password_confirmation: password_conf,
    });
  }

  editer(id, name, prenom, email,sexe,country,admin_level, password, password_conf) {
    return this.http.post(environment.apiUrl + '/admin/admins/update', {
      id: id,
      name: name,
      prenom: prenom,
      email: email,
      sexe:sexe,
      country:country,
      admin_level,
      password: password,
      password_conf : password_conf
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/admins/show/${id}`);
  }
}
