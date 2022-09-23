import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../store/slices/appSlice'
import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const authApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    data?.status === 200 && dispatch(setCredentials({
                        token: data.message.token,
                        refreshToken: data.message.refreshToken
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        registerOrganization: builder.mutation({
            query: (data) => ({
                url: '/organizations',
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    data?.status === 200 && dispatch(setCredentials({
                        token: data.message.token,
                        refreshToken: data.message.refreshToken
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
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
