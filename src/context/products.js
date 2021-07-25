import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import url from "../utils/URL";
import {
  FeaturedProducts,
  FlattenProducts,
  PaginateProduct,
} from "../utils/helpers";

const ProductContext = React.createContext();

export default function ProductProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [featured, setFeatuerd] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [filter, setfilter] = useState({
    shipping: false,
    searchTerm: "",
    price: "all",
    category: "all",
  });
  const [paginate, setPaginate] = useState(0);

  const fetchData = () => {
    try {
      axios.get(`${url}/products`).then((response) => {
        const products = FlattenProducts(response.data);
        const feature = FeaturedProducts(
          FlattenProducts(response.data)
        );
        setSorted(PaginateProduct(products));
        setProducts(products);
        setFeatuerd(feature);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = (e) => {
    const nam = e.target.name;
    const val = e.target.value;
    const typ = e.target.type;
    let filterValue;
    if (typ === "checkbox") {
      filterValue = e.target.checked;
    } else if (typ === "radio") {
      filterValue = val === "all" ? val : JSON.parse(val);
      console.log(filterValue);
    } else {
      filterValue = val;
    }
    setfilter({ ...filter, [nam]: filterValue });
  };

  const Pagination = (index) => {
    if (index > sorted.length - 1) {
      index = 0;
    } else if (index < 0) {
      index = sorted.length - 1;
    }
    console.log(sorted);
    setPaginate(index);
  };

  const filtered = React.useCallback(() => {
    let newProducts = [...products].sort((a, b) => {
      return a.price - b.price;
    });
    const { searchTerm, price, shipping, category } =
      filter;
    if (searchTerm !== "") {
      newProducts = newProducts.filter((item) => {
        const term = item.title.toLowerCase().trim();
        return term.includes(searchTerm) ? item : null;
      });
    }
    if (category !== "all") {
      newProducts = newProducts.filter((item) => {
        return item.category === category;
      });
    }
    if (shipping) {
      newProducts = newProducts.filter((item) => {
        return item.freeShipping === true;
      });
      console.log(products);
    }
      switch (price) {
        case 0:
          newProducts = newProducts.filter(
            (item) => item.price < 300
          );
          break;
        case 300:
          newProducts = newProducts.filter(
            (item) => item.price > 300 && item.price < 650
          );
          break;
        case 650:
          newProducts = newProducts.filter(
            (item) => item.price > 650
          );
          break;
        default:
          newProducts = [...products].sort((a, b) => {
            return a.price - b.price;
          });
      }

    setPaginate(0);
    setSorted(PaginateProduct(newProducts));
  }, [products, filter]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filtered();
  }, [filtered]);

  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        featured,
        sorted,
        filter,
        paginate,
        Pagination,
        filterProducts,
      }}>
      {children}
    </ProductContext.Provider>
  );
}

const useGlobalContext = () => {
  return useContext(ProductContext);
};

export { useGlobalContext, ProductContext };
