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
import HTML1 from "./components/projects/htlm.jsx";

import { useContext } from "react";
import { BackendContext } from "./api/BackendContext.jsx";


function App() {
  const dragAreaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  
 const { backendLoading } = useContext(BackendContext);

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
       {backendLoading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/98 backdrop-blur-sm">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Starting Backend Server</h3>
            <p className="text-slate-400 text-sm mb-8">Please wait while we initialize your environment</p>
            <div className="w-96 max-w-md">
              <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="progress-bar h-full bg-indigo-600 rounded-full"></div>
              </div>
              <div className="text-center mt-3">
                <span className="progress-percentage text-indigo-400 font-medium text-base"></span>
              </div>
            </div>

            <style >{`
              @keyframes fillProgress {
                0% { width: 0%; }
                100% { width: 100%; }
              }

              .progress-bar {
                animation: fillProgress 3s ease-in-out forwards;
              }

              .progress-percentage::after {
                content: "0%";
                animation: updatePercentage 3s ease-in-out forwards;
              }

              @keyframes updatePercentage {
                0% { content: "0%"; }
                10% { content: "12%"; }
                20% { content: "28%"; }
                30% { content: "41%"; }
                40% { content: "55%"; }
                50% { content: "64%"; }
                60% { content: "73%"; }
                70% { content: "82%"; }
                80% { content: "91%"; }
                90% { content: "97%"; }
                100% { content: "100%"; }
              }
            `}</style>
          </div>
)}


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
          <Route path="html" element={<HTML1 />} />
          <Route path="learnings" element={<Learning />} />
          <Route path="miniprojects" element={<Miniprojects />} />
          <Route path="add_project" element={<Add_Project />} />
          <Route path="saved_projects" element={<Saved />} />
        </Route>
      </Routes>
      

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
                          
                .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #6366f1;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }



                .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #6366f1;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }

            `}
          </style>
    </>
  );
}

export default App;