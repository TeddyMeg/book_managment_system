import { apiSlice } from './apiSlice.ts';

export const authorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthors: builder.query({
      query: () => '/authors',
      providesTags: ['Author'],
    }),
    getAuthorById: builder.query({
      query: (id) => `/authors/${id}`,
      providesTags: ['Author'],
    }),
    createAuthor: builder.mutation({
      query: (data) => ({
        url: '/authors',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Author'],
    }),
    updateAuthor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/authors/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Author'],
    }),
    deleteAuthor: builder.mutation({
      query: (id) => ({
        url: `/authors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Author'],
    }),
  }),
});

export const {
  useGetAuthorsQuery,
  useGetAuthorByIdQuery,
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
} = authorsApiSlice;