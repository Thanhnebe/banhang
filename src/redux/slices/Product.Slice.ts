import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "../../service/Api/IndexProduct";
import { ProductState } from "../../model/entity/IndexProduct.entity";

interface ProductActionState {
    data: ProductState[];
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: string | null;
    loading: boolean;
    nextPage: number;
}

const initialState: ProductActionState = {
    data: [],
    status: 'idle',
    error: null,
    loading: false,
    nextPage: 1,
}

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductState[]>) => {
            state.status = 'success';
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.loading = false;
            state.error = action.error.message || 'Lỗi Rồi cứu bé đi ạ!';
        });
    }
});

export default ProductSlice.reducer;
