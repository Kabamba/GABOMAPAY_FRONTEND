import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get(environment.apiUrl + '/admin/users/list');
  }

  active(id) {
    return this.http.get(environment.apiUrl + `/admin/users/activate/${id}`);
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/users/show/${id}`);
  }
}
