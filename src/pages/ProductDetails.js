import React from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/products";
import Loading from "../components/Loading";
import { useHistory } from "react-router-dom";
import { useCartContext } from "../context/cart";

export default function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { products } = useGlobalContext();
  const { addToCart } = useCartContext();

  const specificProduct = products.find((item) => {
    return item.id === parseInt(id);
  });
  if (products.length === 0) {
    return <Loading />;
  } else {
    const { image, title, price, description } =
      specificProduct;
    return (
      <section className='single-product'>
        <img
          src={image}
          alt={title}
          className='single-product-image'
        />
        <article>
          <h1>{title}</h1>
          <h2>${price}</h2>
          <p>{description}</p>
          <button
            className='btn btn-primary btn-block'
            onClick={() => {
              addToCart(specificProduct);
              history.push("/cart");
            }}>
            add to cart
          </button>
        </article>
      </section>
    );
  }
}
