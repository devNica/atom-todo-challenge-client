import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms"

export type AuthFormModel = {
    email: AbstractControl<string|null>
}


export class AuthFormBuilder {
    static build (fb: FormBuilder): FormGroup<AuthFormModel> {
        return fb.group<AuthFormModel>({
            email: fb.control('', [Validators.required])
        })
    }
}