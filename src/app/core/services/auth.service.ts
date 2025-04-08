import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

interface AuthModel {
    token: string
    userId: string
    email: string
}


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private router = inject(Router)

    private authSubject: BehaviorSubject<AuthModel | null> = new BehaviorSubject<AuthModel | null>(null)

    auth$: Observable<AuthModel | null> = this.authSubject.asObservable()

    login(authModel: AuthModel): void {
        localStorage.setItem("authToken", JSON.stringify(authModel))
        this.authSubject.next(authModel)
    }

    getToken(): string | null {

        const ls = localStorage.getItem("authToken")

        if (!ls) {
            this.logout()
            return null
        }

        const { token } = JSON.parse(ls) as AuthModel
        return token


    }

    getUserId(): string | null {
        const ls = localStorage.getItem("authToken")

        if (!ls) {
            return null
        }

        const { userId } = JSON.parse(ls) as AuthModel
        return userId

    }

    getEmail(): string | null {
        const ls = localStorage.getItem("authToken")

        if (!ls) {
            return null
        }

        const { email } = JSON.parse(ls) as AuthModel
        return email

    }

    logout(): void {
        localStorage.removeItem("authToken")
        this.authSubject.next(null)
        this.router.navigate(['/login'])
    }

}