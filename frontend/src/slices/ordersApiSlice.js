import { apiSlice } from "./apiSlices";
import { ORDERS_URL } from "../constants";

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET", //by default is GET, we can omit this line for GET requests
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  ordersApiSlice;
