import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate  } from "framer-motion";
import * as THREE from "three";

export default function Login3D() {
  const mountRef = useRef(null);
  const cardRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const rotationX = useMotionValue(0);
  const rotationY = useMotionValue(0);
  const draggingMode = useRef("rotate");
  const lastPointer = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  

  
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a1a, 10, 50);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a1a, 1);
    mountRef.current.appendChild(renderer.domElement);

    
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
      colors[i] = 0.5 + Math.random() * 0.5;
      colors[i + 1] = 0.2 + Math.random() * 0.3;
      colors[i + 2] = 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(5, 0.8, 16, 100),
      new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      })
    );
    torus.rotation.x = Math.PI / 4;
    scene.add(torus);

    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(3, 0),
      new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      })
    );
    scene.add(octa);

    scene.add(new THREE.AmbientLight(0x404040, 2));
    const pointLight1 = new THREE.PointLight(0x6366f1, 2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    let time = 0;
    const animateScene = () => {
      requestAnimationFrame(animateScene);
      time += 0.01;
      particles.rotation.y = time * 0.15;
      particles.rotation.x = time * 0.05;
      torus.rotation.x += 0.005;
      torus.rotation.y += 0.008;
      octa.rotation.x += 0.008;
      octa.rotation.y += 0.006;
      renderer.render(scene, camera);
    };
    animateScene();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement)
        mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const formElements = ["INPUT", "TEXTAREA", "BUTTON", "LABEL"];

      const onPointerDown = (e) => {
        if (e.target.tagName === "BUTTON") return;
      draggingMode.current = formElements.includes(e.target.tagName)
        ? "move"
        : "rotate";
      lastPointer.current = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!lastPointer.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;

      if (draggingMode.current === "rotate") {
        rotationY.set(rotationY.get() + dx * 0.5);
        rotationX.set(rotationX.get() - dy * 0.5);
      }

      lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e) => {
      lastPointer.current = null;
      el.releasePointerCapture(e.pointerId);

      if (draggingMode.current === "rotate") {
        const currentX = rotationX.get();
    const currentY = rotationY.get();

     
    animate(rotationX, 0, {
      type: "tween",
      duration: 3,  
      ease: [0.25, 0.1, 0.25, 1],  
      from: currentX
    });

    animate(rotationY, 0, {
      type: "tween",
      duration: 3,
      ease: [0.25, 0.1, 0.25, 1],
      from: currentY
    });
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointerleave", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointerleave", onPointerUp);
    };
  }, [rotationX, rotationY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) console.log("Signup:", { email, password, confirmPassword });
    else console.log("Login:", { email, password });
  };
     


  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-violet-950">
      <div ref={mountRef} className="absolute inset-0 z-0" />

    
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

     <motion.div
               
        ref={cardRef}
        drag
        dragMomentum={false}
        dragElastic={0.1}
        dragConstraints={{
          top: -window.innerHeight / 3,
          bottom: window.innerHeight / 3,
          left: -window.innerWidth / 3,
          right: window.innerWidth / 3,
        }}
        onDragStart={() => cardRef.current && (cardRef.current.style.cursor = 'grabbing')}
        onDragEnd={() => cardRef.current && (cardRef.current.style.cursor = 'grab')}
        style={{
          rotateX: rotationX,
            rotateY: rotationY,
          
          transformStyle: "preserve-3d",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[530px] cursor-grab"
      >
        
        <div 
          className="absolute inset-0 bg-gradient-to-br  rounded-3xl shadow-2xl backdrop-blur-xl border border-purple-500/30"
          style={{ transform: "translateZ(30px)" }}
        />
        
        
        <div 
          className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-purple-900/60 to-indigo-900/60 rounded-3xl shadow-inner border border-purple-500/20"
          style={{ transform: "translateZ(-30px) rotateY(180deg)" }}
        />
        
       
        <div 
          className="absolute top-0 left-0 w-[60px] h-full bg-gradient-to-r from-purple-900/50 to-indigo-900/50"
          style={{ 
            transform: "rotateY(-90deg) translateX(-30px)",
            transformOrigin: "left",
            borderRadius: "0 0 0 24px"
          }}
        />
        
       
        <div 
          className="absolute top-0 right-0 w-[60px] h-full bg-gradient-to-l from-violet-900/50 to-indigo-900/50"
          style={{ 
            transform: "rotateY(90deg) translateX(30px)",
            transformOrigin: "right",
            borderRadius: "0 0 24px 0"
          }}
        />
        
      
        <div 
          className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-purple-900/50 to-indigo-900/50"
          style={{ 
            transform: "rotateX(90deg) translateY(-30px)",
            transformOrigin: "top",
            borderRadius: "24px 24px 0 0"
          }}
        />
       
        <div 
          className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-violet-900/50 to-indigo-900/50"
          style={{ 
            transform: "rotateX(-90deg) translateY(30px)",
            transformOrigin: "bottom",
            borderRadius: "0 0 24px 24px"
          }}
        />
 
        <div className="absolute inset-0 p-10 flex flex-col justify-center items-center  " style={{ transform: "translateZ(31px)" }}>
          <div className="w-full max-w-sm space-y-6  ">
            
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-950 via-indigo-950 to-violet-950 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
                      </div>
            

            <div className="text-center space-y-1">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-blue-200 tracking-tight">
               {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-purple-300/60 text-sm">
                {isSignUp ? "Sign up to get started" : "Sign in to your account"}
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center  ">
                  <svg className="w-5 h-5 text-purple-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3  text-sm rounded-xl bg-white/5 text-white placeholder-purple-300/50 border border-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center  ">
                  <svg className="w-5 h-5  text-purple-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 text-white placeholder-purple-300/50 border text-sm border-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent transition-all backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex  items-center text-purple-400/70 hover:text-purple-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                              </button>   
                              
                </div>
                 {isSignUp && (<div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center  ">
                  <svg className="w-5 h-5  text-purple-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 text-sm rounded-xl bg-white/5 text-white placeholder-purple-300/50 border border-purple-500/20 focus:ring-2 focus:ring-purple-500/40 focus:border-transparent"
                                  />
                    <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex  items-center text-purple-400/70 hover:text-purple-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>)}       

                          
              <button
                onClick={handleSubmit}
                className="w-full py-3 text-sm  bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">{isSignUp ? "Sign Up" : "Sign In"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
                <div className="text-center text-purple-400/70 text-sm">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button
                                  onClick={() => {
                                      
                                          setIsSignUp(!isSignUp) 
                                      console.log('clicked')
                                      
}}
                  className="ml-2 text-purple-300 hover:text-purple-100 underline transition-colors  "
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
      
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-500/20"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-gradient-to-r from-purple-950/0 via-indigo-950 to-violet-950/0 text-purple-300/50">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <button className="flex items-center justify-center py-2.5 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-500/30 transition-all group">
                  <svg className="w-5 h-5 text-purple-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
                
              </div>

            </div>
                              
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-purple-300/30 text-xs text-center">
        <p>Drag the card or move your mouse to interact ... </p>
      </div>
    </div>
  );
}
