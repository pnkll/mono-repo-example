import { Api } from "@services/api"

export const orgApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        getOrg: builder.query({
            query: () => ({
                url: '/organizations/',
                method: 'GET',
            }),
            transformResponse: (data)=>{
                return data.message
            }
        }),
    }),
    overrideExisting: false,
})
