import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const tableApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        createTable: builder.mutation({
            query: (data) => ({
                url: '/tables',
                method: 'POST',
                body: data,
            })
        }),
        uploadFile: builder.mutation({
            query: (data) =>({
                url: '/tables/content/upload',
                method: 'POST',
                headers: {
                    "content-type": "multipart/form-data"
                  },
                body: data
            })
        })
    }),
    overrideExisting: false,
})
