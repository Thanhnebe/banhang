import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateUser, UserState } from "../../model/entity/IndexUsers.entity";


const initialState: UserState = {
    isLogged: false,
    user: {
        _id: "",
        email: "",
        phone: "",
        fullname: "",
        gender: "",
        date_of_birth: new Date(),
        photoUrl: "",
        otp: "",
        provider: "",
        role: "",
        fcmToken: ""
    }
}

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        Login: (state, action: PayloadAction<UserState>) => {
            state.isLogged = true;
            state.user = action.payload.user;
        },
        Update: (state, action: PayloadAction<UpdateUser>) => {
            state.user.fullname = action.payload.fullname;
            state.user.phone = action.payload.phone;
            state.user.date_of_birth = action.payload.date_of_birth;
            state.user.gender = action.payload.gender;
            state.user.photoUrl = action.payload.photoUrl;
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state.user.fcmToken = action.payload;
        },
        Logout: (state) => {
            state.isLogged = false;
            state.user = {} as UserState['user'];
        }
    }
})

export const { Login, Update, Logout, updateToken } = AuthSlice.actions;
export default AuthSlice.reducer;