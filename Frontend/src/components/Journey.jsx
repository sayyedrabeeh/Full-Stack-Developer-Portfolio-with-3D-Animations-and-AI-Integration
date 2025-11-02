import React,{ useState,useEffect,useRef } from "react"
import { motion,AnimatePresence } from "framer-motion"
import { Bike,X,Sparkles } from "lucide-react"


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
    

    return (
        <>
        Journey
        </>
    )
}