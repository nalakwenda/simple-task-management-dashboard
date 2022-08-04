import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {ProjectI, ProjectIdsI, TaskAndProjectIdsI} from '../../types/Project'
import {data} from '../../data/data'
import {RootState} from '../store'
import {v4 as uuidv4} from 'uuid';
import {accordionActionsClasses} from '@mui/material'


export interface ProjectSliceI
{
    project: ProjectI[]
}


const initialState: ProjectSliceI = {
    project: data

}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<ProjectI>) =>
        {
            state.project.push({...action.payload})

        },

        updateProjectTitle: (state, action: PayloadAction<ProjectIdsI>) =>
        {
            state.project.filter((f, index) =>
            {
                const i = f.tasks.findIndex(f => action.payload.projectId === action.payload.projectId);
                if (index !== -1 && f.projectId === action.payload.projectId) {
                    f.projectTitle = action.payload.projectTitle
                    return f.tasks;
                } else {
                    return f.tasks;
                }
            })

        },
        addTask: (state, action: PayloadAction<TaskAndProjectIdsI>) =>
        {
            state.project = state.project.filter((f, index) =>
            {
                const {task} = action.payload
                const i = f.tasks.findIndex(f => action.payload.taskId);
                if (index !== -1 && f.projectId === action.payload.projectId && task) {
                    f.tasks.push({...task})
                    return f.tasks;
                } else {
                    return f.tasks;
                }
            })
            console.log(state.project)
        },
        updateTask: (state, action: PayloadAction<TaskAndProjectIdsI>) =>
        {
            const updatedProject = state.project.filter((f, index) =>
            {

                const {task} = action.payload
                const i = f.tasks.findIndex(f => action.payload.taskId);
                if (index !== -1 && f.projectId === action.payload.projectId && task) {
                    f.tasks[i] = task
                    return f.tasks;
                } else {
                    return f.tasks;
                }
            })
            state.project = updatedProject
        },
        deleteTask: (state, action: PayloadAction<TaskAndProjectIdsI>) =>
        {
            state.project = state.project.filter((f, index) =>
            {
                const i = f.tasks.findIndex(f => f.taskId === action.payload.taskId);
                if (index !== -1 && f.projectId === action.payload.projectId) {
                    f.tasks.splice(i, 1);
                    return f.tasks;
                } else {
                    return f.tasks;
                }
            })


        },
        deleteProject: (state, action: PayloadAction<string>) =>
        {
            state.project = state.project.filter(info =>
                info.projectId !== action.payload
            )
            console.log(state.project)
        }
    },
})

// Action creators are generated for each case reducer function
export const {addProject, addTask, updateTask, updateProjectTitle, deleteTask, deleteProject} = projectSlice.actions
export const projects = (state: RootState) => state.project;
export default projectSlice.reducer