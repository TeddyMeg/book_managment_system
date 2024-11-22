import { useState } from 'react';
import { useGetAuthorsQuery } from '../slices/authorsApiSlice';
import { Users} from 'lucide-react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';

const AuthorsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: authors, isLoading, error } = useGetAuthorsQuery({});

  const filteredAuthors = authors?.filter((author: any) =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loader />;
  if (error) return <Message variant="error">Failed to load authors</Message>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Authors</h1>
        </div>
        <div className="w-64">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuthors?.map((author: any) => (
          <div key={author._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={author.imageUrl}
              alt={author.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{author.name}</h2>
              <p className="text-gray-600 line-clamp-3">{author.biography}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsScreen;