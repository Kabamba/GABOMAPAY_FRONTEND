import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  isLogged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}
  
  Login(email, password) {
    return this.http.post(environment.apiUrl + '/login', {
      email: email,
      password: password,
    });
  }

  toggleLogin(state: boolean) {
    this.isLogged.next(state);
  }

  statut() {
    const localData: any = localStorage.getItem('user');

    if (!localData) {
      this.isLogged.next(false);
    } else {
      const userObj = JSON.parse(localData);

      const tokken_expires_at = new Date(userObj.token_expires_at);
      const currentDate = new Date();
      
      if (userObj.is_admin == 1) {
        if (tokken_expires_at > currentDate) {
          this.isLogged.next(true);
        } else {
          this.isLogged.next(false);
        }
      }
    }

    return this.isLogged.asObservable();
  }

  Logout() {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(environment.apiUrl + '/logout', {
      headers: headers,
    });
  }

  user() {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(environment.apiUrl + '/user', {
      headers: headers,
    });
  }
}
