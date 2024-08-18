import { BOOKS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const bookSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: BOOKS_URL,
      }),
      providesTags: ['Book'],
      keepUnusedDataFor: 5,
    }),
    getBookDetails: builder.query({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    addBook: builder.mutation({
      query: () => ({
        url: `${BOOKS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Book'],
    }),

    updateBook: builder.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/${data.bookId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),

    uploadBookImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),

    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
        method: 'DELETE',
      }),
      providesTags: ['Book'],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/${data.bookId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),
    
  }),
});

export const { useGetBooksQuery, useGetBookDetailsQuery,useAddBookMutation,
  useUpdateBookMutation,useUploadBookImageMutation,
  useDeleteBookMutation, useCreateReviewMutation } = bookSlice;