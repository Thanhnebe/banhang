import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategoryProduct } from "../../service/Api/IndexCategory";
import { CategoryState } from '../../model/entity/IndexCategory.entity';


interface CategoryProductState {
    data: CategoryState[];
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: string;
    loading: boolean;
}


const initialState: CategoryProductState = {
    data: [],
    status: 'idle',
    error: '',
    loading: false
}

const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategoryProduct.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
        });
        builder.addCase(fetchCategoryProduct.fulfilled, (state, action) => {
            state.status = 'success';
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchCategoryProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.loading = false;
            state.error = action.error.message || 'Lỗi thấy mọe lun bug lỏ zậy';
        });
    }
})

export default CategorySlice.reducer;
