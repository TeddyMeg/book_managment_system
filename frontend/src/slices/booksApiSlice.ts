import { apiSlice } from './apiSlice.ts';

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['Book'],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: '/books',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
    toggleFavorite: builder.mutation({
      query: (id) => ({
        url: `/books/${id}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Book'],
    }),
    getRecommendations: builder.query({
      query: () => '/books/recommendations',
      providesTags: ['Book'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useToggleFavoriteMutation,
  useGetRecommendationsQuery,
} = booksApiSlice;