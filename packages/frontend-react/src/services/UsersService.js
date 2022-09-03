import {Api} from './api'

// Define a service using a base URL and expected endpoints
export const usersApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: '/users/profile',
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: '/users',
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/users/profile',
                method: 'PATCH',
                body: data
            })
        }),
    }),
    overrideExisting: false,
})
