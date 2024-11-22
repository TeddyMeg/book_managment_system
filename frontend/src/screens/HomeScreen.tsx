import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetBooksQuery, useGetRecommendationsQuery } from '../slices/booksApiSlice';
import BookCard from '../components/BookCard.tsx';
import SearchBar from '../components/SearchBar.tsx';
import Loader from '../components/Loader.tsx';
import Message from '../components/Message.tsx';

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: books, isLoading, error } = useGetBooksQuery({});
  const { data: recommendations } = useGetRecommendationsQuery({});
  const { userInfo } = useSelector((state: any) => state.auth);

  const filteredBooks = books?.filter((book: any) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loader />;
  if (error) return <Message variant="error">Failed to load books</Message>;

  return (
    <div className="space-y-8">
      <div className="max-w-xl mx-auto">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {recommendations && recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((book: any) => (
              <BookCard
                key={book._id}
                book={book}
                isAdmin={userInfo?.isAdmin}
                userId={userInfo?._id}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks?.map((book: any) => (
            <BookCard
              key={book._id}
              book={book}
              isAdmin={userInfo?.isAdmin}
              userId={userInfo?._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;