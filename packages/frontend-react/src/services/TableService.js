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
                headers: {
                    "content-type": "multipart/form-data"
                },
                body: data
            })
        }),
        getTables: builder.query({
            query: () => ({
                url: '/tables',
                method: 'GET'
            }),
            transformResponse: (data)=>{
                if(!isNil(data)){
                    return data.status===200&&data.message
                }
            }
        }),
        getTableContents: builder.query({
            query:({table_id,limit,page})=>({
                url: '/tables/content',
                method: 'GET',
                params: {
                    query: JSON.stringify({table_id: table_id}),
                    limit: limit,
                    page: page
                }
            }),
            transformResponse: (data)=>{
                if(!isNil(data)){
                    return data.status===200&&data.message
                }
            }
        })
    }),
    overrideExisting: false,
})
