import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AddressType, UpdateAddressEntity } from '../../model/entity/IndexAddress.entity';
import { useGetAddressIdQuery } from '../../service/Api/IndexAddress';
import AxiosInstance from '../../utils/AxiosIntance';

interface AddressState {
    update: UpdateAddressEntity;
    isLoading: boolean;
    error: string | null;
}

const initialState: AddressState = {
    update: {
        _id: '',
        houseNumber: '',
        name: '',
        province: '',
        district: '',
        ward: '',
        phone: '',
        addressType: '',
        isDefault: false
    },
    isLoading: false,
    error: null
};

export const fetchAddressById = createAsyncThunk(
    'address/fetchById',
    async (id: string) => {
        const response = await AxiosInstance().get(`/api/address/getById/${id}`);
        return response.data;
    }
);

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setUpdate: (state, action: PayloadAction<Partial<UpdateAddressEntity>>) => {
            state.update = { ...state.update, ...action.payload };
        },
        setAddressFromParams: (state, action: PayloadAction<{ province: string, district: string, ward: string }>) => {
            state.update.province = action.payload.province;
            state.update.district = action.payload.district;
            state.update.ward = action.payload.ward;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAddressById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAddressById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.update = { ...state.update, ...action.payload };
        });
        builder.addCase(fetchAddressById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch address';
        });
    }
});

export const { setUpdate, setAddressFromParams } = addressSlice.actions;
export default addressSlice.reducer;
