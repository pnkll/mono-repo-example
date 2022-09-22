import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../store/slices/appSlice';
import { logout } from '../store/slices/appSlice';

//initialize an empty api service that we'll inject endpoints into later as needed
// export const Api = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: process.env.API_URL,
//         prepareHeaders: (headers, { getState }) => {
//             const token = getState().userSlice.user?.token
//             // If we have a token set in state, let's assume that we should be passing it.
//             if (token) {
//                 headers.set('authorization', `Bearer ${token}`);
//             }
//             return headers;
//         },
//     }),
//     endpoints: () => ({}),
// })

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().appSlice.token
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401) {
        const refreshToken = api.getState().appSlice.refreshToken
        const refreshResult = await baseQuery({ url: '/auth/token', method: 'GET', params: { token: refreshToken } }, api)
        if (refreshResult?.data) {
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data.message }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

export const Api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})