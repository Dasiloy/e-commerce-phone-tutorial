import React from "react";
import Loading from "../components/Loading";
import { PaginateProducts } from "../components/Products/PaginateProducts";
import { Filters } from "../components/Products/Filters";
import { useGlobalContext } from "../context/products";
import { PaginateProduct } from "../utils/helpers";

export default function Products() {
  const { loading} = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Filters />
      <PaginateProducts />
    </>
  );
}
