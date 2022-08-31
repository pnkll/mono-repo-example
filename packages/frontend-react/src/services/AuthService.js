import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const authApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }),
        forgot: builder.query({
            query: (data) => ({
                url: '/auth/forgot',
                body: data
            })
        }),
        setPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forgot/restore',
                method: 'POST',
                body: data
            })
        }),
    }),
    overrideExisting: false,
})
