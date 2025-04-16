import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from "../../constant/Host";
import { CreateEvaluateEntity, UpdateEvaluateEntity, EvaluateEntity } from "../../model/entity/Index.Evaluate.entity";

export const EvaluateQuery = createApi({
    reducerPath: 'EvaluateQuery',
    baseQuery: fetchBaseQuery({ baseUrl: HOST.API }),
    tagTypes: ['Evaluate'],
    endpoints: build => ({
        createEvaluate: build.mutation<EvaluateEntity, CreateEvaluateEntity>({
            query: (body) => ({
                url: `/api/evaluate/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Evaluate', id: 'LIST' }],
        }),
        getEvaluateOrder: build.query<{ data: EvaluateEntity[] }, string>({
            query: (order_id) => ({
                url: `/api/evaluate/get/order/${order_id}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'Evaluate', id: 'LIST' }],
        }),
        getEvaluateUser: build.query<{ data: any[] }, string>({
            query: (user_id) => ({
                url: `/api/evaluate/get/user/${user_id}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'Evaluate', id: 'LIST' }],
        }),
        getEvaluateAllAdmin: build.query<{ data: EvaluateEntity[] }, void>({
            query: () => ({
                url: `/api/evaluate/get/admin/allEvaluate`,
                method: 'GET',
            }),
            providesTags: [{ type: 'Evaluate', id: 'LIST' }],
        }),
        detailEvaluate: build.query<{ data: any }, string>({
            query: (id) => ({
                url: `/api/evaluate/detail/${id}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'Evaluate', id: 'LIST' }],
        }),
        updateEvaluate: build.mutation<{ data: EvaluateEntity }, { id: string, body: UpdateEvaluateEntity }>({
            query: ({ id, body }) => ({
                url: `/api/evaluate/update/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{ type: 'Evaluate', id: 'LIST' }],
        }),
    }),
});

export const {
    useCreateEvaluateMutation, useGetEvaluateOrderQuery,
    useUpdateEvaluateMutation, useDetailEvaluateQuery,
    useGetEvaluateUserQuery, useGetEvaluateAllAdminQuery

} = EvaluateQuery;
export default EvaluateQuery;

