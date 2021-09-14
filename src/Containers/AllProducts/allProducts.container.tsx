import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from './allProducts.module.scss';
import Black from '../../assets/images/black.jpg';
import Brown from '../../assets/images/brown.jpg';
import {ProductDetails} from "../../Types/productDetails";

const AllProducts = () => {
    const [ products, setProducts ] = useState<Array<ProductDetails>>([
        {
            id: 1,
            productName: 'Audio-technica ATH-MSR7',
            description: '2017 Best Headphones of the Year Award winner',
            details: 'Lorem Ipsum is simply dummy text to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            productDescription: 'It is a long establis using `Content here, content here`, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for `lorem ipsum` will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.',
            variations: [
                {
                    id: 1,
                    name: 'brown',
                    img: Brown,
                    regularPrice: 89.99,
                    retailPrice: 59.99,
                    isSelected: true,
                },
                {
                    id: 2,
                    name: 'black',
                    img: Black,
                    regularPrice: 89.99,
                    retailPrice: 59.99,
                    isSelected: false,
                }
            ]
        }
    ])

    return <div className={styles.container}>
        {React.Children.toArray(products && products.map(product => <div className={styles.boxContainer}>
            <Link to={{ pathname: `/product/${product.id}`, state: { product } }}>
                <div className={styles.imageContainer}>
                    <img src={product?.variations[0]?.img} alt="" className={styles.image}/>
                </div>
                <div className={styles.name}>
                    <h3>{product.productName}</h3>
                </div>
                <div className={styles.details}>
                    <p>{product?.description}</p>
                    <div>
                        {product?.variations[0].retailPrice ? <>
                            <span className={styles.retailPrice}>${product?.variations[0].retailPrice}</span>
                            <span className={styles.regularPrice}>${product?.variations[0].regularPrice}</span>
                        </> :
                            <span className={styles.retailPrice}>${product?.variations[0].regularPrice}</span>
                        }
                    </div>
                </div>
            </Link>
        </div>))}
    </div>
}

export default AllProducts;
