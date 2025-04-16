interface EvaluateEntity {
    _id: string;
    order_id: string;
    user_id: string;
    rating: number;
    comment: string;
    detail: object;
    media: Array<string>;
    status: string;
    created_at: string;
    updated_at: string;
}

interface CreateEvaluateEntity {
    order_id: string;
    user_id: string;
}

interface UpdateEvaluateEntity {
    rating: number;
    comment: string;
    detail: object;
    media?: Array<string>;
    status: string;
    updated_at: string;
}

export type { EvaluateEntity, CreateEvaluateEntity, UpdateEvaluateEntity };
