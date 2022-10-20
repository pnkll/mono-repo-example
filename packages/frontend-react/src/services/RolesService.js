import { isNil } from 'lodash'
import rolesSlice, { rolesAdapter, setPermissionList, setRoleList } from '../store/slices/rolesSlice'
import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const rolesApi = Api.injectEndpoints({
    tagTypes: ['ROLES','PERMISSIONS'],
    endpoints: (builder) => ({
        postRole: builder.mutation({
            query: (data) => ({
                url: '/roles/role',
                method: 'POST',
                body: data,//Принимает: { title: Joi.string().required(), # Название permissions: Joi.array(), # Список пермишенов (коды прав, например "assignRole" или "viewTasks") organization: Joi.string(), # ID организации (если не указано, автоматически подставится организация, которой принадлежит пользователь) inherit: Joi.string(), # Наследует все права указанной роли (ObjectID) }
            }),
            invalidatesTags: [{ type: 'ROLES', id: 'LIST' }]
        }),
        linkRole: builder.mutation({
            query: (data) => ({
                url: '/roles/role',
                method: 'LINK',
                body: data,//Принимает: { "user": "ObjectId юзера", "role": "ObjectId роли" } 
            })
        }),
        getRoles: builder.query({
            query: () => ({
                url: '/roles/role',
                method: 'GET',
            }),
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                try {
                    const {data}=await queryFulfilled
                    dispatch(setRoleList(data.message))
                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: (result) =>
                result?.message
                    ? [
                        ...result.message.map(({ id }) => ({ type: 'ROLES', id })),
                        { type: 'ROLES', id: 'LIST' },
                    ]
                    : [{ type: 'ROLES', id: 'LIST' }],
        }),
        getRolesForSelector: builder.query({
            query: () => ({
                url: '/roles/role',
                method: 'GET',
            }),
            transformResponse: (data)=>{
                if(!isNil(data)){
                    return data.message?.map(role=>role&&{label: role.title, value: role._id})
                }
            }
            // providesTags: (result) =>
            //     result?.message
            //         ? [
            //             ...result.message.map(({ id }) => ({ type: 'ROLES', id })),
            //             { type: 'ROLES', id: 'LIST' },
            //         ]
            //         : [{ type: 'ROLES', id: 'LIST' }],
        }),
        getRoleById: builder.query({
            query: (id) => ({
                url: '/roles/role',
                method: 'GET',
                // query: {
                //     _id: id 
                // }
                params: {
                    query: JSON.stringify({
                        _id: id
                    })
                }
            }),
            transformResponse: (data)=>{
                return data.message[0]
            }
        }),
        grantPermissions: builder.mutation({
            query: (data) => ({
                url: '/roles/grantPermissions',
                method: 'POST',//Нужен чтобы выдать указанные права для роли { "role": "ObjectId роли", "permissions": "выдаваемые права (строкой или массивом строк)" }
                body: data
            })
        }),
        getPermissions: builder.query({
            query: () => ({
                url: '/roles/allPermissions',
                method: 'GET',
            }),
            providesTags: (result) =>
                result?.message
                    ? [
                        ...result.message.map(({ id }) => ({ type: 'PERMISSIONS', id })),
                        { type: 'PERMISSIONS', id: 'LIST' },
                    ]
                    : [{ type: 'PERMISSIONS', id: 'LIST' }],
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                try {
                    const {data} = await queryFulfilled
                    data.status===200&&dispatch(setPermissionList(data.message))
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        getUsersByRoleId: builder.query({
            query: (roleId)=>({
                url: '/roles/usersbyrole',
                method: 'GET',
                params: {roleId: roleId}
            }),
            transformResponse: (data)=>{
                return data.message
            }
        }),
    }),
    overrideExisting: false,
})
