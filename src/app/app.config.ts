import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { requestErrorInterceptor } from "./core/interceptors/req-error.interceptor";
import { provideClientHydration } from "@angular/platform-browser";
import { authInterceptor } from "./core/interceptors/auth.interceptor";

export const appConfig: ApplicationConfig  ={
    providers: [
        provideRouter(appRoutes),
        provideAnimationsAsync(),
        provideHttpClient(
            withInterceptors([requestErrorInterceptor, authInterceptor])
        ),
        provideClientHydration(), 
    ]
}