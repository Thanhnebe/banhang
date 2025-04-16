interface data {
    type?: string;
    id?: string;
    userId?: string;
    orderId?: any;
    name?: string;
}

interface NotificationEntity {
    _id: string;
    title: string;
    body: string;
    data: data;
    isRead: boolean;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

interface CreateNotificationEntity {
    title: string;
    body: string;
    data: data;
    isRead: boolean;
    isAdmin: boolean;
}

interface UpdateNotificationEntity {
    _id: string;
    isRead: boolean;
}

export type { NotificationEntity, CreateNotificationEntity, UpdateNotificationEntity };