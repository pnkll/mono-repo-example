import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const taskApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        getTaskById: builder.query({
            query: (id) => ({
                url: `/tasks/task?_id=${id}`,
                method: 'GET',
            })
        }),
        getTasks: builder.query({
            query: () => ({
                url: '/tasks/task',
                method: 'GET'
            })
        }),
        postTask: builder.query({
            query: (id) => ({
                url: `/tasks/task?_id=${id}`,
                method: 'GET',
            })
        }),
    }),
    overrideExisting: false,
})
