import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../utils/AxiosIntance";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from "../../constant/Host";
import { OrderEntity, UpdateOrderEntity, CreateOrderEntity } from "../../model/entity/IndexOrder.Entity";


const OrderQuery = createApi({
    reducerPath: 'OrderQuery',
    baseQuery: fetchBaseQuery({ baseUrl: HOST.API }),
    tagTypes: ['Order'],
    endpoints: build => ({
        createOrder: build.mutation<OrderEntity, CreateOrderEntity>({
            query: (data) => ({
                url: '/api/order/create_order',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        GetOrderUser: build.query<{ data: OrderEntity[] }, string>({
            query: id => `/api/order/get_orders_by_user/${id}`,
            providesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        GetStatusOrder: build.query<{ data: OrderEntity[] }, { id: string, status: string[], paymentStatus: string[] }>({
            query: ({ id, status, paymentStatus }) => ({
                url: `/api/order/get_orders_user_status/${id}?status=${status.join(',')}&paymentStatus=${paymentStatus.join(',')}`,
            }),
            providesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        GetDetailOrder: build.query<{ data: OrderEntity }, string>({
            query: id => `/api/order/get_orders_by_id/${id}`,
            providesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        updateOrder: build.mutation<OrderEntity, { id: string, data: UpdateOrderEntity }>({
            query: ({ id, data }) => ({
                url: `/api/order/update_order/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        GetPaymentUrlVnpay: build.mutation<{ data: string }, CreateOrderEntity>({
            query: (data) => ({
                url: '/api/order/create_payment_url',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        ReturnFromApp: build.query<{ data: string }, string>({
            query: (paymentCode) => ({
                url: `/api/order/return_from_app`,
                params: {
                    paymentCode: paymentCode
                },
                method: 'GET',
            }),
            providesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        GetAllOrderForAdmin: build.query<{ data: OrderEntity[] }, void>({
            query: () => '/api/order/admin/get_all_orders',
            providesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        UpdateOrderAdmin: build.mutation<OrderEntity, { id: string, data: UpdateOrderEntity }>({
            query: ({ id, data }) => ({
                url: `/api/order/admin/update_order/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        GetOrderAdmin: build.query<{ data: OrderEntity[] }, void>({
            query: () => '/api/order/admin/get_orders_status_paymentStatus?status=Đã giao&paymentStatus=Đã thanh toán',
            providesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        ConfirmOrderAdmin: build.mutation<{ data: string }, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `api/order/admin/confirm_order/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        getTopAdminProduct: build.query<{ data: OrderEntity[] }, void>({
            query: () => '/api/order/admin/getTopProducts',
            providesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        getRevenueAdmin: build.query<{ data: OrderEntity[] }, string>({
            query: (date) => `/api/order/admin/getRevenue/${date}`,
            providesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        getCompareRevenueAdmin: build.query<{ data: OrderEntity[] }, void>({
            query: () => '/api/order/admin/compare-revenuen',
            providesTags: [{ type: 'Order', id: 'LIST' }],
        })
    }),
});

export default OrderQuery
export const {
    useCreateOrderMutation, useGetOrderUserQuery, useGetDetailOrderQuery,
    useUpdateOrderMutation, useGetStatusOrderQuery, useGetPaymentUrlVnpayMutation,
    useReturnFromAppQuery, useGetAllOrderForAdminQuery, useUpdateOrderAdminMutation,
    useGetOrderAdminQuery, useConfirmOrderAdminMutation, useGetTopAdminProductQuery,
    useGetRevenueAdminQuery, useGetCompareRevenueAdminQuery,useLazyGetRevenueAdminQuery
} = OrderQuery;
