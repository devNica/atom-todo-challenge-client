export interface ApiModel<T> {
    meta: T
    message: string
}

export interface ApiErrorModel {
    meta: {
        errorName: string,
        messages: string[]
    },
    message: string
}

export interface TaskModel {
    taskId?: string
    taskName: string
    taskDescription: string
    createdAt: number
    status?: boolean
}

export type UserTaskModel = Omit<TaskModel, 'createdAt'> & {
    userId: string
}

export type UserTaskRegisterModel = Pick<TaskModel, 'taskName' | 'taskDescription'>
export type UserTaskUpdateModel = Pick<TaskModel, 'taskId' | 'taskName' | 'taskDescription'>
export type UserTaskToggleModel = Pick<TaskModel, 'taskId' | 'status'>
export type UserTaskRemoveModel = Pick<UserTaskModel, 'taskId' | 'userId'>