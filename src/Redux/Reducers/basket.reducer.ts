import {ProductDetails} from "../../Types/productDetails";

const initialState = {
    products: [],
}

export const basketReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                products: [...state.products, action.payload]
            }
        case 'REMOVE_FROM_BASKET':
            return { products: state.products.filter((product: ProductDetails ) =>
                product.id === action.payload.productId && product.variations[0].id !== action.payload.variationId
            )}
        default:
            return state;
    }
}