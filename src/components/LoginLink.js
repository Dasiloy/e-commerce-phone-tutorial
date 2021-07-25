import React from "react";
import { useUserContext } from "../context/user";
import { useCartContext } from "../context/cart";
import { Link } from "react-router-dom";
export default function LoginLink() {
  const { user, userLogOut } = useUserContext();
  const { clearCart } = useCartContext();
  if (user.token) {
    return (
      <button
        className='login-btn'
        onClick={() => {
          clearCart();
          userLogOut();
        }}>
        logout 
      </button>
    );
  } else {
    return <Link to='/login'>login</Link>;
  }
}
