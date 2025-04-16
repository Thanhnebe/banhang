export interface OrderEntity {
    _id: string;
    user: string;
    products: [{
        _id: string;
        name: string;
        model: string;
        storage: string;
        priceColor: {
            color: string;
            price: number;
            image: string;
        };
        quantity: number;
    }]
    totalAmount: number;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    shippingAddress: string;
    shippingFee: number;
    voucher: string;
    note: string;
    reasonCancel: string;
    paymentCode: string;
    orderCode: string;
    createdAt: string;
    updatedAt: string;
    deliveredAt: Date;
    canceledAt: Date;
}

export interface UpdateOrderEntity {
    status: string;
    canceledAt: Date;
}

export interface CreateOrderEntity {
    _id: string;
    user: string;
    products: [{
        _id: string;
        name: string;
        model: string;
        storage: string;
        priceColor: {
            color: string;
            price: number;
            image: string;
        };
        quantity: number;
    }]
    totalAmount: number;
    shippingAddress: string;
    shippingFee: number;
    voucher: string;
    note: string;
    createdAt: string;
}

export const status = ["Chờ xác nhận", "Đã xác nhận"];
export const paymentStatus = ["Chờ thanh toán", "Đã thanh toán"];


