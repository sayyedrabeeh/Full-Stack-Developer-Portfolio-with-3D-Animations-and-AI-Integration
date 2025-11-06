import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate  } from "framer-motion";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
 
import { Home } from "lucide-react";
 
 
 

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

  const [signinEmail, setSignInEmail] = useState("");
  const [signinPassword, setSignInPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  
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
      if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
    return;  
  }
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage('')
    setError('')
    const url = isSignUp ? 'api/accounts/signup/' : 'api/accounts/login/';
    const payload = isSignUp ? {email: signupEmail,password : signupPassword,confirmPassword}:{ email : signinEmail,password : signinPassword  }
    
    try {
      const res = await api.post(url, payload)
      if (res.data.access) {
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
      }
      setMessage(res.data.message || 'success')
      navigate('/')
      
    } catch (err) {
      setError(err.response?.data?.error||'some thing went Wrong. ')
    }
  };
     
 
   useEffect(() => {
  const access = localStorage.getItem("access");

  if (access) {
    navigate("/", { replace: true });
    const preventBack = () => {
      if (localStorage.getItem("access")) {
        window.history.pushState(null, "", "/");
        navigate("/", { replace: true });
      }
    };
    window.addEventListener("popstate", preventBack);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }
}, [navigate]);

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
        className="absolute top-2 right-2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[570px] cursor-grab"
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
          <div className="w-full max-w-sm space-y-6 pointer-events-auto">
            
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
                  type="text"
                  value={isSignUp ? signupEmail : signinEmail}
                  onChange={(e) =>  isSignUp
                      ? setSignupEmail(e.target.value)
                      : setSignInEmail(e.target.value)}
                  placeholder="username"
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
                  value={isSignUp ? signupPassword : signinPassword}
                  onChange={(e) =>                     isSignUp
                      ? setSignupPassword(e.target.value)
                      : setSignInPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 text-white placeholder-purple-300/50 border text-sm border-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent transition-all backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={(e) => {
                   e.stopPropagation()
                    setShowPassword(!showPassword)
                  
                  }}
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
 
                  className="w-full pl-10 pr-12 py-3 text-sm rounded-xl bg-white/5 text-white placeholder-purple-300/50 border border-purple-500/20 focus:ring-2 focus:ring-purple-500/40 focus:border-transparent"
 
                                  />
                    <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowConfirmPassword(!showConfirmPassword) 
                    
                  }}
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
                {message && (
                  <p className="text-green-400 text-sm text-center">{message}</p>
                )}
                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                          
              <button
                onClick={handleSubmit}
                className="w-full py-3 text-sm  bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">{isSignUp ? "Sign Up" : "Sign In"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
                <p className="text-center text-purple-400/70 text-sm">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button
                                  onClick={() => {
                                      
                                          setIsSignUp(!isSignUp) 
                                      console.log('clicked')
                                      
}}
                  className="ml-2 text-purple-300 hover:text-purple-100 underline transition-colors  pointer-events-auto"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
 
      <div className="flex justify-center">
            <motion.button
              onClick={() => navigate("/")}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-purple-300 hover:text-white bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-xl hover:bg-purple-500/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <svg 
                className="w-4 h-4 text-purple-400 group-hover:text-white transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </motion.button>
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


 