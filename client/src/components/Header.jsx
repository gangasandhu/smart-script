import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/SmartScript-logo.png";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { useUser } from '../context/UserContext';

const Header = ({ theme, changeMainTheme }) => {
    const { user, setUser } = useUser();
    return (
        <nav className={`navbar navbar-expand-lg bg-bgTertiary text-primary shadow-md py-3`} >
            <div className="container-fluid flex justify-between items-center px-4">
                {/* Logo Section */}
                <Link className="flex items-center space-x-2" to="/">
                    <img className="w-10 h-10 object-contain" src={logo} alt="SmartScript Logo" />
                    <span className="font-semibold text-2xl ">SmartScript</span>
                </Link>


                {/* Navbar Links */}
                <div className="hidden md:block md:flex md:items-center md:space-x-8" id="navbarColor02">
                    <ul className="navbar-nav flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                        <li className="nav-item">
                            <Link className="nav-link text-lg font-medium hover:text-green-600 transition-all duration-200" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-lg font-medium hover:text-green-600 transition-all duration-200" to="/chat">
                                Chat AI
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-lg font-medium hover:text-green-600 transition-all duration-200" to="/chat">
                                Code Editor
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Theme Toggle and Profile Section */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <label className={`text-lg font-medium}`} htmlFor="theme-toggle">
                        {theme === 'light' ? 'Light' : 'Dark'}
                    </label>
                    <Toggle
                        id="theme-toggle"
                        checked={theme === 'light'}
                        onChange={({ target }) => changeMainTheme(target)}
                        icons={{ checked: '', unchecked: '' }}
                        aria-label="Light mode toggle"
                    />

                </div>
                {user &&
                    <div className='bg-neutral-700 w-[40px] h-[40px] rounded-full flex items-center justify-center text-white'>
                            {user.username[0].toUpperCase()}
                    </div>
                }
            </div>
        </nav>

    )
};

export default Header;
