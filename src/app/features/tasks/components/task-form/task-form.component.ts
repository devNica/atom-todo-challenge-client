import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { MaterialModules } from "../../material.modules";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskFormBuilder, TaskFormModel } from "../../forms/task.form";
import { UserTaskApiService } from "../../../../core/services/user-task-api.service";
import { TaskModel, UserTaskModel } from "../../../../shared/models/api.model";
import { AuthService } from "../../../../core/services/auth.service";
import { UserTaskService } from "../../../../core/services/user-task.service";


@Component({
    selector: 'task-form-cmp',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...MaterialModules
    ],
    providers: [
        UserTaskApiService
    ],
    styleUrls: ['./task-form.component.scss'],
    templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {

    protected userId: string | null = null
    protected form!: FormGroup<TaskFormModel>
    protected isEditing = false

    @Input()
    set taskToEdit(task: Required<TaskModel> | null) {
        if (task) {
            this.isEditing = true
            this.populateForm(task)
        }
    }

    @Output() formSubmitted = new EventEmitter<void>()

    constructor(
        private fb: FormBuilder,
        private userTaskApiService: UserTaskApiService,
        private authService: AuthService,
        private userTaskService: UserTaskService
    ) { }

    ngOnInit(): void {
        this.userId = this.authService.getUserId()
        this.initForm()
    }

    // Inicializar el Formulario de Tareas de Usuario
    private initForm(): void {
        this.form = TaskFormBuilder.build(this.fb)
    }

    private populateForm(task: Required<TaskModel>): void {
        this.form.patchValue({
            taskId: task.taskId,
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            status: task.status
        })

    }

    protected onEditCancel(event: Event): void {
        event.preventDefault()
        this.isEditing = false
        this.formSubmitted.emit()
        this.form.reset()
    }

    protected handleSubmit(event: Event): void {
        event.preventDefault()
        let formData = this.form.getRawValue()

        const data: UserTaskModel = {
            taskName: formData.taskName ?? "",
            taskDescription: formData.taskDescription ?? "",
            userId: this.userId ?? ""  
        }

        if (this.isEditing) {

            data.taskId = formData.taskId ?? ''

            this.userTaskApiService.updUserTask(data).subscribe({
                next: (newTask) => {
                    this.userTaskService.updateTask(newTask)
                    this.isEditing = false
                    this.formSubmitted.emit()
                    this.form.reset()
                    
                }
            })
        } else {
            this.userTaskApiService.addUserTask(data).subscribe({
                next: (newTask) => {
                    this.userTaskService.pushNewTask(newTask)
                    this.form.reset()
                }
            })
        }
    }
}