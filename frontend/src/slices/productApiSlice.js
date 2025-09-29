import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5, // 5 seconds cache
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`, // e.g. /api/products/123
      }),
      keepUnusedDataFor: 5, // 5 seconds cache
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
