import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Signup from './pages/Signup.jsx';
import routes from './utils/routes.js';
import MainNavbar from './components/Navbar.jsx';
import AuthProvider, { PrivateRoute } from './contexts/AuthProvider.jsx';

import './i18n';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
