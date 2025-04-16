import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetProductsPagination } from "../../service/Api/IndexProduct";
import { ProductPaginationState } from "../../model/entity/IndexProduct.entity";


interface ProductPaginationActionState {
    data: ProductPaginationState[];
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: string;
    loading: boolean;
    nextPage: number;
}


const initialState: ProductPaginationActionState = {
    data: [],
    status: 'idle',
    error: '',
    loading: false,
    nextPage: 1,
}

const ProductLimitedSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetProductsPagination.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
        });
        builder.addCase(fetProductsPagination.fulfilled, (state, action: PayloadAction<ProductPaginationState[]>) => {
            state.status = 'success';
            state.loading = false;
            state.nextPage += 1;
            state.data = state.data.concat(action.payload);
        });
        builder.addCase(fetProductsPagination.rejected, (state, action) => {
            state.status = 'failed';
            state.loading = false;
            state.error = action.error.message || 'Lỗi Rồi cứu bé đi ạ!';
        });

    }
})

export default ProductLimitedSlice.reducer