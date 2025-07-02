import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const AppLayout = ({isAuthenticated, username, setUsername, setIsAuthenticated}) => {

  useEffect(function(){
    if(localStorage.getItem('dark') === null){
      localStorage.setItem('dark','false')
    }
  },[])

  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark')==='true')

  const handleDarkMode = () =>{ 
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('dark', newDarkMode? 'true': 'false')
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
    <main className="w-full bg-[#ffffff] dark:bg-[#181A2A]">
      <NavBar darkMode = {darkMode} 
      handleDarkMode = {handleDarkMode} 
      isAuthenticated = {isAuthenticated} 
      username = {username}
      setUsername = {setUsername}
      setIsAuthenticated = {setIsAuthenticated}/>
      <ToastContainer />
      <Outlet />
      <Footer />
    </main>
    </div>
  );
};

export default AppLayout;