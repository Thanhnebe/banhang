import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../../utils/AxiosIntance';
import { CartEntity } from '../../model/entity/IndexCart.entity';

// Thunk để lấy danh sách mặt hàng trong giỏ hàng
export const fetchGetCountCart = createAsyncThunk<CartEntity[], string>(
    'cart/fetchGetCountCart',
    async (id, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().get(`/api/cart/getCartUserId/${id}`);
            return response.data;
        } catch (error) {
            console.log('fetchGetCountCart error:', error);
            return rejectWithValue('Failed to fetch cart items');
        }
    }
);

interface CountCartsState {
    itemCount: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CountCartsState = {
    itemCount: 0,
    status: 'idle'
}

const CountCartSlice = createSlice({
    name: 'countCart',
    initialState,
    reducers: {
        setItemCount: (state: CountCartsState, action: PayloadAction<number>) => {
            state.itemCount = action.payload;
        },
        incountCrement: (state: CountCartsState) => {
            state.itemCount += 1;
        },
        incrementItemCount: (state: CountCartsState, action: PayloadAction<number>) => {
            state.itemCount += action.payload;
            if (state.itemCount < 0) {
                state.itemCount = 0;
            }
        },
        decrementItemCount: (state: CountCartsState, action: PayloadAction<number>) => {
            state.itemCount -= action.payload;
            if (state.itemCount < 0) {
                state.itemCount = 0;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetCountCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetCountCart.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    // Lọc mặt hàng có trạng thái là "giỏ hàng"
                    const cartItemsInCart = action.payload.filter(item => item.status === 'giỏ hàng');
                    state.itemCount = cartItemsInCart.length;
                } else {
                    state.itemCount = 0;
                }
            })
            .addCase(fetchGetCountCart.rejected, (state, action) => {
                state.status = 'failed';
                console.log('fetchGetCountCart error:', action.payload);
            });
    }
})

export default CountCartSlice.reducer;
export const { setItemCount, incrementItemCount, decrementItemCount, incountCrement } = CountCartSlice.actions;
