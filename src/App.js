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
import Header from './components/Header'
import Alert from "./components/Alert";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Header />
      <Alert/>
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
        <PrivateRoute path='/checkout'>
          <Checkout />
        </PrivateRoute>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route
          path='/products/:id'
          children={<ProductDetails/>}></Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
