export interface ProjectI
{
    projectId: string,
    projectTitle: string,
    tasks: TasksI[]

}


export type ProjectIdsI = Pick<ProjectI, "projectId" | "projectTitle">;

export interface TasksI
{
    taskId: string,
    taskTitle: string,
    taskDescription: string,
    status: string,
    start: string,
    end: string

}

export interface TaskAndProjectIdsI
{
    projectId: string,
    taskId?: string,
    task?: TasksI
}
