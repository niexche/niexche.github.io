import React, { useEffect, useState } from "react";
import { BsFillMoonFill  } from "react-icons/bs";


const Themetoggle = () => {
  const [theme, settheme] = useState(localStorage.getItem("theme"));
  const themetoggle = () => {
    settheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme ); 
  }, [theme]);
  return (
    <div className="nav_ac" onClick={themetoggle} style={{scale: '2', fontSize:20}}>
      <BsFillMoonFill  />
    </div>
  );
};

export default Themetoggle;
