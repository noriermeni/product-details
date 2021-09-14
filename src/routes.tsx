import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllProducts from "./Containers/AllProducts/allProducts.container";
import Product from "./Containers/ProductDetails/productDetails.container";
import Basket from "./Containers/Basket/basket.container";

export function Routes() {
    return <Router>
        <Switch>
            <Route exact path="/" component={AllProducts} />
            <Route path="/product/:id" component={Product} />
            <Route path="/basket" component={Basket} />
        </Switch>
    </Router>
}