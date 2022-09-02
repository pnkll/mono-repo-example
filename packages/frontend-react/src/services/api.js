import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const Api = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = "4efa614f5e9c3ec4023c126d0046c869b75449f9f51c50f58d6c1468f4978d65812891816fb2453660bb3c0bea8166260bef32149abca5f09879f823c2469f7b8f96c8eb8f7f407b96121a82ea02a0f8e108b9f1fec7a1a60aa4590cfb8343d7b1c83bbdb90f31b3bbd9affd5a5662179930a4a697bed16234ec46f2a51045431e50c0e87de950ac9de74d0319a81b1ce1755ba223b4fb65836842f7206a5c4276e31003d9d41fb099ce7f1bcd5e83974be188d111972d566e1082b5cb4fb608"//(getState() as RootState).auth.token;
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
})