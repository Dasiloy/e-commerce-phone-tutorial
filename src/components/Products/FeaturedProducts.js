import React from "react";
import Loading from '../Loading'
import { useGlobalContext } from "../../context/products";
 import ProductList from './ProductList'

export default function FeaturedProducts() {
  const { loading, featured } = useGlobalContext()

  if (loading) {
    return <Loading/>
  }
  return (
    <ProductList title='Featured Products' products={featured}/>
  )
}
