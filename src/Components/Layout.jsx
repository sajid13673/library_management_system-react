import React from 'react';
import Navbar from './Navbar';
import { useTheme } from '../Context/ThemeContext';

const Layout = ({ children }) => {
    const { darkMode, setDarkMode } = useTheme();

    return (
        <>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main>{children}</main>
        </>
    );
};

export default Layout;
