import React, { useState,useRef } from "react";
import { motion } from "framer-motion";


function HeroSection() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const constraintsRef = useRef(null);

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

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section   className="min-h-screen    flex flex-col-reverse md:flex-row items-center justify-center text-center md:text-left px-8 md:px-20 relative z-10 overflow-hidden">
      <div className="md:w-1/2 text-white space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Hey, I'm <span className="text-blue-400">Sayyed Rabeeh</span>
        </h1>
        <div ref={constraintsRef} className="absolute inset-[60px]" />


        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          A <span className="text-blue-300 font-medium">Full Stack Developer</span> passionate
          about building  interactive, and meaningful websites
          using <span className="text-blue-300 font-medium">React</span> & 
          <span className="text-blue-300 font-medium"> Django</span>.
        </p>

        <div className="flex gap-4 justify-center md:justify-start pt-4">
          <a
            href=""
            className="px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-xl
                       hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300 text-2xl"
          >
            Resume
          </a>
          <a
            href=""
            className="px-6 py-3 bg-transparent border border-blue-400/30 rounded-xl
                       hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 text-2xl"
          >
            Github
          </a>
        </div>
      </div>

      <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
        <motion.div 
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.5}
    
          className="relative perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-72 h-72 md:w-96 md:h-96 transition-transform duration-200 ease-out preserve-3d"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
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
              style={{
                transform: 'translateZ(2px)'
              }}
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .translate-z-[-50px] {
          transform: translateZ(-50px);
        }
      `}</style>
    </section>
  );
}

export default HeroSection;