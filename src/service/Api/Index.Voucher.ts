import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HOST } from "../../constant/Host";
import { UseVoucherEntity, VoucherEntity, CreateVoucherEntity, UpdateVoucherEntity } from "../../model/entity/Index.Voucher.entity";

const VoucherQuery = createApi({
    reducerPath: 'VoucherQuery',
    baseQuery: fetchBaseQuery({ baseUrl: HOST.API }),
    tagTypes: ['Voucher'],
    endpoints: build => ({
        useVoucher: build.mutation<VoucherEntity, UseVoucherEntity>({
            query: (body) => ({
                url: '/api/voucher/use',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Voucher', id: 'LIST' }],
        }),
        getVoucher: build.query<{ data: VoucherEntity[] }, { userId: string, usersApplicable: string }>({
            query: ({ userId, usersApplicable }) => {
                return {
                    url: `/api/voucher/list/${usersApplicable}?userId=${userId}`,
                    method: 'GET'
                }
            },
            providesTags: [{ type: 'Voucher', id: 'LIST' }],
        }),
        getVoucherById: build.query<{ data: VoucherEntity }, string>({
            query: (id) => {
                return {
                    url: `/api/voucher/detail/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['Voucher'],
        }),
        updateVoucher: build.mutation<VoucherEntity, { id: string, voucher: VoucherEntity }>({
            query: ({ id, voucher }) => {
                return {
                    url: `/api/voucher/update/${id}`,
                    method: 'PUT',
                    body: voucher
                }
            },
            invalidatesTags: [{ type: 'Voucher', id: 'LIST' }],
        }),
        resetUsage: build.mutation<VoucherEntity, { id: string, userId: string }>({
            query: ({ id, userId }) => {
                return {
                    url: `/api/voucher/reset-usage`,
                    method: 'PUT',
                    body: { id, userId }
                }
            },
            invalidatesTags: [{ type: 'Voucher', id: 'LIST' }],
        }),
        getAllAdminVoucher: build.query<{ data: VoucherEntity[] }, void>({
            query: () => ({
                url: '/api/voucher/admin/list/get-all',
                method: 'GET'
            }),
            providesTags: [{ type: 'Voucher', id: 'LIST' }],
        }),
        deleteAdminVoucher: build.mutation<VoucherEntity, string>({
            query: (id) => ({
                url: `/api/voucher/admin/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Voucher', id: 'LIST' }],
        }),
        createAdminVoucher: build.mutation<VoucherEntity, any>({
            query: (body) => {
                const formData = new FormData();
                formData.append('name', body.name);
                formData.append('code', body.code);
                formData.append('discount', body.discount.toString());
                formData.append('description', body.description);
                formData.append('condition', body.condition);
                formData.append('maxDiscountAmount', body.maxDiscountAmount.toString());
                formData.append('minOrderAmount', body.minOrderAmount.toString());
                formData.append('usageLimit', body.usageLimit.toString());
                formData.append('paymentMethod', body.paymentMethod);
                formData.append('expirationDate', body.expirationDate);
                formData.append('usersApplicable', body.usersApplicable);
                formData.append('images', {
                    name: body.images.fileName,
                    type: body.images.type,
                    uri: body.images.uri,
                });
                return {
                    url: '/api/voucher/admin/create',
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            }
        }),
        updateAdminVoucher: build.mutation<{ data: VoucherEntity }, { id: string, body: any }>({
            query: ({ id, body }) => {
                const formData = new FormData();
                formData.append('name', body.name);
                formData.append('code', body.code);
                formData.append('discount', body.discount.toString());
                formData.append('description', body.description);
                formData.append('condition', body.condition);
                formData.append('maxDiscountAmount', body.maxDiscountAmount.toString());
                formData.append('minOrderAmount', body.minOrderAmount.toString());
                formData.append('usageLimit', body.usageLimit.toString());
                formData.append('paymentMethod', body.paymentMethod);
                formData.append('expirationDate', body.expirationDate);
                if (body.usersApplicable) {
                    formData.append('usersApplicable', JSON.stringify(body.usersApplicable));
                }
                
                if (body.images) {
                    formData.append('images', {
                        name: body.images.fileName,
                        type: body.images.type,
                        uri: body.images.uri,
                    });
                }
                console.log('formData', formData)
                return {
                    url: `/api/voucher/admin/updateVoucher/${id}`,
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            },
            invalidatesTags: [{ type: 'Voucher', id: 'LIST' }],
        }),
        getDetailAdminVoucher: build.query<{ data: VoucherEntity }, string>({
            query: (id) => ({
                url: `api/voucher/admin/detail/${id}`,
                method: 'GET'
            }),
            providesTags: [{ type: 'Voucher', id: 'LIST' }],
        })
    })
})


export const
    {
        useGetVoucherQuery, useGetVoucherByIdQuery, useUseVoucherMutation,
        useUpdateVoucherMutation, useResetUsageMutation, useGetAllAdminVoucherQuery,
        useDeleteAdminVoucherMutation, useCreateAdminVoucherMutation, useUpdateAdminVoucherMutation,
        useGetDetailAdminVoucherQuery
    }
        = VoucherQuery;
export default VoucherQuery