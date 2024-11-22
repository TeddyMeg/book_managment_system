import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetBookByIdQuery, useToggleFavoriteMutation } from '../slices/booksApiSlice';
import { Heart, ArrowLeft } from 'lucide-react';
import Loader from '../components/Loader';
import Message from '../components/Message';

const BookDetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookByIdQuery(id);
  const [toggleFavorite] = useToggleFavoriteMutation();
  const { userInfo } = useSelector((state: any) => state.auth);

  const isFavorited = book?.favorites.includes(userInfo?._id);

  const handleFavoriteClick = async () => {
    if (!userInfo) return;
    try {
      await toggleFavorite(id).unwrap();
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="error">Failed to load book details</Message>;
  if (!book) return <Message variant="error">Book not found</Message>;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="h-5 w-5 mr-1" />
        Back to Books
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="h-64 w-full object-cover md:w-96"
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
              {userInfo && (
                <button
                  onClick={handleFavoriteClick}
                  className={`p-2 rounded-full hover:bg-gray-100 ${
                    isFavorited ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <Heart className="h-6 w-6" fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-lg text-gray-600">By {book.author.name}</p>
              <p className="text-gray-500">Published in {book.publishedYear}</p>
              <p className="text-gray-500">ISBN: {book.isbn}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsScreen;