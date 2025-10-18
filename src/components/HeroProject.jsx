import { motion } from "framer-motion"  
import { Autoplay, EffectCoverflow } from "swiper/modules"
import { Swiper,SwiperSlide } from "swiper/react"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects  =[
      {
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    title: "Front-End Expertise",
    description: "Advanced interfaces with React, Next.js, and sophisticated animations.",
    tech: [ 'React', 'Next.js',  'TypeScript'],
    live: "#",
    github: "#",
    },
    {
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    title: "Robust Back-End",
    description: "Efficient APIs, optimized databases, and scalable architecture.",
    tech:  [ 'React', 'Next.js',  'TypeScript'],
    live: "#",
    github: "#",
  },
  {
    img: "https://images.unsplash.com/photo-1570545887537-865bd283af1c?w=600&h=400&fit=crop",
    title: "Migtech Hub",
    description: "System for optimal job transitions with healthcare diploma support.",
    tech:  [ 'React', 'Next.js',  'TypeScript'],
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
                <motion.p className="text-gray-300 text-lg lg:text-xl leading-relaxed"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{duration:0.9,delay:0.1}}
                >
                    Explore some of my featured projects built with modern web technologies — each
                    showcasing creative UI, clean code, and robust performance.
                </motion.p>
                <motion.button 
                 className="w-max px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl font-bold text-white shadow-2xl hover:scale-105 hover:shadow-purple-500/40 transition-transform duration-300 text-2xl"
                     whileHover={{ scale: 1.1 }}
                 >
                    Explore All 
                </motion.button>
            </div>

            <motion.div className="lg:w-[900px] w-full">
                <div>
                    <Swiper
                        effect='controlflow'
                        grabCursor
                        centeredSlides
                        slidesPriview='auto'
                        loop
                        speed={1300}
                        spaceBetween={-130}
                        controlflowEffect={
                            {
                                rotate: 15,
                                stretch: 0,
                                depth: 600,
                                modifier: 2.5,
                                slideshow: false
                            }}
                        modules={[EffectCoverflow, Autoplay]}
                        className='h-[500px] select-none'>
                        {projects.map((p, i) =>(
                            <SwiperSlide key={i} style={{ width: '400px' }}>
                                <motion.div>
                                    <div>
                                        <div>
                                            <motion.img src={p.img} alt={p.title} />
                                            <div>
                                                <a href={p.live}>
                                                   <FaExternalLinkAlt/>Link 
                                                </a>
                                                <a href={p.github}>
                                                    <FaGithub/>Github 
                                                </a>
                                            </div>
                                            <div></div>
                                        </div>
                                        <div>
                                            <h3>
                                                { p.title }
                                            </h3>
                                            <div>
                                                {p.tech.map((p,i)=>(
                                                <span key={i} >
                                                    {p.trim()}
                                                </span>
                                                ))}
                                            </div>
                                            <p>
                                                { p.description }
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>  
                            )
                        ) }
                    </Swiper>
                </div>
            </motion.div>   
        </motion.section>
    )
}