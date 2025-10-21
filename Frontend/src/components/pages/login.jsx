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
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        
        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        const tours = new THREE.Mesh(
            new THREE.TubeGeometry(5, 0.8, 16, 100),
            new THREE.MeshPhongMaterial({
                color: 0x6366f1,
                wireframe: true,
                transparent: true,
                opacity: 0.6,
            })
        )
        tours.rotation.x = Math.PI / 4
        scene.add(tours)

        const octa = new THREE.Mesh(
            new THREE.OctahedronGeometry(3, 0),
            new THREE.MeshPhongMaterial({
                color: 0x8b5cf6,
                wireframe: true,
                transparent: true,
                opacity : 0.5
            })
        )
        scene.add(octa)

        scene.add(new THREE.AmbientLight(0x404040, 2))
        const pointLight1 = new THREE.PointLight(0x6366f1, 2, 100)
        pointLight1.position.set(10, 10, 10)
        scene.add(pointLight1)
        const PointLight2 = new THREE.PointLight(0x8b5cf6, 2, 100)
        PointLight2.position.set(-10, -10, -10)
        scene.add(PointLight2)
        
        let time = 0
        const animateScene = () => {
            requestAnimationFrame(animateScene)
            time += 0.01
            particles.rotation.y = time * 0.15
            particles.rotation.x = time * 0.5
            tours.rotation.y +=  0.008
            tours.rotation.y += 0.005
            octa.rotation.x += 0.008
            octa.rotation.y += 0.006
            renderer.render(scene,camera)
        }

        animateScene()

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth,window.innerHeight)
        }
        window.addEventListener('resize', handleResize)
        
        return () => {
            removeEventListener('resize', handleResize)
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement)
                renderer.dispose()
            }   
        }
    },[])








    return (
        <>
        </>
    )


}