import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AuthFormComponent } from "../../components/login-form/auth-form.component";

@Component({
    selector: 'login-cmp',
    standalone: true,
    imports: [CommonModule, AuthFormComponent],
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {}