import { motion } from "framer-motion"  


const projects  =[
      {
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    title: "Front-End Expertise",
    description: "Advanced interfaces with React, Next.js, and sophisticated animations.",
    tech: "React / Next.js / TypeScript",
    live: "#",
    github: "#",
    },
    {
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    title: "Robust Back-End",
    description: "Efficient APIs, optimized databases, and scalable architecture.",
    tech: "Node.js / Express / MongoDB",
    live: "#",
    github: "#",
  },
  {
    img: "https://images.unsplash.com/photo-1570545887537-865bd283af1c?w=600&h=400&fit=crop",
    title: "Migtech Hub",
    description: "System for optimal job transitions with healthcare diploma support.",
    tech: "JavaScript / React / API",
    live: "#",
    github: "#",
  }
]



export default function Projects() {
    
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen  text-white  px-6 py-12 flex items-center justify-center relative overflow-hidden ">
            <div className="w-full lg:w-1/2  flex flex-col justify-center p-4 lg:p-16 space-y-6">
                <motion.h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{duration: 0.8}}
                >
                    My Projects
                </motion.h1>

                <motion.p>
                
                    Explore some of my featured projects built with modern web technologies — each
                    showcasing creative UI, clean code, and robust performance.
                
                </motion.p>
                
                <motion.button>
                    Explore All 
                </motion.button>
            </div>

            <motion.div>

            </motion.div>
        
            
        
        </motion.section>
    )


}