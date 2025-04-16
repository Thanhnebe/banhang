import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBannerProduct } from "../../service/Api/IndexBanner";
import { BannerState } from "../../model/entity/IndexBanner.entity";


interface BannerProductState {
    data: BannerState[];
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: string;
    loading: boolean;
}


const initialState: BannerProductState = {
    data: [],
    status: 'idle',
    error: '',
    loading: false
}

const BannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBannerProduct.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
        });
        builder.addCase(fetchBannerProduct.fulfilled, (state, action) => {
            state.status = 'success';
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchBannerProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.loading = false;
            state.error = action.error.message || 'Lỗi thấy mọe lun bug lỏ zậy';
        });
    }
})

export default BannerSlice.reducer;
