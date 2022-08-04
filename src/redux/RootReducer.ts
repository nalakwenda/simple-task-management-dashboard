import {combineReducers} from "redux";
import projectReducer  from './slices/ProjectsSlice'
import authReducer from './slices/AuthSlice'
import {api} from './services/auth'

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    project: projectReducer,
    auth: authReducer,
})

export default rootReducer