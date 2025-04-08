import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ListUserTaskComponent } from "../tasks/components/list/list-user-task.component";
import { UserTaskApiService } from "../../core/services/user-task-api.service";
import { AuthService } from "../../core/services/auth.service";
import { UserTaskService } from "../../core/services/user-task.service";
import { TaskModel } from "../../shared/models/api.model";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'dashboard-cmp',
    standalone: true,
    imports: [
        CommonModule,
        ListUserTaskComponent,
        MatIconModule
    ],
    providers: [
        UserTaskApiService
    ],
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

    protected userId: string | null = ''
    protected userEmail: string | null = ''

    constructor(
        private userTaskApiService: UserTaskApiService,
        private authService: AuthService,
        private userTaskService: UserTaskService
    ) { }

    ngOnInit(): void {
        this.userId = this.authService.getUserId()
        this.userEmail = this.authService.getEmail()
        this.loadTask()
    }

    loadTask(): void {
        if (this.userId) {
            this.userTaskApiService.getAllUserTasks(this.userId).subscribe((tasks: Required<TaskModel[]>) => {
                this.userTaskService.set(tasks)
            })
        }
    }

    onLogout():void{
        this.authService.logout()
        this.userTaskService.set([])
    }
}