import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import LogIn from "./pages/Login";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/login'>
          <LogIn />
        </Route>
        <Route path='/checkout'>
          <Checkout />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route
          path='/products/:id'
          children={ProductDetails}></Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
