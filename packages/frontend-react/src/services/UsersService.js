import { addNotify } from '../store/slices/notificationsSlice'
import { setUser } from '../store/slices/userSlice'
import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const usersApi = Api.injectEndpoints({
    typeTags: ['PROFILE'],
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
            transformResponse: (data)=>{
                return data.message
            }
        }),
        getUsersById: builder.query({
            query: (data) => ({
                url: '/users/ids',
                params:{
                    ids: data
                }
                
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
        getConfirmationUsers: builder.query({
            query: ()=>({
                url: '/users/confirmation',
                method: 'GET'
            }),
            transformResponse: (data)=>{
                return data.message
            }
        }),
        confirmUsers: builder.mutation({
            query: (ids)=>({
                url: '/users/confirmation',
                method: 'POST',
                body: {ids: ids}
            }),
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                try {
                    const {data}=await queryFulfilled
                    dispatch(addNotify({type: 'success', message: 'Пользователь успешно подтвержден'}))
                } catch ({error}) {
                    dispatch(addNotify({type: 'error', message: error.data.errors}))
                }
            },
        })
    }),
    overrideExisting: false,
})

export const { useGetProfileQuery } = usersApi
