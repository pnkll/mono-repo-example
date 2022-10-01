import { isNil } from 'lodash'
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
            query: (data) => ({
                url: '/tables/content/upload',
                method: 'POST',
                body: data
            })
        }),
        getTables: builder.query({
            query: (sort) => ({
                url: '/tables',
                method: 'GET',
                params: {
                    sort: JSON.stringify(sort)
                }
            }),
            transformResponse: (data) => {
                if (!isNil(data)) {
                    return data.status === 200 && data.message
                }
            }
        }),
        getTableContents: builder.query({
            query: ({ table_id, limit, page }) => ({
                url: '/tables/content',
                method: 'GET',
                params: {
                    query: JSON.stringify({ table_id: table_id }),
                    limit: limit,
                    page: page
                }
            }),
            transformResponse: (data) => {
                if (!isNil(data)) {
                    return data.status === 200 && data.message
                }
            }
        }),
        getContentByData: builder.query({
            query: ({ data, table_id }) => ({
                url: '/tables/content/data',
                method: 'GET',
                params: {
                    table_id: JSON.stringify(table_id),
                    data: JSON.stringify(data)
                }
            }),
            transformResponse: (data) => {
                if (!isNil(data)) {
                    return data.status === 200 && data.message
                }
            }
        })
    }),
    overrideExisting: false,
})
