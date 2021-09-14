import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './basket.module.scss';
import {removeFromBasket} from "../../Redux/Actions/basket.actions";
import {LeftArrow} from "../../assets/icons/leftArrow";
import {Link} from "react-router-dom";

const Basket = () => {

    const dispatch = useDispatch();
    const basketItems = useSelector((state: any) => state.basket.products);

    const handleDeleteProduct = (productId: number, variationId: number) => {
        dispatch(removeFromBasket({productId: productId, variationId: variationId}))
    }

    return <div className={styles.container}>
        <Link to={'/'}>
            <div className={styles.leftButton}>
                <LeftArrow />
                <p className={styles.text}>All Products</p>
            </div>
        </Link>
        <div className={styles.basketList}>
            {React.Children.toArray(basketItems && basketItems.map((product:any,idx: number) => <div className={styles.basketItem}>
                <div className={styles.basketItemBox}>
                    <img className={styles.image} src={product.variations[0].img} alt=""/>
                </div>
                <div className={styles.basketItemBox}>
                    <div>{product.productName}</div>
                    <div className={styles.description}>{product.description}</div>
                </div>
                <div className={styles.basketItemBox}>
                    <span>{product.variations[0].retailPrice ? product.variations[0].retailPrice : product.regularPrice}</span>
                </div>
                <div className={styles.basketItemBox}>
                    <span onClick={() => handleDeleteProduct(product.id, product.variations[0].id)}>Delete Product </span>
                </div>
            </div>))}
        </div>
    </div>
}

export default Basket;
