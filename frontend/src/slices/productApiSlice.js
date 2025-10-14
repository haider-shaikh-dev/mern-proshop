import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageNumber = 1 }) => ({
        url: PRODUCT_URL,
        params: { pageNumber }
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
    uploadProductImage: builder.mutation({
      query: (formData) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: formData
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`, // e.g. /api/products/123
        method: 'DELETE',
      }),
    }),
    createProductReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Products'] //to clear cache  
    })
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateProductReviewMutation } = productsApiSlice;
