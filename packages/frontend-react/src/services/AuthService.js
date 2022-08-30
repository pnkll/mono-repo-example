import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL + '/api/auth' }),
    endpoints: (builder) => ({
        register: builder.query({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            })
        }),
    }),
})

export const {useRegisterQuery} = authApi