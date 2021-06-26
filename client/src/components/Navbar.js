import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';

export const Navbar = () => {
    const history = useHistory();
    const auth = useAuth(AuthContext);

    const handleLogout = e => {
        e.preventDefault();
        auth.logout();
        history.go('/');
    };

    return(
        <nav>
            <div className="nav-wrapper blue darken-1" style={{paddingLeft: '20px'}}>
            <span className="brand-logo">Сокращение ссылок</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Создать</NavLink></li>
                <li><NavLink to="/links">Ссылки</NavLink></li>
                <li><a href="/" onClick={handleLogout}>Выйти</a></li>
            </ul>
            </div>
        </nav>
    );
};