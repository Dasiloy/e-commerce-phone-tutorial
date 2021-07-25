import React, { useState } from "react";
import { useCartContext } from "../context/cart";
import { useUserContext } from "../context/user";
import EmptyCart from "../components/Cart/EmptyCart";
import { useHistory } from "react-router";
import submitOrder from "../strapi/submitOrder";
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from "react-stripe-elements";
function Checkout(props) {
  const { user, showAlert, hideAlert, alert } =
    useUserContext();
  const { cart, total, clearCart } = useCartContext();
  const history = useHistory();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const isEmpty = !name || alert.show;

  const handleSubmit = async (e) => {
    e.preventDefault();
    showAlert(
      true,
      "validating card details...please wait",
      "waiting"
    );

    const response = await props.stripe
      .createToken()
      .catch((error) => {
        console.log(error);
      });

    const { token } = response;
    if (token) {
      hideAlert();
      setError("");
      const { id } = token;
      let order = await submitOrder({
        name,
        total,
        items: cart,
        stripeToken: id,
        userToken: user.token,
      });
      if (order) {
        clearCart();
        history.push('/')
        showAlert(true, "order successful", "success");
        return;
      } else {
        showAlert(
          true,
          "error submiting your order. please try again",
          "danger"
        );
      }
    } else {
      hideAlert();
      const { error } = response;
      setError(error.message);
    }
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  } else {
    return (
      <section className='section form'>
        <h2 className='section-title'> checkout</h2>
        <form
          className='checkout-form'
          onSubmit={handleSubmit}>
          <h3>
            {" "}
            order-total <span>{total}</span>
          </h3>
          <div className='form-control'>
            <label form='name'>name</label>
            <input
              type='text'
              className=''
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='stripe-input'>
            <label htmlFor='card-element'>
              credit or debit card testing
            </label>
            <p className='stripe-info'>
              test using this credit cardd :{" "}
              <span>4242 4242 4242 4242</span> <br />
              enter any five digits for the zip code <br />
              enter any 3 digits for the CVV
            </p>
          </div>
          <CardElement className='card-element' />
          {error && <p className='form-empty'>{error}</p>}
          {isEmpty ? (
            <p className='form-empty'>
              please fill out the form fields correctly
            </p>
          ) : (
            <button
              type='submit'
              className='btn btn-block btn-primary'>
              submit
            </button>
          )}
        </form>
      </section>
    );
  }
}

const Cardform = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey='pk_test_51Iu7ZPK3yRJbldK4z5kcLIZnEHlPH9cwWnC6KczhCt08PYIEslThH8KNZCaO1Ef8Z0BWWbRceOXwsKswcgXnn63Q002zL8PA6u'>
      <Elements>
        <Cardform />
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
