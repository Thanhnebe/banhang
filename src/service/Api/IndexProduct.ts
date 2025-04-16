import { createAsyncThunk } from "@reduxjs/toolkit";
import { DetailProductParams, ProductState, CreateProductState } from '../../model/entity/IndexProduct.entity';
import AxiosInstance from "../../utils/AxiosIntance";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from "../../constant/Host";

export const DetailProducts = createApi({
    reducerPath: 'detailProducts',
    baseQuery: fetchBaseQuery({ baseUrl: HOST.API }),
    tagTypes: ['DetailProduct'],

    endpoints: build => ({
        getProductsById: build.query<{ data: DetailProductParams[] }, string>({
            query: id => `/api/product/getdetail/${id}`,
            transformResponse: (response: { data: { products: DetailProductParams } }) => {
                return { data: [response.data.products] };
            },
            providesTags: [{ type: 'DetailProduct', id: 'LIST' }],
        }),
    }),
});

export const { useGetProductsByIdQuery, useLazyGetProductsByIdQuery } = DetailProducts;

const fetchProducts = createAsyncThunk<ProductState[], void>(
    'product/fetchProducts',
    async () => {
        try {
            const response = await AxiosInstance().get('/api/product/get-all');
            return response.data.products;
        } catch (error: any) {
            console.log('fetchProducts error:', error);
            throw new Error(error.message);
        }
    }
);

const fetProductsPagination = createAsyncThunk<ProductState[], { page: number, limit: number }>(
    'product/fetchProductsPagination',
    async ({ page, limit }) => {
        try {
            const response = await AxiosInstance().get(`/api/product/get-pagination?page=${page}&limit=${limit}`);
            return response.data.products;
        } catch (error: any) {
            console.log('fetProductsPagination error:', error);
            throw new Error(error.message);
        }
    }
);

const createProduct = async (body: CreateProductState, images: any[]) => {
    try {
        const formData = new FormData();
        formData.append('name', body.name);
        formData.append('model', body.model);
        formData.append('storage', body.storage);
        formData.append('description', body.description);
        formData.append('category', body.category);
        formData.append('brand', body.brand);
        formData.append('stock', body.stock.toString());
        formData.append('status', body.status);
        formData.append('condition', body.condition);
        formData.append('discount', JSON.stringify(body.discount));
        formData.append('specifications', JSON.stringify(body.specifications));
        formData.append('priceColor', JSON.stringify(body.priceColor));
        images.forEach((image: any, index: number) => {
            formData.append('images', {
                uri: image,
                name: `photo_${index}.jpg`, // Tên file tùy ý, có thể thay đổi
                type: 'image/jpeg', // Hoặc 'image/png' tùy thuộc vào định dạng ảnh
            } as any);
        });

        const response = await AxiosInstance('multipart/form-data').post('/api/product/admin/createProducts', formData);
        return response;
    } catch (error: any) {
        console.log('createProduct error:', error.message);
    }
}

const updateProduct = async (body: CreateProductState, images: any[], id: string) => {
    try {
        const formData = new FormData();
        formData.append('name', body.name);
        formData.append('model', body.model);
        formData.append('storage', body.storage);
        formData.append('description', body.description);
        formData.append('category', body.category);
        formData.append('brand', body.brand);
        formData.append('stock', body.stock.toString());
        formData.append('status', body.status);
        formData.append('condition', body.condition);
        formData.append('discount', JSON.stringify(body.discount));
        formData.append('specifications', JSON.stringify(body.specifications));
        formData.append('priceColor', JSON.stringify(body.priceColor));
        images.forEach((image: any, index: number) => {
            formData.append('images', {
                uri: image,
                name: `photo_${index}.jpg`,
                type: 'image/jpeg',
            } as any);
        });

        const response = await AxiosInstance('multipart/form-data').put(`/api/product/admin/updateProducts/${id}`, formData);
        return response;
    } catch (error: any) {
        console.log('updateProduct error:', error.message);
    }
}

const deleteProduct = async (id: string) => {
    try {
        const response = await AxiosInstance().delete(`/api/product/admin/deleteProducts/${id}`);
        return response;
    } catch (error: any) {
        console.log('deleteProduct error:', error.message);
    }
}


export { fetchProducts, fetProductsPagination, createProduct, updateProduct, deleteProduct };

