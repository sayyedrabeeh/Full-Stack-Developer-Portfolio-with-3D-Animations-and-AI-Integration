import React,{ useState,useEffect,useRef } from "react"
import { motion,AnimatePresence, progress } from "framer-motion"
import { Bike,X,Sparkles, Milestone, Sparkle } from "lucide-react"
 


export default function Journey() {
    
    // const [mileStones, setMileStones] = useState([])
    const [activeMileStone, setActiveMileStone] = useState(0)
    const [expandedCard, setExpandedCard] = useState(null)
    const [ bikeProgress ,setBikeProgress ] = useState(0)
    const pathRef = useRef(null)
    const [pathLength, setPathLength] = useState(0)
    const [bikePos, setBikePos] = useState({ x: 0, y: 0 })
    const [bikeAngle, setBikeAngle] = useState(0)
    const [particles, setParticles] = useState([])

      const mileStones = [
    "Started Coding",
    "Learned Python",
    "Built AI Projects",
    "Learned Django",
    "Mastered React",
    "Full-Stack Developer Journey",
  ];
    
    useEffect(() => {
        const newParticles = Array.from({ length: 60 }, (_,i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration : Math.random() * 15 + 10
        }))
        setParticles(newParticles)
    }, [])
    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength())
        }
    }, [])    
    useEffect(() => {

        if (!pathLength) return
        const targetProgress = activeMileStone / (mileStones.length - 1)
        const startProgress = bikeProgress
        const duration = 2000
        const startTime = Date.now()
        
        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2
            const currentProgress = startProgress + (targetProgress - startProgress) * eased
            setBikeProgress(currentProgress)
            
            if (pathRef.current) {
                const point = pathRef.current.getPointAtLength(currentProgress * pathLength )
                const nextPoint = pathRef.current.getPointAtLength(Math.min(currentProgress * pathLength + 10, pathLength))
                const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI
                
                setBikePos({ x: point.x, y: point.y })
                setBikeAngle(angle)
            }
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }


        animate()        

    }, [activeMileStone, pathLength, mileStones.length])

    const handleMileStoneClick = (index) => {
        setActiveMileStone(index)
    }

    const handleCardClick = (index) => {
        setActiveMileStone(index)
        setExpandedCard(index)
    }
    
    const getMilestonePositions = () => {
        if (!pathRef.current || !pathLength) return []; 
        return mileStones.map((_, index) => {
            const progress = index / (mileStones.length - 1)
            const point = pathRef.current.getPointAtLength(progress * pathLength)
            return { x: point.x, y : point.y }
        })
    }

    const milestonePosition = getMilestonePositions()

    const getCardIllumination = (milestoneIndex) => {
        if (!milestonePosition[milestoneIndex]) return 0
        const pos = milestonePosition[milestoneIndex]
        const dx = pos.x - bikePos.x
        const dy = pos.y - bikePos.y
        const distance = Math.sqrt(dx * dx - dy * dy)
        const maxDistance = 150
        return Math.max(0,1-distance / maxDistance )
        
    }


    return (
        <div className="min-h-screen  text-white overflow-hidden relative " >
            <div className="fixed inset-0 overflow-hidden " >
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-cyan-400"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height:`${particle.size}px`
                        }}
                        animate={{
                            y: [0, -80, 0],
                            opacity:[0.2,0.5,0.2]
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease : 'linear'
                    }}
                    />
                )) }
            </div>
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-transparent  to-blue-900/10  pointer-events-none" />

            <div className="relative z-10 px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-6xl md:text-7xl font-bold mb-3  bg-gradient-to-r from-cyan-400 via-blue-500  to-purple-500 bg-clip-text text-transparent"
                    >
                        My Coding Journey
                    </h1>
                    <p className="text-white-900/70 text-lg text-cyan-400 flex items-center  justify-center gap-2 " >
                        <Sparkles className="w-5 h-5"/>
                        Follow the curved path
                    </p>
                </motion.div>

                <div className="relative  width-full " style={{ minHeight: '1200px' }} >
                    <svg
                        viewBox="0 0 1000 1200"
                        className="w-full h-full absolute inset-0 "
                        style={{ filter: 'drop-shadow(0 0 15px rgb(6,182,212,0.2))' }}>
                        
                        <defs>
                            <linearGradient id="pathGradient" x1='0%' y1='0%' x2='0%' y2='100%'>
                                <stop offset='0%' stopColor="#06b6d4" stopOpacity='0.9'/>
                                <stop offset='50%' stopColor="#3b82f6" stopOpacity='0.9'/>
                                <stop offset='100%' stopColor="#8b5cf6" stopOpacity='0.9'/>
                            </linearGradient>

                            <filter id="glow">
                                <feGaussianBlur stdDeviation='3' result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                       
                            <radialGradient id="headlight">
                                <stop offset='0%' stopColor="#ffffff" stopOpacity='0.9'/>
                                <stop offset='50%' stopColor="#06b6d4" stopOpacity='0.5'/>
                                <stop offset='100%' stopColor="#06b6d4" stopOpacity='0'/>
                            </radialGradient>
                        </defs>  
                        <path ref={pathRef} d="M 500 100 
                                                C 500 200, 600 250, 700 300
                                                C 800 350, 800 450, 700 500
                                                C 600 550, 400 550, 300 600
                                                C 200 650, 200 750, 300 800
                                                C 400 850, 600 850, 700 900
                                                C 800 950, 800 1050, 700 1100"
                            stroke="url(#pathGradient)"
                            strokeWidth='8'
                            fill="none"
                            strokeLinecap="round"
                            filter="url(#glow)"
                            className="opacity-60"
                        />
                        <motion.path
                            d='M 500 100 
                                C 500 200, 600 250, 700 300
                                C 800 350, 800 450, 700 500
                                C 600 550, 400 550, 300 600
                                C 200 650, 200 750, 300 800
                                C 400 850, 600 850, 700 900
                                C 800 950, 800 1050, 700 1100'
                            stroke='#06b6d4'
                            strokeWidth='10'
                            fill='none'
                            strokeLinecap='round'
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: bikeProgress, opacity: [0.7, 1, 0.7] }}
                            transition={{
                                pathLength: { duration: 0.5 } ,
                            opacity:{ duration: 1.5, repeat: Infinity }
                            }}
                        />

                        
                        
                        {milestonePosition.map((pos, index) => {
                            const illumination = getCardIllumination(index)
                            const isActive = illumination > 0.3 
                            return (
                                <g key={index} >{isActive && (<motion.circle 
                                    cx={pos.x}
                                    cy={pos.y}
                                    r='40'
                                    fill='url(#headlight)'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: illumination * 0.7 }}
                                    />
                                )}
                                    <motion.circle 
                                        cx={pos.x}
                                        cy={pos.y}
                                        r='10'
                                        fill={isActive ? '#06b6d4' : '#334155'}
                                        stroke={isActive ? '#ffffff' : '#475569'}
                                        strokeWidth='3'
                                        className='cursor-pointer'
                                        onClick={() => handleMileStoneClick(index)}
                                        whileHover={{ scale: 1.4 }}
                                        animate={{
                                            scale: isActive ? [1, 1.3, 1] : 1
                                            
                                        }}
                                        transition={{
                                        scale:{duration:1, repeat : Infinity}
                                        }}
                                    />
                                </g>

                            )
                        }) }


                        </svg>

                </div>


            </div>

  
        </div>
    )
}