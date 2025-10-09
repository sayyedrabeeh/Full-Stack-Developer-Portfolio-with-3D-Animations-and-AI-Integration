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
            <div className="max-w-6xl  mx-auto flex flex-col md: flex-row items-center gap-12" >
                <motion.div className="flex-1 text-lg  md:text-xl leading-relaxed text-gray-300 space-y-6"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    >
                    <p>I'm <span className="text-blue-400 font-semibold">sayyed rabeeh </span>
                        a <span className="text-purple-400 font-semibold">Full Stack Developer</span>
                       passionate about merging design, logic, and creativity into meaningful software.
                    </p>

                    <p>
                        Coming from a <span className="text-blue-400">Humanities</span> background, 
                        I bring perspective, empathy, and narrative thinking into my code — creating 
                        applications that feel as intuitive as they are functional.
                    </p>

                    <p>
                        I build with <span className="text-blue-400">Python (Django)</span> and 
                        <span className="text-purple-400"> React.js</span>, focusing on  architectures, 
                        responsive UI, and seamless user experience.
                    </p>

                    <p>
                        Over the years, I have worked with a wide range of technologies to create  scalable, maintainable, and efficient solutions. 

                    </p>

                    <p>
                        I love exploring new ideas — from 
                        <span className="text-pink-400 font-semibold"> AI-driven tools</span> to 
                        <span className="text-purple-400 font-semibold"> gesture-controlled systems</span> — 
                        always striving for code that’s elegant, scalable, and impactful.
                    </p>

                </motion.div>
                  
 
                <motion.div className="flex-1 flex justify-center relative"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    >

                    
                    
              </motion.div>
                
                          
                     
        
        </div>
        </section>
    )
}


export default About