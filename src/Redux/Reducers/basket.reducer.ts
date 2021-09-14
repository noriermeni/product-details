import {ProductDetails} from "../../Types/productDetails";
import {toast} from "react-toastify";

const initialState = {
    products: [],
}

export const basketReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            const isInCart = state.products.find((product: ProductDetails)=>{
                return product.id === action.payload.id && product.variations[0].id === action.payload.variations[0].id;
            })
            if(!isInCart){
                toast.success("Product added successfully to the basket!")
                return {
                    products: [...state.products, action.payload]
                }
            }
            else{
                toast.error("Product exists in Basket!");
                return state;
            }
        case 'REMOVE_FROM_BASKET':
            toast.success("Product removed successfully from the basket!")
            return { products: state.products.filter((product: ProductDetails ) =>
                product.id === action.payload.productId && product.variations[0].id !== action.payload.variationId )
            }
        default:
            return state;
    }
}