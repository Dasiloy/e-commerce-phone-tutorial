import React from "react";
import { useGlobalContext } from "../../context/products";

export const Filters = () => {
  const {
    filter: { shipping, searchTerm, price, category },
    filterProducts,
    sorted,
  } = useGlobalContext();
  return (
    <section className='filters-section'>
      <h2 className='section-title'> search products</h2>
      <form className='filters-form'>
        <div>
          <div className='form-group'>
            <label htmlFor='search'>search term</label>
            <input
              className='form-control'
              type='text'
              id='search'
              name='searchTerm'
              value={searchTerm}
              onChange={filterProducts}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='category'>category</label>
            <select
              name='category'
              id='category'
              className='form-control'
              value={category}
              onChange={filterProducts}>
              <option value='all'>all</option>
              <option value='phone'>phone</option>
              <option value='food'>food</option>
              <option value='snacks'>snacks</option>
            </select>
          </div>
          <div className='form-group'>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              checked={shipping}
              onChange={filterProducts}
            />
            <label htmlFor='shipping'>shipping</label>
          </div>
        </div>
        <div className='price-group'>
          <p>price</p>
          <label>
            <input
              type='radio'
              name='price'
              value='all'
              checked={price === "all"}
              onChange={filterProducts}
            />{" "}
            all
          </label>
          <label>
            <input
              type='radio'
              name='price'
              value='0'
              checked={price === 0}
              onChange={filterProducts}
            />{" "}
            $0 - $300
          </label>
          <label>
            <input
              type='radio'
              name='price'
              value='300'
              checked={price === 300}
              onChange={filterProducts}
            />{" "}
            $300 - $650
          </label>
          <label>
            <input
              type='radio'
              name='price'
              value='650'
              checked={price === 650}
              onChange={filterProducts}
            />{" "}
            0ver $650
          </label>
        </div>
      </form>
      <h6>total products: {sorted.flat(1).length}</h6>
      <hr />
    </section>
  );
};
