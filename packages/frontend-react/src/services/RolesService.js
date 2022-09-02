import { Api } from './api'

// Define a service using a base URL and expected endpoints
export const rolesApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        postRole: builder.mutation({
            query: (data) => ({
                url: '/roles/role',
                method: 'POST',
                body: data,//Принимает: { title: Joi.string().required(), # Название permissions: Joi.array(), # Список пермишенов (коды прав, например "assignRole" или "viewTasks") organization: Joi.string(), # ID организации (если не указано, автоматически подставится организация, которой принадлежит пользователь) inherit: Joi.string(), # Наследует все права указанной роли (ObjectID) }
            })
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
            })
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
                method: 'GET',//Нужен чтобы выдать указанные права для роли { "role": "ObjectId роли", "permissions": "выдаваемые права (строкой или массивом строк)" }
            })
        }),
    }),
    overrideExisting: false,
})
