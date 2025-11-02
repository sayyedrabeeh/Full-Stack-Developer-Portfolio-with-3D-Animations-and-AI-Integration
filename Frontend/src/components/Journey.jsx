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
    

    return (
        <>
        Journey
        </>
    )
}