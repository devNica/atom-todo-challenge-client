import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { TaskModel } from "../../shared/models/api.model"

@Injectable({
    providedIn: 'root'
})

export class UserTaskService {

    private userTaskSubject: BehaviorSubject<Required<TaskModel[]>> = new BehaviorSubject<Required<TaskModel[]>>([])

    tasks$: Observable<Required<TaskModel[]> | null> = this.userTaskSubject.asObservable()

    pushNewTask(newTask: Required<TaskModel>): void {
        const current = this.userTaskSubject.getValue()
        this.userTaskSubject.next([...current, newTask])
    }

    set(tasks: Required<TaskModel[]> | []): void {
        this.userTaskSubject.next(tasks)
    }

    updateTask(task: Required<TaskModel>): void {
        const tasks = this.userTaskSubject.getValue()

        const unmodifiedTask = tasks.filter(t => t.taskId !== task.taskId)

        this.userTaskSubject.next([task, ...unmodifiedTask,])
    }

    removeTask(taskId: string): void {
        const tasks = this.userTaskSubject.getValue()
            .filter(t => t.taskId !== taskId)
            
        this.userTaskSubject.next(tasks)

    }

}