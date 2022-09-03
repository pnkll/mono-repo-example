import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//initialize an empty api service that we'll inject endpoints into later as needed
export const Api = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().userSlice.user?.token
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
})

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:3500',
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().userSlice.user?.token
//         if (token) {
//             headers.set("authorization", `Bearer ${token}`)
//         }
//         return headers
//     }
// })

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions)

//     if (result?.error?.originalStatus === 401) {
//         console.log('sending refresh token')
//         // send refresh token to get new access token 
//         const refreshResult = await baseQuery('/refresh', api, extraOptions)
//         console.log(refreshResult)
//         if (refreshResult?.data) {
//             const user = api.getState().auth.user
//             // store the new token 
//             api.dispatch(setCredentials({ ...refreshResult.data, user }))
//             // retry the original query with new access token 
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(logout())
//         }
//     }

//     return result
// }

// export const Api = createApi({
//     baseQuery: baseQueryWithReauth,
//     endpoints: builder => ({})
// })