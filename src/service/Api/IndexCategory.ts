import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../utils/AxiosIntance";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from "../../constant/Host";
import { CategoryState } from "../../model/entity/IndexCategory.entity";

export const AdminCategoriesQuery = createApi({
    reducerPath: 'adminCategories',
    baseQuery: fetchBaseQuery({ baseUrl: HOST.API }),
    tagTypes: ['AdminCategory'],
    endpoints: build => ({
        detailCategory: build.query<{ data: CategoryState }, string>({
            query: id => `/api/category/detail/${id}`,
            providesTags: [{ type: 'AdminCategory', id: 'LIST' }],
        }),
        createCategory: build.mutation<{ data: any }, any>({
            query: (body) => {
                const formData = new FormData();
                formData.append('name', body.name);
                if (body.image) {
                    formData.append('images', {
                        name: body.image.fileName,
                        type: body.image.type,
                        uri: body.image.uri,
                    });
                }
                return {
                    url: '/api/category/admin/create',
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };
            },
            invalidatesTags: [{ type: 'AdminCategory', id: 'LIST' }],
        }),

        updateCategory: build.mutation<{ data: any }, { id: string, body: any }>({
            query: ({ id, body }) => {
                const formData = new FormData();
                formData.append('name', body.name);
                if (body.image) {
                    formData.append('images', {
                        name: body.image.fileName,
                        type: body.image.type,
                        uri: body.image.uri,
                    });
                }
                return {
                    url: `/api/category/admin/update/${id}`,
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };
            },
            invalidatesTags: [{ type: 'AdminCategory', id: 'LIST' }],
        }),
        deleteCategory: build.mutation<{ data: any }, string>({
            query: id => ({
                url: `/api/category/admin/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'AdminCategory', id: 'LIST' }],
        }),
    }),
});

export const { useDetailCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = AdminCategoriesQuery;


const fetchCategoryProduct = createAsyncThunk(
    'category/fetchCategoryProduct',
    async () => {
        try {
            const response = await AxiosInstance().get('/api/category/get-all')
            return response.data
        } catch (error: any) {
            console.log("🚀 ~ fetchCategoryProduct ~ error:", error)
        }
    }
)


export { fetchCategoryProduct }