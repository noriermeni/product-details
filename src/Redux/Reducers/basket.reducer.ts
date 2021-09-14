const initialState = {
    products: [],
}

export const basketReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                products: action.payload,
            }
        case 'REMOVE_FROM_BASKET':
          const newProductList = state.products.filter((product: any) => {
                return product.id === action.payload;
          })
            return {
              products: newProductList,
            }
        default:
            return state;
    }
}