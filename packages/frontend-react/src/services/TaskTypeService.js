import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const taskTypeApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        getTaskTypes: builder.query({
            query: (data) => ({
                url: '/tasks/tasktype',
                method: 'GET',
            })
        }),
        updateTaskType: builder.mutation({
            query: (data) => ({
                url: '/tasks/tasktype',
                method: 'PUT',
                body: data,
            })
        }),
        removeTaskType: builder.query({
            query: (data) => ({
                url: '/tasks/tasktype',
                method: 'DELETE',
            })
        }),
        postTaskType: builder.mutation({
            query: (data) => ({
                url: '/tasks/tasktype',
                method: 'POST',
                body: data,
            })
        }),
    }),
    overrideExisting: false,
})
