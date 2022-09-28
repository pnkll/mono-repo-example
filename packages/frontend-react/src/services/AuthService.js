import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../store/slices/appSlice'
import { addNotify } from '../store/slices/notificationsSlice'
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
                    if (data?.status === 200) {
                        dispatch(setCredentials({
                            token: data.message.token,
                            refreshToken: data.message.refreshToken
                        }))
                        dispatch(addNotify({type: 'success', message: 'Вы успешно зарегистрировались, добро пожаловать на портал MintaCRM'}))
                    }
                    } catch ({ error }) {
                        dispatch(addNotify({ type: 'error', message: error.data.errors }))
                    }
                }
        }),
        registerOrganization: builder.mutation({
            query: (data) => ({
                url: '/organizations',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(id,{dispatch, queryFulfilled}){
                try {
                    data?.status===200&&addNotify({type: 'success', message: 'Организация успешно зарегистрирована, продолжайте регистрацию чтобы зарегистрировать администратора для организации'})
                } catch ({error}) {
                    console.log(error)
                }
            }
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
                    if (data?.status === 200) {
                        dispatch(setCredentials({
                            token: data.message.token,
                            refreshToken: data.message.refreshToken
                        }))
                        dispatch(addNotify({ type: 'success', message: 'Успешная авторизация, рады приветствовать вас на портале MintaCRM' }))
                    }
                } catch ({error}) {
                    dispatch(addNotify({ type: 'error', message: error.data.errors }))
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
