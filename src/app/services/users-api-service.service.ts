import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { UserInterface } from '../interfaces/user.interface';
import { UserTableModel } from '../models/userTableModel';

interface UsersApiInterface {
  items: UserInterface[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersApiServiceService {

  constructor (private http: HttpClient) {}

  getUsers (login: string): Observable<UserTableModel[]> {
    return this.http.get(`https://api.github.com/search/users?q=${login} in:login`)
      .pipe(
        map(({ items: users }: UsersApiInterface) => {
          return users.map((user: UserInterface) => new UserTableModel(user));
        }),
      );
  }
}
