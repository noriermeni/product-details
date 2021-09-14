import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './basket.module.scss';
import {removeFromBasket} from "../../Redux/Actions/basket.actions";
import {LeftArrow} from "../../assets/icons/leftArrow";
import {Link} from "react-router-dom";
import { Shimmer } from 'react-shimmer'
import {Price} from "../../Components/Price/price.component";
import {ProductTitle} from "../../Components/ProductTitle/productTitle.component";
import {ProductDescription} from "../../Components/ProductDescription/productDescription.component";
import Button from "react-bootstrap/Button";
import EmptyBasket from '../../assets/icons/emptyBasket.png'
import {ProductDetails} from "../../Types/productDetails";

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
            {React.Children.toArray(basketItems.length > 0 ?
                basketItems.map((product: ProductDetails) => <div className={styles.basketItem}>
                        <div className={styles.basketItemBox}>
                            {product.variations[0].img ?
                                <img loading={'lazy'} className={styles.image} src={product.variations[0].img} alt=""/>
                                : <Shimmer width={150} height={100} /> }
                        </div>
                        <div className={styles.basketItemBox}>
                            <ProductTitle text={product.productName} fontSize={'md'} />
                            <ProductDescription text={product?.description} cutText />
                        </div>
                        <div className={styles.basketItemBox}>
                            <Price regularPrice={product.variations[0].retailPrice ? product.variations[0].retailPrice : product.variations[0].regularPrice} fontSize={'sm'} />
                        </div>
                        <div className={styles.basketItemBox}>
                            <Button onClick={() => handleDeleteProduct(product.id, product.variations[0].id)}
                                    variant="outline-danger"
                                    size="sm"
                            >Delete Product</Button>
                        </div>
                    </div>
                ) : <div className={styles.emptyContainer}>
                    <img loading={'lazy'} src={EmptyBasket} alt={"Empty1 Basket Icon"} />
                    <ProductTitle text={'There are no products in Basket!'} fontSize={'lg'} />
                </div> )}
        </div>
    </div>
}

export default Basket;
