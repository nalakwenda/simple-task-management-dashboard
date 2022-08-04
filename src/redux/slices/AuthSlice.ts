import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {LoginRequest, UserDetails} from '../../types/Auth'
import {number} from 'yup'


const initialState: UserDetails = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    image: '',
    token: ''

}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<UserDetails>
        ) =>
        {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.gender = action.payload.gender;
            state.image = action.payload.image;
            state.token = action.payload.token
        },
        logout: (state) =>
        {
            state.id = 0;
            state.username = '';
            state.firstName = '';
            state.lastName = '';
            state.gender = '';
            state.image = '';
            state.token = ''
        },
    },
})

export const {setCredentials, logout} = slice.actions

export default slice.reducer

export const userDetails = (state: RootState) => state.auth
