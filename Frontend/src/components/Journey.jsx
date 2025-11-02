import React,{ useState,useEffect,useRef } from "react"
import { motion,AnimatePresence, progress } from "framer-motion"
import { Bike,X,Sparkles, Milestone } from "lucide-react"


export default function Journey() {
    
    const [mileStones, setMileStones] = useState([])
    const [activeMileStone, setActiveMileStone] = useState(0)
    const [expandedCard, setExpandedCard] = useState(null)
    const [ bikeProgress ,setBikeProgress ] = useState(0)
    const pathRef = useRef(null)
    const [pathLength, setPathLength] = useState(0)
    const [bikePos, setBikePos] = useState({ x: 0, y: 0 })
    const [bikeAngle, setBikeAngle] = useState(0)
    const [particles, setParticles] = useState([])
    
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
            setPathLength(pathRef.current.getTotalLength)
        }
    }, [])    
    useEffect(() => {

        if (!pathLength) return
        const targetProgress = activeMileStone / (mileStones.length - 1)
        const startProgress = bikeProgress
        const duration = 2000
        const startTime = Date.now()
        
        const animate = () => {
            const elapsed = Date.now - startTime
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
            const progress = index - (mileStones.length - 1)
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
        return max.Math(0,1-distance / maxDistance )
        
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

  
        </div>
    )
}