import React from "react";
import { color, motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiGlobe, FiCode, FiCopy, FiRss } from 'react-icons/fi'
import { SiLeetcode } from "react-icons/si";

export default function ExternalLinks() {
    const links = [
        {
            name: 'Github',
            url: 'https://github.com/sayyedrabeeh',
            icon: <FiGithub className="w-5 h-5" />,
            color: 'hover:text-gray-400'
        },

    ]

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

                

            </div>
    
        </section>
    )
}