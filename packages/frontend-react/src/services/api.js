import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const Api = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = "4efa614f5e9c3ec4023c126d0046c869b75449f9f51c50f58d6c1468f4978d65812891816fb2453660bb3c0bea8166260bef32149abca5f09879f823c2469f7b8f96c8eb8f7f407b96121a82ea02a0f8e108b9f1fec7a1a60aa4590cfb8343d7f7390fc760f5bf72975c9e10e16b1085090ad1eb2635b8a803057535daa603e61c2ee74666e849b966472d7391e89e94e804c39ffd64afb0f9ba373feeb09dd48e8672d817e0b6040d3ae2b486585273c9632394d31580faa53aa9ecf89ecd22"//(getState() as RootState).auth.token;
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
})