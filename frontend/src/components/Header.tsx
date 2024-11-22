import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../slices/authSlice"
import { clearCredentials } from '../slices/authSlice';
import { Book, User, Heart, LogOut, LogIn, UserPlus, Users } from 'lucide-react';

const Header = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const logoutHandler = async () => { 
    try { 
        dispatch(logout()); 
        dispatch(clearCredentials()); 
        navigate('/login'); 
    } catch (err) { 
        console.error(err); 
    } 
};

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <Book className="h-6 w-6" />
            <span>BookShelf</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/authors" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <Users className="h-5 w-5" />
              <span>Authors</span>
            </Link>

            {userInfo ? (
              <>
                <Link to="/favorites" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={logoutHandler}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;