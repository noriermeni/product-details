export interface ProductVariation {
    id: number;
    name: string;
    img: string;
    regularPrice: number;
    retailPrice?: number;
    isSelected: boolean;
}