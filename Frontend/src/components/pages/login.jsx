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
    

    useEffect(() => {
        if (!mountRef.current) return;
       
        const scene = new THREE.Scene()
        const fog = new THREE.Fog(0x0a0a1a, 10, 50)
        
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 15
        
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(0x0a0a1a, 1)
        mountRef.current.appendChild(renderer.domElement)


        const particleCount = 1500;
        const positions  = Float32Array(particleCount * 3)
        const colors   = Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount * 3; i += 3){
            const radius = 30
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)
            positions[i] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i +1 ] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i + 2] = radius * Math.cos(phi)
            colors[i] = 0.5 + Math.random() * 0.5
            colors[i + 1] = 0.2 + Math.random() * 0.3
            colors[i + 3] = 1

        }
        




    },[])








    return (
        <>
        </>
    )


}