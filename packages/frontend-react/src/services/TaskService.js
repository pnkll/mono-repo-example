import { addNotify } from '../store/slices/notificationsSlice'
import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const taskApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        getTaskById: builder.query({
            query: (id) => ({
                url: '/tasks/task',
                method: 'GET',
                params: {
                    _id: id
                }
            })
        }),
        getTasks: builder.query({
            query: () => ({
                url: '/tasks/task',
                method: 'GET'
            }),
            transformResponse: (data)=>{
                return data.message
            }
        }),
        getTaskById: builder.query({
            query: (id)=>({
                url: '/tasks/task',
                method: 'GET',
                params: {
                    _id: id
                }    
            }),
            transformResponse: (data)=>{
                return data.message[0]
            }
        }),
        postTask: builder.mutation({
            query: (data) => ({
                url: '/tasks/task',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                try {
                    const {data}=await queryFulfilled
                    dispatch(addNotify({type:'success',message:'Задача успешно создана'}))
                } catch ({error}) {
                    dispatch(addNotify({type:'error',message: error.data.errors}))
                }
            }
        }),
    }),
    overrideExisting: false,
})
