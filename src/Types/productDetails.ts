import {ProductVariation} from "./ProductVariation";

export interface ProductDetails {
    id: number;
    productName: string;
    description: string;
    productDescription: string;
    details: string;
    variations: Array<ProductVariation>;
}

