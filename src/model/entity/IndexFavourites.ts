import { ProductState } from "./IndexProduct.entity";

export interface FavouritesEntity {
    _id: string;
    userId: string;
    productId: ProductState;
}

export interface CreateFavouritesEntity {
    userId: string;
    productId: string;
}

