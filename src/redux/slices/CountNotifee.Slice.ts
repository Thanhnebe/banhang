import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../../utils/AxiosIntance';
import { NotificationEntity } from '../../model/entity/Index.Notification.entity';

// Thunk để lấy danh sách mặt hàng trong giỏ hàng
export const fetchGetCountNotification = createAsyncThunk<NotificationEntity[], string>(
    'notification/fetchGetCountNotification',
    async (id, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().get(`/api/notifee/get/${id}`);
            return response.data;
        } catch (error) {
            console.log('fetchGetCountNotification error:', error);
            return rejectWithValue('Failed to fetch cart items');
        }
    }
);

interface CountNotificationState {
    itemCount: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CountNotificationState = {
    itemCount: 0,
    status: 'idle'
}

const CountNotificationSlice = createSlice({
    name: 'countCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetCountNotification.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetCountNotification.fulfilled, (state, action) => {
                state.status = 'idle';
                state.itemCount = action.payload.length;
            })
            .addCase(fetchGetCountNotification.rejected, (state) => {
                state.status = 'failed';
                console.log('fetchGetCountNotification failed');
            })
    }
})

export default CountNotificationSlice.reducer;


