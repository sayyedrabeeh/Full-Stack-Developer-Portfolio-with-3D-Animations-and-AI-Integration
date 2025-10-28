import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/HeroProject";
import Login3D from "./pages/login";
import AppLayout from "./components/projects/Applayout";
import PrivateRoute from "./api/PrivateRoute";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isProjectsPage = location.pathname.startsWith("/projects");

  return (
    <>
       
      {!isLoginPage && !isProjectsPage && (
        <div className="min-h-screen text-white animate-gradient overflow-hidden">
          <Navbar />
          <HeroSection />
          <About />
          <Skills />
          <Projects />

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
 
      {isProjectsPage && (
        <div className="w-full min-h-screen">
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        </div>
      )}
    </>
  );
}

export default App;
