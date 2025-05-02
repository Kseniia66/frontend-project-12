import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Signup from './pages/Signup.jsx';
import routes from './utils/routes.js';
import MainNavbar from './components/Navbar.jsx';
import AuthProvider, { PrivateRoute } from './contexts/AuthProvider.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="d-flex flex-column vh-100">
          <MainNavbar />
          <Routes>
            <Route path={routes.chatPage()} element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            } />
            <Route path={routes.loginPage()} element={<Login />} />
            <Route path={routes.signUpPage()} element={<Signup />} />
            <Route path={routes.notFoundPage()} element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
