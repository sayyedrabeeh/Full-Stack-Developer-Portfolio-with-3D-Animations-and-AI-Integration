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
    
    

    return (
        <>
        Journey
        </>
    )
}