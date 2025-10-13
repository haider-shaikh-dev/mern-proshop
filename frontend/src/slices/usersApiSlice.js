import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        // body: data,
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      })
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `${USERS_URL}/${userData.userId}`,
        method: 'PUT',
        body: userData
      }),
      invalidatesTags: ['Users']
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useGetUserByIdQuery, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice;
