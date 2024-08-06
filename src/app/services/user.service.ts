import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userCache = new Map<number, any>();
  private usersCache = new Map<number, any>();

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    if (this.usersCache.has(page)) {
      return of(this.usersCache.get(page));
    }
    return this.http
      .get(`${environment.apiUrl}users/?page=${page}`)
      .pipe(tap((data) => this.usersCache.set(page, data)));
  }

  getUserById(id: number): Observable<any> {
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id));
    }
    return this.http
      .get(`${environment.apiUrl}users/${id}`)
      .pipe(tap((data) => this.userCache.set(id, data)));
  }
}
