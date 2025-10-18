import { motion } from "framer-motion"  
import { Autoplay, EffectCoverflow } from "swiper/modules"
import { Swiper,SwiperSlide } from "swiper/react"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-coverflow";

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
        <motion.section id="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen  text-white  px-6 py-12 flex items-center justify-center relative overflow-hidden ">
            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row  items-center">
            <div className="w-full lg:w-1/2  flex flex-col justify-center p-4 lg:p-16 space-y-6">
                <motion.h1 className="text-4xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text"
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

                <motion.div className="lg:w-[900px] w-full"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                <div className="[perspective:2000px]" >
                    <Swiper
                        effect='coverflow'
                        grabCursor
                        centeredSlides
                        slidesPerView='auto'
                        loop
                        speed={1300}
                        spaceBetween={-150}
                        coverflowEffect={
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
                                <motion.div className="group relative h-full cursor-pointer"
                                    whileHover={{ y: -15 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                    
                                >

                                    <div className="relative h-full  bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10  shadow-xl overflow-hidden transition-all flex flex-col  ">
                                        <div className="h-3/4  overflow-hidden relative group ">
                                            <motion.img src={p.img} alt={p.title} className="w-full
                                            h-full object-cover transition-transform  duration-[1200ms]  ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110 group-hover:blur-sm" />
                                            <div className="absolute inset-0 text-lg bg-black/40 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                                <a href={p.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-5 py-2 rounded-full  bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-lg hover:from-blue-500 hover:to-green-400 transition-all duration-300 "
                                                >
                                                   <FaExternalLinkAlt/>Link 
                                                </a>
                                                <a href={p.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/20  text-white font-semibold shadow-lg hover:bg-white/30 transition-all duration-300 ">
                                                    <FaGithub/>Github 
                                                </a>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10 " ></div>
                                        </div>
                                        <div className="flex-1 p-6 bg-gradient-to-br from-black to-gray-900 flex flex-col justify-between " >
                                            <h3 className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-3"> 
                                                { p.title }
                                            </h3>
                                            <div>
                                                {p.tech.map((p,i)=>(
                                                    <span key={i}
                                                className="text-xs font-medium text-gray-200 bg-white/10 px-2 py-1 rounded-full border  border-white/20 "    >
                                                    {p.trim()}
                                                </span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-300 mt-4 leading-relaxed mb-6 " >
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
            </div>    
        </motion.section>
    )
}