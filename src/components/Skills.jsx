import React from "react";
import { FaPython,FaReact,FaHtml5,FaCss3Alt,FaBootstrap,FaGitAlt,FaFigma } from "react-icons/fa";
import { SiDjango,SiTailwindcss,SiPostgresql,SiOpencv,SiFramer } from "react-icons/si";


function Skilss() {
    
    return (
        <section className="w-full text-white py-6">
            <div className="max-w-6xl mx-auto py-6 flex-col lg:flex-row  items-center justify-between gap-12 ">

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
                </div>
                
             </div>
        </section>
    )

}

export default Skilss