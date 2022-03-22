import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PubliciteService {

  constructor(private http: HttpClient) {}

  list(){
    return this.http.get(environment.apiUrl + '/admin/posts/list')
  }

  active(id) {
    return this.http.get(environment.apiUrl + `/admin/posts/activate/${id}`);
  }

  ajouter(form) {
    return this.http.post(environment.apiUrl + '/admin/posts/store',form);
  }

  editer(form) {
    return this.http.post(environment.apiUrl + '/admin/posts/update',form);
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/posts/show/${id}`);
  }
}
