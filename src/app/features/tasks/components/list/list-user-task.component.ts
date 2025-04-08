import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MaterialModules } from "../../material.modules";
import { MatTableDataSource } from "@angular/material/table";
import { TaskModel, UserTaskModel, UserTaskRemoveModel } from "../../../../shared/models/api.model";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { TaskFormComponent } from "../task-form/task-form.component";
import { UserTaskService } from "../../../../core/services/user-task.service";
import { Subscription } from "rxjs";
import { UserTaskApiService } from "../../../../core/services/user-task-api.service";
import { MatPaginator } from "@angular/material/paginator";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'list-user-task-cmp',
    standalone: true,
    imports: [
        CommonModule,
        ...MaterialModules,
        TaskFormComponent
    ],
    providers: [
        UserTaskApiService
    ],
    templateUrl: './list-user-task.component.html',
    styleUrls: ['./list-user-task.component.scss']
})
export class ListUserTaskComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    protected displayedColumns: string[] = ['taskName', 'taskDescription', 'createdAt', 'status', 'actions'];
    protected dataSource: MatTableDataSource<TaskModel> = new MatTableDataSource()

    private subscription: Subscription = new Subscription()

    protected selectedTask: Required<TaskModel> | null = null

    @Input({ required: true }) userId!: string | null

    constructor(
        private userTaskApiService: UserTaskApiService,
        private userTaskService: UserTaskService
    ) { }


    ngOnInit(): void {
        this.subscription = this.userTaskService.tasks$.subscribe((tasks) => {
            this.dataSource.data = tasks ?? []
        })

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    filterTasks(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    clearSearch(): void {
        this.dataSource.filter = '';
    }

    onStatusChange(task: Required<TaskModel>, event: MatCheckboxChange): void {

        const data: UserTaskModel = {
            ...task,
            status: event.checked,
            userId: this.userId ?? ""
        }

        this.userTaskApiService.toggleUserTaskStatus(data).subscribe({
            next: () => {
                this.userTaskService.updateTask({
                    ...task,
                    status: event.checked,
                })
            }
        })

    }

    onEdit(task: TaskModel): void {
        this.selectedTask = task as Required<TaskModel>
    }

    onDelete(taskId: string): void {

        const data: UserTaskRemoveModel = {
            taskId,
            userId: this.userId ?? ""
        }

        this.userTaskApiService.delUserTask(data).subscribe(res => {
            this.userTaskService.removeTask(taskId)
        })

    }

    onFormSubmitted(): void {
        this.selectedTask = null
    }

}