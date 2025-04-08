import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CredentialsModel, UserModel } from "../../shared/models/auth.model";
import { ApiModel } from "../../shared/models/api.model";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthApiService {

    private baseUrl = environment.apiUrl
    private apiUrl: string = `${this.baseUrl}/atom/v1/auth/login`

    constructor(
        private http: HttpClient
    ) { }

    public userLogin(data: CredentialsModel): Observable<UserModel> {
        return this.http.post<ApiModel<UserModel>>(this.apiUrl, data).pipe(map((res) => ({
            email: res.meta.email,
            token: res.meta.token,
            userId: res.meta.userId
        })))
    }
}