import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {LoginRequest, UserDetails} from '../../types/Auth'
import {RootState} from '../store'



export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/auth/',

    }),
    endpoints: (builder) => ({
        login: builder.mutation<UserDetails, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
      
    }),
})

export const {useLoginMutation} = api
