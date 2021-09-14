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

    useEffect(()=>{
        console.log(basketItems);
    },[basketItems])

    useEffect(() => {
        console.log(productDetails);
    }, [productDetails])

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
        let productDetailsForBasket = productDetails;
        productDetailsForBasket?.variations.splice(productDetailsForBasket?.variations.findIndex(function(i){
            return !i.isSelected;
        }), 1);
        console.log(productDetailsForBasket)
        console.log(productDetails)
        dispatch(addToBasket(productDetailsForBasket));
    }

    const handleColorSelect = (e: any) => {
        console.log(e.target.value)
        let oldProductDetails = productDetails;
        oldProductDetails?.variations?.find(variation => {
            if(Number(variation.id) === Number(e.target.value)) {
                variation.isSelected = true;
                setSelectedVariation(variation);
            } else {
                variation.isSelected = false;
            }
        })
        console.log(oldProductDetails)
        setProductDetails(oldProductDetails)
    }

    return <div className={styles.container}>
        <div className={styles.leftContainer}>
            <div className={styles.backButton}>
                <Link to={'/'}>
                    <LeftArrow />
                    <span className={styles.text}>All Products</span>
                </Link>
            </div>
            <div className={styles.box}>
                <h2>{productDetails?.productName}</h2>
                <p className={styles.description}>{productDetails?.description}</p>   
            </div>
            <div className={styles.box}>
                {productDetails?.details && productDetails?.description && <Tabs details={productDetails?.details} description={productDetails?.productDescription} />}
            </div>
            <div className={styles.box}>
                <div>
                    {selectedVariation?.retailPrice ? <>
                        <span className={styles.retailPrice}>${selectedVariation?.retailPrice}</span>
                        <span className={styles.regularPrice}>${selectedVariation?.regularPrice}</span>
                    </> :
                        <span className={styles.retailPrice}>${selectedVariation?.regularPrice}</span>
                    }
                </div>
            </div>
            <div className={styles.box}>
                <Form.Select onChange={handleColorSelect} className={styles.selectVariation}>
                    {React.Children.toArray(productDetails?.variations.map(variation =>
                        <option value={variation.id}>{variation.name}</option>
                    ))}
                </Form.Select>
            </div>
            <div className={styles.box}>
                <Button onClick={handleAddToBasket} variant="primary" size="lg">{buttonText}</Button>
            </div>
        </div>

        <div className={styles.rightContainer}>
            {selectedVariation?.img && <img className={styles.productDefaultImage} src={selectedVariation?.img} alt={selectedVariation?.name}/>}
        </div>
    </div>
}

export default Product;
