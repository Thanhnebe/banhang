export interface Response {
    status: number;
    message: string;
    data: any;
}

export interface ResponseError {
    status: number;
    message: string;
    data: null;
}

