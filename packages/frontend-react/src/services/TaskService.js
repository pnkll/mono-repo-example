import { addNotify } from '../store/slices/notificationsSlice'
import { Api } from './api'
import { rtkNotify } from '@src/shared/lib/rtkNotify/rtkNotify'

// Define a service using a base URL and expected endpoints
export const taskApi = Api.injectEndpoints({
    tagTypes: ['TASK-BY-ID'],
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
        // getTasks: builder.query({
        //     query: () => ({
        //         url: '/tasks/task',
        //         method: 'GET'
        //     }),
        //     transformResponse: (data)=>{
        //         return data.message
        //     }
        // }),
        // getTaskById: builder.query({
        //     query: (id)=>({
        //         url: '/tasks/task',
        //         method: 'GET',
        //         params: {
        //             _id: id
        //         }    
        //     }),
        //     transformResponse: (data)=>{
        //         return data.message[0]
        //     }
        // }),
        postTask: builder.mutation({
            query: (data) => ({
                url: '/tasks/task',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addNotify({ type: 'success', message: 'Задача успешно создана' }))
                } catch ({ error }) {
                    dispatch(addNotify({ type: 'error', message: error.data.errors }))
                }
            }
        }),
        updateTask: builder.mutation({
            query: (data) => ({
                url: '/tasks/task',
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                rtkNotify(id,{dispatch,queryFulfilled},{success:'success',error:'error'})
            },
            invalidatesTags: ['TASK-BY-ID']
        }),
        setControllerRole: builder.mutation({
            query: (data) => ({
                url: '/tasks/task/controllerRole',
                method: 'PATCH',
                body: data,
            })
        }),
        getTasks: builder.query({
            query: ({ query, sort, limit, page }) => ({
                url: '/tasks/task',
                method: 'GET',
                params: {
                    query: JSON.stringify(query),
                    sort: JSON.stringify(sort),
                    limit: limit,
                    page: page,
                }
            }),
            transformResponse: (data) => {
                return data.message
            }
        }),
        getTaskById: builder.query({
            query: (id) => ({
                url: 'tasks/task',
                method: 'GET',
                params: {
                    query: JSON.stringify({ _id: id })
                },
            }),
            transformResponse: (data) => {
                return data.message.docs[0]
            },
            providesTags: ['TASK-BY-ID']
        }),
        createTask: builder.mutation({
            query: (data) => ({
                url: '/tasks/task',
                method: 'POST',
                body: data,
            }),
            
        }),
        setExecutorRole: builder.mutation({
            query: (data) => ({
                url: '/tasks/task/executorRole',
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addNotify({ type: 'success', message: 'Роль исполнителя успешно изменена' }))
                } catch (error) {
                    dispatch(addNotify({ type: 'error', message: 'Не удалось изменить роль исполнителя' }))
                }
            },
            invalidatesTags: ['TASK-BY-ID'],
        }),
        setControllerRole: builder.mutation({
            query: (data) => ({
                url: '/tasks/task/controllerRole',
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addNotify({ type: 'success', message: 'Роль ответсвенного успешно изменена' }))
                } catch (error) {
                    dispatch(addNotify({ type: 'error', message: 'Не удалось изменить роль ответственного' }))
                }
            },
            invalidatesTags: ['TASK-BY-ID'],
        }),
        setTaskPriority: builder.mutation({
            query: (data) => ({
                url: '/tasks/task/priority',
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addNotify({ type: 'success', message: 'Приоритет задачи успешно изменена' }))
                } catch (error) {
                    dispatch(addNotify({ type: 'error', message: 'Не удалось изменить приоритет задачи' }))
                }
            },
            invalidatesTags: ['TASK-BY-ID'],
        }),
        setTaskFireDate: builder.mutation({
            query: ({ taskId, value }) => ({
                url: 'tasks/task/fireDate',
                method: 'PATCH',
                body: {
                    taskId,
                    fireDate: {
                        autoFormat: value
                    }
                },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addNotify({ type: 'success', message: 'Крайний срок задачи успешно изменен' }))
                } catch (error) {
                    dispatch(addNotify({ type: 'error', message: 'Не удалось изменить крайний срок задачи' }))
                }
            },
            invalidatesTags: ['TASK-BY-ID'],
        }),
        setTaskDesiredDate: builder.mutation({
            query: ({ taskId, value }) => ({
                url: 'tasks/task/desiredDate',
                method: 'PATCH',
                body: {
                    taskId,
                    desiredDate: {
                        autoFormat: value
                    }
                },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addNotify({ type: 'success', message: 'Желаемая дата задачи успешно изменен' }))
                } catch (error) {
                    dispatch(addNotify({ type: 'error', message: 'Не удалось изменить желаемую дату задачи' }))
                }
            },
            invalidatesTags: ['TASK-BY-ID'],
        }),
        assignTaskExecutor: builder.mutation({
            query: ({taskId,executorId,plannedDate})=>({
                url: 'tasks/task/assign',
                method: 'PATCH',
                body: {
                    taskId,
                    executorId,
                    plannedDate
                }
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addNotify({ type: 'success', message: 'Исполнитель успешно назначен' }))
                } catch (error) {
                    dispatch(addNotify({ type: 'error', message: 'Не удалось назначить исполнителя' }))
                }
            },
            invalidatesTags: ['TASK-BY-ID'],
        })
    }),
    overrideExisting: false,
})
