import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <nav className="navigation">
                <Link to="/" className="logo-container">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    <Link className="nav-link" to="/sign-in">
                        Sign-in
                    </Link>
                </div>
            </nav>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
