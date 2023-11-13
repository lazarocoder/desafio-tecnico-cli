import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Login } from "../model/login";
import { BASE_URL_API } from '../util/constants';
import { AuthenticationResponse } from '../model/authentication-response';
import { Register } from '../model/register';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(login: Login): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(BASE_URL_API + '/api/auth/login', login);
    }

    signup(register: Register): Observable<any> {
        return this.http.post(BASE_URL_API + '/api/auth/signup', register);
    }

}
