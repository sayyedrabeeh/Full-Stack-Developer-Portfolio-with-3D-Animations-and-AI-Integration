import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiGlobe, FiCode, FiCopy, FiRss } from 'react-icons/fi'
import { SiLeetcode } from "react-icons/si";
import { toast } from "react-toastify";

export default function ExternalLinks() {
    const links = [
        {
            name: 'Github',
            url: 'https://github.com/sayyedrabeeh',
            icon: <FiGithub className="w-5 h-5" />,
            color: 'hover:text-gray-400'
        },
        {
            name: 'Linkedin',
            url: 'https://www.linkedin.com/in/sayyed-rabeeh/',
            icon: <FiLinkedin className="w-5 h-5" />,
            color: 'hover:text-blue-400'
        },
        {
            name: 'Twitter',
            url: 'https://x.com/Sayyed_Rabi',
            icon: <FiTwitter className="w-5 h-5" />,
            color: 'hover:text-sky-400'
        },

    ]

    const copyEmail = () => {
        navigator.clipboard.writeText("sayyedrabeeh240@gmail.com")
        toast.success('email copied to clipboard')
    }

    return (
        <section className="py-20 px-6" >
            <div className="max-w-4xl mx-auto" >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200 mb-4 " >
                        Connect with me 
                    </h2>
                    <p className="text-purple-300/70 text-lg">
                        Let's build amazing together
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-10"
                >
                    <button onClick={copyEmail}
                        className="group flex items-center gap-3 mx-auto px-6 py-4 bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-2xl  text-purple-200 hover:bg-white/10 transition-all
                    duration-300 shadow-lg hover:shadow-purple-500/20">
                        <FiMail className="w-6 h-6 text-purple-400" />
                        <span className="font-medium" >sayyedrabeeh240@gmail.com</span>
                        <FiCopy className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100  transition-opacity"/>
                    </button>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {links.map((link, index) => (
                        <motion.a key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-sm border border-purple-500/20  rounded-2xl hover:bg-white/10  hover:border-purple-500/40 transition-all
                            duration-300 shadow-md hover:shadow-xl hover:scale-105 ${link.color} `}
                        >
                            <div className="mb-3  p-3 bg-white/10 rounded-full group-hover : scale-110 transition-transform ">
                                {link.icon}
                                
                            </div>
                            <span className="text-sm font-medium text-purple-200 ">{link.name}</span>
                            
                        </motion.a>
                    )) }

                </div>

            </div>
    
        </section>
    )
} 