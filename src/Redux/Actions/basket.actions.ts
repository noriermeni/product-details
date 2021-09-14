export function addToBasket(product: any) {
    return {
        type: 'ADD_TO_BASKET',
        payload: product,
    }
}

export function removeFromBasket(value: any) {
    return {
        type: 'REMOVE_FROM_BASKET',
        payload: value,
    }
}