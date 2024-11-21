import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Book', 'User', 'Author'],
  endpoints: (builder) => ({}),
});