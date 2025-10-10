
import React from "react";
import { FaPython,FaReact,FaHtml5,FaCss3Alt,FaBootstrap,FaGitAlt,FaFigma } from "react-icons/fa";
import { SiDjango,SiTailwindcss,SiPostgresql,SiOpencv,SiFramer } from "react-icons/si";
import { useRef,useState,useEffect } from "react";

const skillsIcons = [
  { icon: FaPython, name: "Python", color: "#3776AB" },
  { icon: SiDjango, name: "Django", color: "#0C4B33" },
  { icon: FaReact, name: "React", color: "#61DBFB" },
  { icon: SiTailwindcss, name: "TailwindCSS", color: "#38BDF8" },
  { icon: FaHtml5, name: "HTML5", color: "#E34F26" },
  { icon: FaCss3Alt, name: "CSS3", color: "#1572B6" },
  { icon: FaBootstrap, name: "Bootstrap", color: "#7952B3" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
  { icon: SiOpencv, name: "OpenCV", color: "#5C3EE8" },
  { icon: FaGitAlt, name: "Git", color: "#F05032" },
  { icon: FaFigma, name: "Figma", color: "#F24E1E" },
  { icon: SiFramer, name: "Framer Motion", color: "#E91E63" },
];


function Skilss() {

    const containerRef = useRef(null)

    
    return (
        <section className="w-full text-white py-24">
            <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row  items-start justify-between gap-12 ">

                <div className="flex-1 space-y-8 text-left">
                    <h1 className=" text-5xl md:text-6xl font-extrabold leading-tight ">
                        <span className=" bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Technical Skills
                        </span>

                    </h1>
                    <p className="tet-gray-300 text-base md:text-lg max-w-lg leading-relaxed ">
                        I specialize in building responsive, modern, and scalable applications.
                        Here’s the stack I use every day — from front-end magic to back-end logic
                    </p>

                    <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative" >
                            <div ref={containerRef} className="relative w-[400px] h-[400px] rounded-3xl overflow-hidden  shadow-2xl"
                                style={{
                                  background:  "linear-gradient(145deg, #0D1117 0%, #1B2430 50%, #222B45 100%)"
                            }}>


                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {skillsIcons.map((skill, index ) => (
                        <div className="flex flex-col  items-center justify-center  p-5 rounded-2xl  bg-white/5 backdrop-blur-md
                        border border-white/10 hover:scale-105 hover:shadow-purple-400/20  transition-all duration-300 " key={index}>
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                                style={{
                                    background: `${skill.color}20`,
                                    border : `1px solid ${skill.color}40`
                             }}
                            >
                                <skill.icon size={26} style={{color:skill.color}}/>
                            </div>
                            <span className="text-gray-200 text-sm font-medium">
                                { skill.name }
                            </span>
                         </div>
                     ))   }
                </div>

                
             </div>
        </section>
    )

}

export default Skilss