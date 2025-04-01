import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './App.css';
import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import routes from './pages/routes.js';
import AuthContext from './contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const logIn = (token) => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
  };
  
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();

  return loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
};

const AuthButton = () => {
  const { loggedIn, logOut } = useContext(AuthContext);
  const location = useLocation();

  return loggedIn ? (
    <Button onClick={logOut}>Log out</Button>
  ) : (
    <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.chatPage()} element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } />
          <Route path={routes.loginPage()} element={<Login />} />
          <Route path={routes.notFoundPage()} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;