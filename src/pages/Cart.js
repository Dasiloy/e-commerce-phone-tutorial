import React from "react";
import { useCartContext } from "../context/cart";
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/user";

export default function Cart() {
const {user} = useUserContext()
  const { cart, total, cartItem } = useCartContext();
  if (cart.length === 0) {
    return <EmptyCart />;
  } else {
    return (
      <section className='section cart-items'>
        <h2>Your shopping Bag</h2>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
        <h2> total : ${total}</h2>
        <h2> items : {cartItem}</h2>
        {user.token ? (
          <Link
            to='/checkout'
            className='btn btn-primary btn-block'>
            checkout
          </Link>
        ) : (
          <Link
            to='/login'
            className='btn btn-primary btn-block'>
            login
          </Link>
        )}
      </section>
    );
  }
}
