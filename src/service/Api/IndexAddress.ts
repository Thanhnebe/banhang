import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from "../../constant/Host";
import { AddressEntity, CreateAddressEntity, UpdateAddressEntity } from "../../model/entity/IndexAddress.entity";

export const AddressQuery = createApi({
    reducerPath: 'address',
    baseQuery: fetchBaseQuery({ baseUrl: HOST.API }),
    tagTypes: ['TypeAddress'],
    endpoints: build => ({
        getAddressIdUser: build.query<{ data: AddressEntity[] }, string>({
            query: (user_id) => {
                return {
                    url: `api/address/getIdUser/${user_id}`,
                    method: 'GET'
                }
            },
            providesTags: [{ type: 'TypeAddress', id: 'ADDRESS' }],
        }),
        getAddressId: build.query<{ data: AddressEntity }, string>({
            query: (id) => {
                return {
                    url: `api/address/getById/${id}`,
                    method: 'GET'
                }
            },
            providesTags: [{ type: 'TypeAddress', id: 'ADDRESS' }],
        }),
        createAddress: build.mutation<AddressEntity, CreateAddressEntity>({
            query: (body) => {
                return {
                    url: 'api/address/create',
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: [{ type: 'TypeAddress', id: 'ADDRESS' }],
        }),
        updateAddress: build.mutation<AddressEntity, { id: string, body: UpdateAddressEntity }>({
            query: ({ id, body }) => {
                return {
                    url: `api/address/update/${id}`,
                    method: 'PUT',
                    body: body
                }
            },
            transformErrorResponse: (response, meta, arg) => response.status,
            invalidatesTags: [{ type: 'TypeAddress', id: 'ADDRESS' }],
            
        }),
        deleteAddress: build.mutation<{ message: string }, string>({
            query: (id) => {
                return {
                    url: `api/address/delete/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: [{ type: 'TypeAddress', id: 'ADDRESS' }],
        })
    })
});

export const
    {
        useGetAddressIdUserQuery, useGetAddressIdQuery,
        useCreateAddressMutation, useUpdateAddressMutation,
        useDeleteAddressMutation
    } = AddressQuery;