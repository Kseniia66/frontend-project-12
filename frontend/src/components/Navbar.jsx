import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../store/useAuth.jsx';
import router from '../utils/routes.js';

const MainNavbar = () => {
  const { t } = useTranslation();
    const { loggedIn, logOut } = useAuth();
    return(
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <a className="navbar-brand" href="/">{t('navBar.title')}</a>
          {loggedIn && (
            <Link
                onClick={logOut}
                to={router.loginPage()}
                type="button"
                className="btn btn-primary">
                    {t('navBar.button')}
            </Link>
          )}
        </Container>
    </Navbar>
    )
}

export default MainNavbar;
