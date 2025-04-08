import { HttpClient, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, of, switchMap } from "rxjs";
import { NotificationService } from "../services/notification.service";
import { AuthService } from "../services/auth.service";
import { ApiModel } from "../../shared/models/api.model";
import { UserModel } from "../../shared/models/auth.model";
import { environment } from '../../../environments/environment'


export const requestErrorInterceptor: HttpInterceptorFn = (req, next) => {
    // Inyectar Modulos y Servicios Requeridos por el Interceptor
    const router = inject(Router)
    const http = inject(HttpClient)
    const notification = inject(NotificationService)
    const authService = inject(AuthService)
    const baseUrl = environment.apiUrl

    // Procesar la solicitud de origen 
    return next(req).pipe(

        catchError((err) => {
            // verificar que el codigo de estado sea 404 y que la peticion de origen sea el login
            if (err.status === 404 && req.url.includes('/auth/login')) {

                // capturar el cuerpo de la peticion previa
                const loginPayload = req.body

                // realizar la solicitud para el registro de usuario con el mismo payload del inicio de sesion
                return http.post<ApiModel<UserModel>>(`${baseUrl}/atom/v1/auth/register`, loginPayload)
                    .pipe(
                        switchMap((res) => {

                            // Establecer la autenticacion
                            authService.login({
                                token: res.meta.token,
                                userId: res.meta.userId,
                                email: res.meta.email
                            })

                            // redirigir al dashboard
                            router.navigate(['dashboard'])
                            return of(res) // Finalizar la operacion de registro
                        }),
                        catchError((registerError) => {
                            // si la peticion de registro falla realizar el manejo del error
                            return of(registerError)
                        })
                    )
            }

            if (err.status === 400 || err.status === 429) {
                notification.show(err.error.message, 'error')
            }

            if (err.status === 409) {
                notification.show(err.error.message, 'warning')
            }

            return of(err)
        })
    )

}