import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthFormBuilder, AuthFormModel } from "../../forms/auth.form";
import { MaterialModulesForAuth } from "../../material-modules-auth";
import { AuthApiService } from "../../../../core/services/auth-api.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";


@Component({
    selector: 'login-form_cmp',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ...MaterialModulesForAuth
    ],
    providers: [
        AuthApiService,

    ],
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
    private router = inject(Router)
    protected form!: FormGroup<AuthFormModel>

    constructor(
        private fb: FormBuilder,
        private authApiService: AuthApiService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.initForm()
    }

    // Inicializar el Formulario de Autenticacion
    private initForm(): void {
        this.form = AuthFormBuilder.build(this.fb)
    }

    protected handleSubmit(event: Event): void {
        event.preventDefault()
        let formData = this.form.getRawValue()

        this.authApiService.userLogin({
            email: formData.email ?? ''
        }).subscribe({
            next: (response) => {
                
                this.authService.login({
                    token: response.token,
                    userId: response.userId,
                    email: response.email
                })

                this.router.navigate(['dashboard'])
            }
        })

    }

}