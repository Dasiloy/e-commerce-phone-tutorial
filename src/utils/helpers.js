// helper functions

import { array } from "yargs";

export const FlattenProducts = (data) => {
  const newData = data.map((item) => {
    const image = item.image[0].url;
    return { ...item, image };
  });
  return newData;
};

export const FeaturedProducts = (data) => {
  const newData = data.filter((item) => {
    return item.featured === true;
  });
  return newData;
};

export const PaginateProduct = (products) => {
  const itemsPerPage = 3;
  const itemsPage = Math.ceil(
    products.length / itemsPerPage
  );
  const newProducts = Array.from(
    { length: itemsPage },
    (_, index) => {
      const start = index * itemsPerPage;
      return products.slice(start, start + itemsPerPage);
    }
  );
  return newProducts;
};
