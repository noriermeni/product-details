export function addToBasket(product: any) {
    return {
        type: 'ADD_TO_BASKET',
        payload: product
    }
}

export function removeFromBasket(productId: number) {
    return {
        type: 'REMOVE_FROM_BASKET',
        payload: productId
    }
}