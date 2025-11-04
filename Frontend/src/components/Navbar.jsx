
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.getElementById(item.id));
      let currentSectionId = "";
       sections.forEach(section => {
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSectionId = section.id;
        }
      }
    });

    setActiveSection(currentSectionId);
  
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
  
    { id: "Home", label: "Home" },
    { id: "About", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "journey", label: "Journey" },
    { id: "contact", label: "Contact" }
  ];

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    window.location.href = "/";
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/40 backdrop-blur-xl shadow-2xl shadow-purple-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
        
          <div className="relative group">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer transition-all duration-300 hover:scale-105">
              Sayyed Rabeeh
            </h1>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
          </div>

          
          <ul className="hidden md:flex gap-1 items-center bg-white/5 backdrop-blur-sm rounded-full px-2 py-2 border border-white/10">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                        onClick={() => {
                        setActiveSection(item.id)
                        const section = document.getElementById(item.id);
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                  }
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/50"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 rounded-full text-sm font-medium bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 border border-red-500/30 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-6 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/50 to-blue-600/50 text-white   transition-all duration-300"
                >
                  Login
                </button>
              )}
            </li>
          </ul>

 
          <button
                      onClick={() => {
                          setIsMobileMenuOpen(!isMobileMenuOpen)
                          
                      }}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-2 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                     const section = document.getElementById(item.id);
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`w-full text-left px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              </li>
              
            ))}
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-6 py-3 rounded-xl text-base font-medium bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 border border-red-500/30 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full text-left px-6 py-3 rounded-xl text-base font-medium bg-cyan-500/20 to-blue-600/60 text-white shadow-lg shadow-cyan-500/40 transition-all duration-300"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar