import { isNil } from 'lodash'
import { addNotify } from '../store/slices/notificationsSlice'
import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const taskTypeApi = Api.injectEndpoints({
    tagTypes: ['TASK-TYPES'],
    endpoints: (builder) => ({
        getTaskTypes: builder.query({
            query: (data) => ({
                url: '/tasks/tasktype',
                method: 'GET',
            }),
            providesTags: (result) =>
                result.message
                    ? [
                        ...result.message.map(({ id }) => ({ type: 'TASK-TYPES', id })),
                        { type: 'TASK-TYPES', id: 'LIST' },
                    ]
                    : [{ type: 'TASK-TYPES', id: 'LIST' }],
        }),
        getTaskTypesForSelector: builder.query({
            query: (data) => ({
                url: '/tasks/tasktype',
                method: 'GET',
            }),
            transformResponse: (data) => {
                if (!isNil(data)) {
                    return data.message?.map(taskType => taskType && { label: taskType.title, value: taskType._id, data: taskType })
                }
            }
        }),
        getTaskTypeById: builder.query({
            query: (data) => ({
                url: '/tasks/tasktype',
                method: 'GET',
                params: { _id: data }
            }),
            transformResponse: (data) => {
                return data.message[0]
            }
        }),
        updateTaskType: builder.mutation({
            query: (data) => ({
                url: '/tasks/tasktype',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['TASK-TYPES'],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addNotify({ type: 'success', message: 'Шаблон успешно обновлён' }))
                } catch ({ error }) {
                    dispatch(addNotify({ type: 'error', message: error.data.errors }))
                }
            }
        }),
        removeTaskType: builder.mutation({
            query: (data) => ({
                url: '/tasks/tasktype',
                method: 'DELETE',
                params: { _id: data }
            }),
            invalidatesTags: ['TASK-TYPES'],
            async onQueryStarted(id, { dispatch, queryFulfiled }) {
                try {
                    await queryFulfiled
                    dispatch(addNotify({ type: 'success', message: 'Шаблон успешно удален' }))
                } catch (error) {

                }
            }
        }),
        postTaskType: builder.mutation({
            query: (data) => ({
                url: '/tasks/tasktype',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['TASK-TYPES'],
            transformResponse: (data) => {
                return data?.message
            },
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addNotify({ type: 'success', message: `Шаблон ${data?.title} успешно создан` }))
                } catch ({ error }) {
                    dispatch(addNotify({ type: 'error', message: error?.data?.errors }))
                }
            },
        }),
    }),
    overrideExisting: false,
})
