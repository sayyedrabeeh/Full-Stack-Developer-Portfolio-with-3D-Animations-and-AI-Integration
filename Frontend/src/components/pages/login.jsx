import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import * as THREE from 'three'

export default Login3D(){

    const mountRef = useRef(null)
    const cardRef = useRef(null)
    const [showPassword, setShowPassword] = useState(false)
    const rotationX = useMotionValue(0)
    const rotationY = useMotionValue(0)


    const draggingMode = useRef('rotate') 
    const lastPointer = useRef(null)

    const [ email,setEmail ] = useState('')
    const [ password,setPassword ] = useState('')
    
    







    return (
        <>
        </>
    )


}