import React from 'react';
import Select from "react-select";
import "../Styles/Navbar.css";

const Navbar = ({defaultLanguage, setDefaultLanguage, defaultTheme, setDefaultTheme, defaultFontSize, setDefaultFontSize}) => {
    const Languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]
  return (
    <div className="navbar">
            <h1 className='mainhead'>Compiler</h1>
            <Select options={Languages} value={defaultLanguage}
                    onChange={(e) => setDefaultLanguage(e.value)}
                    placeholder={defaultLanguage} />
            <Select options={themes} value={defaultTheme}
                    onChange={(e) => setDefaultTheme(e.value)}
                    placeholder={defaultTheme} />
        </div>
  )
}

export default Navbar;