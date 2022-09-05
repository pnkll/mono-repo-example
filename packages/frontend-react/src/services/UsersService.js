import {Api} from './api'

// Define a service using a base URL and expected endpoints
export const usersApi = Api.injectEndpoints({
    typeTags: ['PROFILE'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: '/users/profile',
            }),
            providesTags: ['PROFILE']
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
                body: data,
            }),
            invalidatesTags: ['PROFILE']
        }),
    }),
    overrideExisting: false,
})

export const {useGetProfileQuery}=usersApi
