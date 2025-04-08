import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, map } from "rxjs"
import { ApiModel, TaskModel, UserTaskModel, UserTaskRegisterModel, UserTaskRemoveModel, UserTaskToggleModel, UserTaskUpdateModel } from "../../shared/models/api.model"


@Injectable({ providedIn: 'root' })
export class UserTaskApiService {

    private apiUrl: string = `/api/atom/v1/users/`

    constructor(
        private http: HttpClient
    ) { }

    public getAllUserTasks(userId: string): Observable<Required<TaskModel[]>> {
        return this.http.get<ApiModel<Required<TaskModel[]>>>(`${this.apiUrl}${userId}/tasks`).pipe(map((res) => res.meta))
    }

    public addUserTask(data: UserTaskModel): Observable<Required<TaskModel>> {
        const payload: UserTaskRegisterModel = {
            taskName: data.taskName,
            taskDescription: data.taskDescription
        }
        return this.http.post<ApiModel<Required<TaskModel>>>(`${this.apiUrl}${data.userId}/tasks`, payload).pipe(map((res) => res.meta))
    }

    public updUserTask(data: UserTaskModel): Observable<Required<TaskModel>> {
        const payload: UserTaskUpdateModel = {
            taskId: data.taskId,
            taskName: data.taskName,
            taskDescription: data.taskDescription
        }
        return this.http.put<ApiModel<Required<TaskModel>>>(`${this.apiUrl}${data.userId}/tasks`, payload).pipe(map((res) => res.meta))
    }

    public toggleUserTaskStatus(data: UserTaskModel): Observable<any> {
        const payload: UserTaskToggleModel = {
            taskId: data.taskId,
            status: data.status,
        }
        return this.http.patch<ApiModel<any>>(
            `${this.apiUrl}${data.userId}/tasks`, payload
        ).pipe(map((res) => res.meta))
    }

    public delUserTask(data: UserTaskRemoveModel): Observable<any> {
        return this.http.delete<ApiModel<any>>(`${this.apiUrl}${data.userId}/tasks/${data.taskId}`).pipe(map((res) => res.meta))
    }

}