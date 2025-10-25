import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";
import About from "./components/About";
import Skilss from "./components/Skills";
import Projects from "./components/HeroProject";
import Login3D from "./pages/login";

function App() {
 
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div
      className={`min-h-screen ${
        !isLoginPage
          ? "flex items-center justify-center text-white text-4xl font-bold animate-gradient overflow-hidden"
          : ""
      }`}
    >
      <div className={!isLoginPage ? "min-h-screen text-white animate-gradient" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HeroSection />
                <About />
                <Skilss />
                <Projects   />
              </>
            }
          />
          <Route path="/login" element={<Login3D />} />
        </Routes>

        {!isLoginPage && (
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
        )}
      </div>
    </div>
  );
}

export default App;
