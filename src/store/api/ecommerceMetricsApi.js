import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ecommerceMetricsApi = createApi({

    reducerPath: 'ecommerceMetricsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_BASE_QUERY_URL
    }),
    tagTypes: ['Metrics'],
    endpoints: (builder) => ({

        getAverageScores: builder.query({
            query: () => 'dash/average-score',
            providesTags: ['Metrics'],
        }),

        getLastRegisteredUsers: builder.query({
            query: () => 'dash/last-registred',
            providesTags: ['Metrics'],
        }),
        getTopSellingProducts: builder.query({
            query: () => 'dash/top-selling',
            providesTags: ['Metrics'],
        }),
        getTotalRenevue: builder.query({
            query: () => 'dash/total_revenue',
            providesTags: ['Metrics'],
        }),
          


    })

})

export const { 

    useGetAverageScoresQuery,
    useGetLastRegisteredUsersQuery,
    useGetTopSellingProductsQuery,
    useGetTotalRenevueQuery

} = ecommerceMetricsApi;

     
        

