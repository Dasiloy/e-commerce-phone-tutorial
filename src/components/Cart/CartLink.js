import React from "react";
import { useCartContext } from "../../context/cart";
import { Link } from "react-router-dom";

export default function CartLink() {
  const { cartItem } = useCartContext();
  return (
    <div className='cart-link-container'>
      <Link to='/cart'>
        cart
        <span className='cart-link-total'>{cartItem}</span>
      </Link>
    </div>
  );
}



