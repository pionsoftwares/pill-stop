import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BOTICA_PLUS_PLUS_ENDPOINT}`,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ` + getState().auth.token)
            headers.set('Accept', 'application/json')
            return headers
        }
    }),
    tagTypes: ['api'],
    endpoints: () => ({})
})
