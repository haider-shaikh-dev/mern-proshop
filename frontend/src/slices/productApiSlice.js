import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5, // 5 seconds cache
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`, // e.g. /api/products/123
      }),
      keepUnusedDataFor: 5, // 5 seconds cache
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Products'] //to clear cache
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Products'] //to clear cache
    }),

  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation } = productsApiSlice;
