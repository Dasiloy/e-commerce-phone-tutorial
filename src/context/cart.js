import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const localData = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

export const CartContext = React.createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(localData());
  const [cartItem, setCartItem] = useState(0);
  const [total, setTotal] = useState(0);

  const removeItem = (id) => {
    const newCart = [...cart].filter(
      (item) => item.id !== id
    );
    setCart(newCart);
  };

  const increaseAmount = (id) => {
    const newCart = [...cart].map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      } else {
        return item;
      }
    });
    setCart(newCart);
  };

  const decreaseAmount = (id) => {
    const newCart = [...cart]
      .map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      })
      .filter((item) => item.amount !== 0);
    setCart(newCart);
  };

  const addToCart = (product) => {
    const { id, title, price, image } = product;
    const newItem = cart.find((item) => item.id === id);
    if (newItem) {
      increaseAmount(id);
      return;
    } else {
      const newCartItem = {
        id,
        price,
        amount: 1,
        title,
        image,
      };
      const newCart = [...cart, newCartItem];
      setCart(newCart);
    }
  };

  const calculateTotal = useCallback(() => {
    const totalValues = cart.reduce(
      (cartTotal, cartSingle) => {
        const { price, amount } = cartSingle;
        let cartValue = price * amount;
        cartTotal.itemsTotal += amount;
        cartTotal.priceTotal += cartValue;
        return cartTotal;
      },
      {
        priceTotal: 0,
        itemsTotal: 0,
      }
    );

    const { priceTotal, itemsTotal } = totalValues;
    const newPriceTotal = parseFloat(priceTotal.toFixed(2));
    setCartItem(itemsTotal);
    setTotal(newPriceTotal);
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        total,
        cartItem,
        cart,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  return useContext(CartContext);
};
