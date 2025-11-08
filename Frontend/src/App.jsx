import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/HeroProject";
import Journey from './components/Journey'
import ContactSection from "./components/Contact";
import Login3D from "./pages/login";
import AppLayout from "./components/projects/Applayout";
import ExternalLinks from "./components/ExternalLinks";
import ChatBot from "./components/Bot";
import PrivateRoute from "./api/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeProjects from "./components/projects/HomeProjects";
import Fullstack from "./components/projects/Fullstack";
import Django from "./components/projects/Django";
import React from "./components/projects/React";
import Opencv from "./components/projects/opencv";
import AI from "./components/projects/AI";
import Learning from "./components/projects/Learning";
import Miniprojects from "./components/projects/MiniProjects";
import Add_Project from "./components/projects/Add_projects";
import Saved from "./components/projects/Saved";
import UsersPage from "./components/users";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isProjectsPage = location.pathname.startsWith("/projects");
   const isUsersPage = location.pathname === "/users";
  const dragAreaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <div className="text-center text-white max-w-md">
          <svg 
            className="w-24 h-24 mx-auto mb-6 text-purple-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Desktop Only</h1>
          <p className="text-lg text-gray-300 mb-2">
            This portfolio is best experienced on a desktop or laptop.
          </p>
          <p className="text-sm text-gray-400">
            Please visit this website on a larger screen for the full experience.
          </p>
          <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-xs text-gray-300">
              Screen width detected: {window.innerWidth}px
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{ background: "#1e293b", color: "#fff" }}
      />
      {!isLoginPage && !isProjectsPage && (
        <div ref={dragAreaRef} className="min-h-screen text-white animate-gradient overflow-hidden">
          <Navbar />
          <HeroSection dragAreaRef={dragAreaRef} />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <ExternalLinks/>
          <ContactSection />
          <ChatBot/>
           

          <style>
            {`
              @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .animate-gradient {
                background: linear-gradient(270deg, #000000, #0a0a0a, #1b0f3b, #12001f);
                background-size: 600% 600%;
                animation: gradient 20s ease infinite;
              }
            `}
          </style>
        </div>
      )}

      {isLoginPage && <Login3D />}

      {isUsersPage && (
        <Routes>
          <Route path="/users" element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          } />
        </Routes>
      )}

 
      {isProjectsPage && (
        <div className="w-full min-h-screen">
          <PrivateRoute>
            <Routes>
              <Route path="/projects" element={<AppLayout />}>
                <Route index element={<HomeProjects />} />
                <Route path="fullstack" element={<Fullstack />} />
                <Route path="django" element={<Django />} />
                <Route path="react" element={<React />} />
                <Route path="opencv" element={<Opencv />} />
                <Route path="ai" element={<AI />} />
                <Route path="learnings" element={<Learning />} />
                <Route path="miniprojects" element={<Miniprojects/>}/>
                <Route path="add_project" element={<Add_Project/>}/>
                <Route path="saved_projects" element={<Saved/>}/>
              </Route>
            </Routes>
          </PrivateRoute>
        </div>
      )}
    </>
  );
}

export default App;