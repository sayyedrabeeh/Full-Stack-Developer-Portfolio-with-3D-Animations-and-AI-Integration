import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/HeroProject";
import Journey from './components/Journey';
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
import ReactProjects from "./components/projects/React";
import Opencv from "./components/projects/opencv";
import AI from "./components/projects/AI";
import Learning from "./components/projects/Learning";
import Miniprojects from "./components/projects/MiniProjects";
import Add_Project from "./components/projects/Add_projects";
import Saved from "./components/projects/Saved";
import UsersPage from "./components/users";

function App() {
  const dragAreaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1000);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <div className="text-center text-white max-w-md">
          <h1 className="text-3xl font-bold mb-4">Desktop Only</h1>
          <p className="text-lg text-gray-300 mb-2">
            This portfolio is best experienced on a desktop or laptop.
          </p>
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

      <Routes>
       
        <Route
          path="/"
          element={
            <div ref={dragAreaRef} className="min-h-screen text-white animate-gradient overflow-hidden">
              <Navbar />
              <HeroSection dragAreaRef={dragAreaRef} />
              <About />
              <Skills />
              <Projects />
              <Journey />
              <ExternalLinks />
              <ContactSection />
              <ChatBot />
            </div>
          }
        />

    
        <Route path="/login" element={<Login3D />} />

       
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />

    
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomeProjects />} />
          <Route path="fullstack" element={<Fullstack />} />
          <Route path="django" element={<Django />} />
          <Route path="react" element={<ReactProjects />} />
          <Route path="opencv" element={<Opencv />} />
          <Route path="ai" element={<AI />} />
          <Route path="learnings" element={<Learning />} />
          <Route path="miniprojects" element={<Miniprojects />} />
          <Route path="add_project" element={<Add_Project />} />
          <Route path="saved_projects" element={<Saved />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
