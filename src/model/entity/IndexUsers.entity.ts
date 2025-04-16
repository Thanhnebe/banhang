export interface Users {
    _id: string;
    email: string;
    fullname: string;
    phone: string;
    photoUrl: string;
    date_of_birth: Date;
    gender: string;
    provider?: string;
    otp?: string;
    fcmToken: string;
    role: string;
}

export interface UserState {
    isLogged: boolean;
    user: Users;
}

export interface UpdateUser {
    fullname: string;
    phone: string;
    photoUrl: string;
    date_of_birth: Date;
    gender: string;
}