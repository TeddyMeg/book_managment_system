import React from 'react';
import { useSelector } from 'react-redux';
import { useGetBooksQuery } from '../slices/booksApiSlice';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Heart } from 'lucide-react';

const FavoritesScreen = () => {
  const { data: books, isLoading, error } = useGetBooksQuery({});
  const { userInfo } = useSelector((state: any) => state.auth);

  const favoriteBooks = books?.filter((book: any) =>
    book.favorites.includes(userInfo._id)
  );

  if (isLoading) return <Loader />;
  if (error) return <Message variant="error">Failed to load favorite books</Message>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Heart className="h-6 w-6 text-red-500" fill="currentColor" />
        <h1 className="text-2xl font-bold text-gray-900">My Favorite Books</h1>
      </div>

      {favoriteBooks?.length === 0 ? (
        <Message variant="info">
          You haven't favorited any books yet. Browse our collection and mark some as favorites!
        </Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteBooks?.map((book: any) => (
            <BookCard
              key={book._id}
              book={book}
              isAdmin={userInfo?.isAdmin}
              userId={userInfo?._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesScreen;