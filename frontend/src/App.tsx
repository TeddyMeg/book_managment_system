import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import BookDetailsScreen from './screens/BookDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AuthorsScreen from './screens/AuthorsScreen';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/book/:id" element={<BookDetailsScreen />} />
              <Route path="/authors" element={<AuthorsScreen />} />
              <Route path="" element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/favorites" element={<FavoritesScreen />} />
              </Route>
      
          </Routes>
        </main>
      </div>
    </Router>
  </Provider>
  )
}

export default App