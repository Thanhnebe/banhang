import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../utils/AxiosIntance";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from "../../constant/Host";
import { BannerState } from "../../model/entity/IndexBanner.entity";

export const AdminBannerQuery = createApi({
    reducerPath: 'AdminBanner',
    baseQuery: fetchBaseQuery({ baseUrl: HOST.API }),
    tagTypes: ['Admin'],
    endpoints: build => ({
        detailBanner: build.query<{ data: BannerState }, string>({
            query: id => `/api/banner/admin/detail/${id}`,
            providesTags: [{ type: 'Admin', id: 'Banner' }],
        }),
        createBanner: build.mutation<{ data: any }, any>({
            query: (body) => {
                const formData = new FormData();
                formData.append('title', body.title);
                if (body.image) {
                    formData.append('images', {
                        name: body.image.fileName,
                        type: body.image.type,
                        uri: body.image.uri,
                    });
                }
                return {
                    url: '/api/banner/admin/create',
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };
            },
            invalidatesTags: [{ type: 'Admin', id: 'Banner' }],
        }),
        updateBanner: build.mutation<{ data: any }, { id: string, body: any }>({
            query: ({ id, body }) => {
                const formData = new FormData();
                formData.append('title', body.title);
                if (body.image) {
                    formData.append('images', {
                        name: body.image.fileName,
                        type: body.image.type,
                        uri: body.image.uri,
                    });
                }
                return {
                    url: `/api/banner/admin/update/${id}`,
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };
            },
            invalidatesTags: [{ type: 'Admin', id: 'Banner' }],
        }),
        deleteBanner: build.mutation<{ data: any }, string>({
            query: id => ({
                url: `/api/banner/admin/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Admin', id: 'Banner' }],
        }),
    }),
});

export const { useDetailBannerQuery, useCreateBannerMutation, useUpdateBannerMutation, useDeleteBannerMutation } = AdminBannerQuery;


const fetchBannerProduct = createAsyncThunk(
    'banner/fetchBannerProduct',
    async () => {
        try {
            const response = await AxiosInstance().get('/api/banner/get-all')
            return response.data
        } catch (error: any) {
            console.log("🚀 ~ fetchCategoryProduct ~ error:", error)
        }
    }
)

export { fetchBannerProduct }