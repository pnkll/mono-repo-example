import { isNil } from 'lodash'
import { addNotify } from '../store/slices/notificationsSlice'
import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const tableApi = Api.injectEndpoints({
    tagTypes: ['TABLE','PUSH_CONTENT'],
    endpoints: (builder) => ({
        createTable: builder.mutation({
            query: (data) => ({
                url: '/tables',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                try {
                    const {data} = await queryFulfilled
                    dispatch(addNotify({type:'success',message: `Таблица "${data.message.title}" успешно создана`}))
                } catch ({error}) {
                    dispatch(addNotify({type: 'error', message: 'Произошла ошибка при создании таблицы'}))
                }
            }
        }),
        uploadFile: builder.mutation({
            query: ({ id, file, withDeletion }) => ({
                url: '/tables/content/fileUpload',
                method: 'POST',
                body: {
                    table_id: id,
                    file: file,
                    withDeletion: withDeletion,
                }
            }),
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                try {
                    const {data}=await queryFulfilled
                    dispatch(addNotify({type: 'success', message: 'Данные успешно загружены в таблицу'}))

                } catch (error) {
                    dispatch(addNotify({type: 'error', message: 'Произошла ошибка при загрузке данных в таблицу'}))
                }
            }
        }),
        getTables: builder.query({
            query: ({sort,page,limit}) => ({
                url: '/tables',
                method: 'GET',
                params: {
                    sort: JSON.stringify(sort),
                    limit: limit,
                    page: page,
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
            },
            providesTags: ['TABLE']
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
        }),
        addContent: builder.mutation({
            query: ({table_id, data})=>({
                url: '/tables/content',
                method: 'POST',
                body: {table_id: table_id,data: data}
            }),
            invalidatesTags: ['TABLE']
        })
    }),
    overrideExisting: false,
})
