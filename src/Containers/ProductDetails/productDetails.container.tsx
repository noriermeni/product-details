import React, {FC, useEffect, useState} from "react";
import styles from './productDetails.module.scss';
import {Link} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import {LeftArrow} from '../../assets/icons/leftArrow'
import {addToBasket} from "../../Redux/Actions/basket.actions";

import {ProductDetails} from "../../Types/productDetails";
import {ProductVariation} from "../../Types/ProductVariation";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import Tabs from '../../Components/Tabs/tabs.component'
import {Shimmer} from "react-shimmer";
import {Price} from "../../Components/Price/price.component";
import {ProductTitle} from "../../Components/ProductTitle/productTitle.component";
import {ProductDescription} from "../../Components/ProductDescription/productDescription.component";
import classNames from "classnames";

export type ButtonTypes = 'Add to Cart' | 'Loading...' | 'Item added to cart!' | 'View Cart';

const Product = (props: any) => {

    const dispatch = useDispatch();
    const basketItems = useSelector((state: any) => state?.basket?.products)

    const [ productDetails, setProductDetails ] = useState<ProductDetails>();
    const [ selectedVariation, setSelectedVariation] = useState<ProductVariation>();
    const [ buttonText, setButtonText ] = useState<ButtonTypes>('Add to Cart');

    useEffect(() => {
        props.location.state.product && props.location.state.product.variations.map((variation: ProductVariation) => variation.isSelected && setSelectedVariation(variation));
        setProductDetails(props.location.state.product);
    }, [])

    const findVariationProduct = (products: ProductDetails | undefined) => {
        let productDetailsForBasket = JSON.parse(JSON.stringify(products));
        productDetailsForBasket?.variations.splice(productDetailsForBasket?.variations.findIndex((idx: { isSelected: boolean; }) => !idx.isSelected), 1);
        return productDetailsForBasket;
    }

    const handleAddToBasket = () => {
        setTimeout(function(){ 
            setButtonText('Loading...');
         }, 2000);
        setTimeout(function(){ 
            setButtonText('Item added to cart!');
         }, 4000);
        setTimeout(function(){ 
            setButtonText('View Cart');
        }, 6000);
        const product = findVariationProduct(productDetails);
        dispatch(addToBasket(product));
    }

    const handleColorSelect = (e: any) => {
        let oldProductDetails = productDetails;
        oldProductDetails?.variations?.find(variation => {
            if(Number(variation.id) === Number(e.target.value)) {
                variation.isSelected = true;
                setSelectedVariation(variation);
            } else {
                variation.isSelected = false;
            }
        })
        setProductDetails(oldProductDetails)
    }

    return <div className={styles.container}>
        <div className={styles.leftContainer}>
            <div className={styles.backButton}>
                <Link to={'/'}>
                    <div className={styles.leftButton}>
                        <LeftArrow />
                        <p className={styles.text}>All Products</p>
                    </div>
                </Link>
                <div className={styles.basketButton}>
                    <Link to={'/basket'}>Go To Basket</Link>
                </div>
            </div>
            <div className={styles.box}>
                <ProductTitle text={productDetails?.productName} />
                <ProductDescription text={productDetails?.description} />
            </div>
            <div className={styles.box}>
                {productDetails?.details && productDetails?.description && <Tabs details={productDetails?.details} description={productDetails?.productDescription} />}
            </div>
            <div className={styles.box}>
                <Price regularPrice={selectedVariation?.regularPrice} retailPrice={selectedVariation?.retailPrice} fontSize={'lg'} />
            </div>
            <div className={styles.box}>
                <Form.Select onChange={handleColorSelect} className={styles.selectVariation}>
                    {React.Children.toArray(productDetails?.variations.map(variation =>
                        <option value={variation.id}>{variation.name}</option>
                    ))}
                </Form.Select>
            </div>
            <div className={classNames({
                [styles.box]: true,
                [styles.borderTop]: true,
            })}>
                <Button onClick={handleAddToBasket} variant="primary" size="lg" className={styles.addToBasketButton}>
                    <span className={styles.buttonText}>{buttonText}</span>
                </Button>
            </div>
        </div>

        <div className={styles.rightContainer}>
            {selectedVariation?.img ?
                <img loading={'lazy'} className={styles.productDefaultImage} src={selectedVariation?.img} alt={selectedVariation?.name}/>
                : <Shimmer width={300} height={700} /> }
        </div>
    </div>
}

export default Product;
