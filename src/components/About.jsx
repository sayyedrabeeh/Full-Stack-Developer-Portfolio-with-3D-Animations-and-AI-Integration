import React,{ useState } from "react"
import { motion } from "framer-motion"


function About() {
    return (
        <section id="About" className="relative w-full py-32 px-6 md:px-24 text-white overflow-hidden ">
            <div className="absolute top-40 left-10 w-96 bg-blue-500/20 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none"></div>
            <motion.h2 className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text tracking-wide "
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{duration:0.8}}
            >
                About Me
            </motion.h2>
            <p>
                 I'm a  Full Stack Developer with a unique foundation in Humanities. 
                My background has sharpened my critical thinking, communication, and problem-solving skills, which I now apply to building software.
                       Over the years, I have worked with a wide range of technologies to create  scalable, maintainable, and efficient solutions. 
                I focus on writing clean code while leveraging frameworks and tools that maximize productivity and performance.
                
                          My core technologies include:  python, Django, React.js, PostgreSQL, and Bootstrap. 
                I enjoy tackling real-world problems through code — from AI-driven apps and gesture-controlled games to dynamic full-stack platforms.
                   I value  clean architecture, scalable solutions, and continuous learning. 
          I'm a collaborative team player but also confident working independently. Let’s connect to build innovative and meaningful software together!
       
        </p>
        </section>
    )
}


export default About