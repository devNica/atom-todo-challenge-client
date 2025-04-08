import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms"


export type TaskFormModel = {
    taskId: AbstractControl<string | null>
    taskName: AbstractControl<string | null>
    taskDescription: AbstractControl<string | null>
    status: AbstractControl<boolean | null>
}


export class TaskFormBuilder {
    static build(fb: FormBuilder): FormGroup<TaskFormModel> {
        return fb.group<TaskFormModel>({
            taskId: fb.control<string | null>("", []),
            taskName: fb.control<string | null>("", [Validators.required]),
            taskDescription: fb.control<string | null>("", [Validators.required]),
            status: fb.control<boolean | null>(true, [])
        })
    }
}