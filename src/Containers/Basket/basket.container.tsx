import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './basket.module.scss';
import {removeFromBasket} from "../../Redux/Actions/basket.actions";

const Basket = () => {

    const dispatch = useDispatch();
    const basketItems = useSelector((state: any) => state.basket.products);

    useEffect(()=>{
        console.log(basketItems,'testttttt')
    },[basketItems])

    const handleDeleteProduct = (id: number) => {
        dispatch(removeFromBasket(id))
    }

    return <>
        <p>All Products</p>
        {React.Children.toArray(basketItems && basketItems.map((product:any,idx: number) => <div>
            <div>{product.name}</div>
            <div>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete Product </button>
            </div>
        </div>))}
    </>
}

export default Basket;
