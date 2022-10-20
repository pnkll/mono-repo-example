import { addNotify } from '../store/slices/notificationsSlice'
import { setUser } from '../store/slices/userSlice'
import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const usersApi = Api.injectEndpoints({
    typeTags: ['PROFILE', 'USERS', 'UNCONFIRM-USERS'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: '/users/profile',
            }),
            providesTags: ['PROFILE'],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    data.status === 200 && dispatch(setUser(data.message))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getUsers: builder.query({
            query: () => ({
                url: '/users',
            }),
            transformResponse: (data) => {
                return data.message
            },
            providesTags: (result) =>
                result.message
                    ? [
                        ...result.message.map(({ id }) => ({ type: 'USERS', id })),
                        { type: 'USERS', id: 'LIST' },
                    ]
                    : [{ type: 'USERS', id: 'LIST' }],
        }),
        getUserById: builder.query({
            query: (data) => ({
                url: '/users/ids',
                params: {
                    ids: [data]
                },
            }),
            transformResponse: (data)=>{
                return data.message[0]
            }
        }),
        getUsersById: builder.query({
            query: (data) => ({
                url: '/users/ids',
                params: {
                    ids: typeof (data) === 'string' ? [data] : data
                }

            }),
            transformResponse: (data)=>{
                return data.message
            }
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/users/profile',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['PROFILE'],
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                try {
                    const {data} = await queryFulfilled
                    data?.status===200&&dispatch(addNotify({type:'success', message: 'Профиль успешно обновлен'}))
                } catch ({error}) {
                    dispatch(addNotify({type:'error',message: error.data.errors}))
                }
            }
        }),
        getConfirmationUsers: builder.query({
            query: () => ({
                url: '/users/confirmation',
                method: 'GET'
            }),
            transformResponse: (data) => {
                return data.message
            },
            providesTags: (result) =>
                result.message
                    ? [
                        ...result.message.map(({ id }) => ({ type: 'CONFIRM-USERS', id })),
                        { type: 'UNCONFIRM-USERS', id: 'LIST' },
                    ]
                    : [{ type: 'UNCONFIRM-USERS', id: 'LIST' }],
        }),
        confirmUsers: builder.mutation({
            query: (ids) => ({
                url: '/users/confirmation',
                method: 'POST',
                body: { ids: ids }
            }),
            invalidatesTags: ['UNCONFIRM-USERS', 'USERS'],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addNotify({ type: 'success', message: 'Пользователь успешно подтвержден' }))
                } catch ({ error }) {
                    dispatch(addNotify({ type: 'error', message: error.data.errors }))
                }
            },
        })
    }),
    overrideExisting: false,
})

export const { useGetProfileQuery } = usersApi
