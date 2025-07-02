import React from 'react'
import { NavLink } from 'react-router-dom'

const ResponsiveNavBar = ({ isAuthenticated,username, logout}) => {
  return (
    <nav className="max-container padding-x py-6 max-md:block hidden dark:text-[#FFFFFF]">
    <ul className="flex items-center justify-center gap-6 text-[#3B3C4A] lg:flex-1 flex-col dark:text-[#FFFFFF]">

   
      {isAuthenticated ? 
        <>

        <li>
            <NavLink className={({isActive}) => isActive ? 'active' : ''} to={`/profile/${username}`}>
            Hi, {username}
            </NavLink>
        </li>

        <li onClick={logout} className='cursor-pointer'>Logout</li>
        

        </>
        :
        <>
        <li>
            <NavLink className={({isActive}) => isActive ? 'active' : ''} to = '/signin'>
            Login
            </NavLink>
        </li>

        <li>
            <NavLink className={({isActive}) => isActive ? 'active' : ''} to = '/signup'>
            Register
            </NavLink>
        </li>

        </>}
        

        <li>
        <NavLink className={({isActive}) => isActive ? 'active' : ''} to = '/create'>
            Create Post
            </NavLink></li>
            



        

     


    </ul>
  </nav>
  )
}

export default ResponsiveNavBar