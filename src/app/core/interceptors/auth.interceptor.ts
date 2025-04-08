import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { NotificationService } from "../services/notification.service";
import { AuthService } from "../services/auth.service";

interface AuthModel {
    token: string
    userId: string
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const ls = localStorage.getItem("authToken")
    const notification = inject(NotificationService)
    const authService = inject(AuthService)

    if (ls) {
        const { token } = JSON.parse(ls) as AuthModel

        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })

        return next(cloned).pipe(
            catchError(httpErrorRes => {

                if (httpErrorRes.status === 403) {
                    notification.show('La sesion ha expirado', 'error')
                    authService.logout()
                }
                else {
                    notification.show(httpErrorRes.error.message, 'error')
                }
                return throwError(() => httpErrorRes)
            })
        )
    }

    return next(req)

}