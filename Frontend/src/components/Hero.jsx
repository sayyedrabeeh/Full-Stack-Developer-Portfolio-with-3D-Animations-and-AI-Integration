import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function HeroSection({ dragAreaRef }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const constraintsRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    constraintsRef.current = document.body;
  }, []);

 
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

 
  const handleResumeClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  return (
    <section
      id="Home"
      className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center 
                 text-center md:text-left px-8 md:px-20 relative z-10"
    >
     
      <div className="md:w-1/2 text-white space-y-6 relative">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Hey, I'm <span className="text-blue-400">Sayyed Rabeeh</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          A <span className="text-blue-300 font-medium">Full Stack Developer</span> passionate
          about building interactive and meaningful websites using{" "}
          <span className="text-blue-300 font-medium">React</span> &{" "}
          <span className="text-blue-300 font-medium">Django</span>.
        </motion.p>
 
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="flex gap-4 justify-center md:justify-start pt-4 relative"
        >
        
          <button
            type="button"
            onClick={handleResumeClick}
            className="px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-xl
                       hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300 text-2xl"
          >
            Resume
          </button>
 <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute -top-24 left-1/2 -translate-x-1/2
                        bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-purple-600/20
                        border border-blue-400/30 backdrop-blur-xl
                        rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)]
                        px-7 py-4 flex items-center gap-4
                        text-white"
            >
              
              <div className="flex items-center justify-center w-10 h-10 
                              bg-blue-500/25 rounded-full border border-blue-400/30
                              shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="rgb(147,197,253)"
                  className="w-6 h-6 animate-spin-slow"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6 1.5A9 9 0 1112 3v0a9 9 0 019 9z"
                  />
                </svg>
              </div>

              
              <div className="flex flex-col">
                <p className="font-semibold text-lg tracking-wide text-blue-100">
                  Resume Under Preparation
                </p>
                <p className="text-gray-300 text-sm font-light">
                  An updated professional version will be available soon. 🚀
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
       
          <a
            href="https://github.com/sayyedrabeeh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent border border-blue-400/30 rounded-xl
                       hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 text-2xl"
          >
            Github
          </a>

    
       

        </motion.div>
      </div>

    
      <div className="md:w-1/2 flex flex-col items-center mb-10 md:mb-0">
        <motion.div
          drag
          dragConstraints={dragAreaRef}
          dragElastic={0.5}
          className="relative perspective-1000 z-50"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-72 h-72 md:w-96 md:h-96 transition-transform duration-200 ease-out preserve-3d"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
          >
            <div className="absolute inset-0 bg-blue-500/30 rounded-3xl blur-3xl translate-z-[-50px]" />

            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-blue-400/20 shadow-2xl shadow-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
              <img
                src="/images/a.jpg"
                alt="Sayyed Rabeeh"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div
              className="absolute inset-0 rounded-3xl border-2 border-blue-400/0 hover:border-blue-400/50 transition-all duration-500"
              style={{ transform: "translateZ(2px)" }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="mt-4 text-gray-400 text-sm font-medium select-none"
        >
          Drag the image anywhere 😎 NB: everything has a limit.
        </motion.p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

 
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .translate-z-[-50px] {
          transform: translateZ(-50px);
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
