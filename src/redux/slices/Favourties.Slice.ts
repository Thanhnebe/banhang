import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosInstance from '../../utils/AxiosIntance';
import { FavouritesEntity, CreateFavouritesEntity } from '../../model/entity/IndexFavourites';


export const fetchFavourites = createAsyncThunk<FavouritesEntity[], string>(
    'favourites/fetchFavourites',
    async (userId) => {
        try {
            const response = await AxiosInstance().get(`/api/favourites/get?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.log('fetchFavourites error:', error);
        }
    }
);

export const addFavourite = createAsyncThunk<FavouritesEntity, CreateFavouritesEntity>(
    'favourites/addFavourite',
    async ({ userId, productId }, thunkAPI) => {
        try {
            const response = await AxiosInstance().post('/api/favourites/add', { userId, productId });
            return response.data;
        } catch (error) {
            console.log('addFavourite error:', error);
        }
    }
);

export const removeFavourite = createAsyncThunk<string, string>(
    'favourites/removeFavourite',
    async (favouriteId) => {
        try {
            const response = await AxiosInstance().delete(`/api/favourites/remove/${favouriteId}`);
            return response.data;
        } catch (error) {
            console.log('removeFavourite error:', error);
        }
    }
);

interface FavouritesState {
    items: FavouritesEntity[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FavouritesState = {
    items: [],
    status: 'idle',
    error: null,
};


const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchFavourites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Lỗi Rồi cứu bé đi ạ!';
            })
            .addCase(addFavourite.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addFavourite.rejected, (state, action) => {
                state.error = action.error.message || 'Lỗi Rồi cứu bé đi ạ!';
            })
            .addCase(removeFavourite.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item._id !== action.payload);
            })
            .addCase(removeFavourite.rejected, (state, action) => {
                state.error = action.error.message || 'Lỗi Rồi cứu bé đi ạ!';
            });
    },
});

export default favouritesSlice.reducer;
