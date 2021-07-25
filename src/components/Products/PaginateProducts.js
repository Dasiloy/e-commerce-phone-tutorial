import React from "react";
import { useGlobalContext } from "../../context/products";
import ProductList from "./ProductList";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

export const PaginateProducts = () => {
  const { sorted, paginate, Pagination } =
    useGlobalContext();

  if (sorted[paginate]) {
    return (
      <>
        <ProductList title='' products={sorted[paginate]} />
        {sorted.length > 1 && (
          <article className='pagination-buttons'>
            <button
              type='button'
              className='prev-page-btn'
              onClick={() => Pagination(paginate - 1)}>
              <FaAngleDoubleLeft />
            </button>
            {sorted.map((_, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  onClick={() => Pagination(index)}
                  className={`page-btn ${
                    paginate === index
                      ? "page-btn-current"
                      : ""
                  }`}>
                  {index + 1}
                </button>
              );
            })}
            <button
              type='button'
              className='prev-page-btn'
              onClick={() => Pagination(paginate + 1)}>
              <FaAngleDoubleRight />
            </button>
          </article>
        )}
      </>
    );
  } else {
    return (
      <h3 className='search-errors'>
        {" "}
        unfortunately, your search does not matcha any query
      </h3>
    );
  }
};
