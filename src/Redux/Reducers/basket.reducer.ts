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
            const newProductList = state.products.filter((product: ProductDetails ) => Number(product.id) === Number(action.payload))
            return {
              products: newProductList,
            }
        default:
            return state;
    }
}