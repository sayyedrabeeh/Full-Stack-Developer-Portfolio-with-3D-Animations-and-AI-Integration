import React from "react";
import { NavLink } from "react-router-dom";


function Navbar() {
    
    return (
        <nav className="fixed top-0 left-0  w-full flex justify-between items-center p-6
         bg-blue-100/20 backdrop-blur-lg text-white shadow-lg shadow-black/30 z-50">

            <div className="text-xl font-bold font-heading">
                    Sayyed Rabeeh  
            </div>

            <ul className="hidden md:flex gap-8 font-heading  text-lg">
                <li>
            <NavLink
                    to=""
                    className={({ isActive }) =>
                    isActive ? "text-blue-300 font-semibold" : "hover:text-blue-300 transition"
            }>
            About            
             </NavLink>
                </li>
                <li>
            <NavLink
                    to=""
                    className={({ isActive }) =>
                    isActive ? "text-blue-300 font-semibold" : "hover:text-blue-300 transition"
            }>
            Projects            
             </NavLink>
                </li>
                <li>
            <NavLink
                    to=""
                    className={({ isActive }) =>
                    isActive ? "text-blue-300 font-semibold" : "hover:text-blue-300 transition"
            }>
            Journey            
             </NavLink>
                </li>
            <li>
              <NavLink
                    to="/l"
                    className={({ isActive }) =>
                    isActive ? "text-blue-300 font-semibold" : "hover:text-blue-300 transition"
               }>
               Skills
               </NavLink>
            </li>
            <li>
              <NavLink
                    to="/hi"
                    className={({ isActive }) =>
                    isActive ? "text-blue-300 font-semibold" : "hover:text-blue-300 transition"
               }>
               Contacts
               </NavLink>
            </li>

            </ul>

        </nav>
    )



}
export default Navbar