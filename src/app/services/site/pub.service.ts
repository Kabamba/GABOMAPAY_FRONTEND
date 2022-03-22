import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PubService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + `/admin/posts/list`);
  }
}
