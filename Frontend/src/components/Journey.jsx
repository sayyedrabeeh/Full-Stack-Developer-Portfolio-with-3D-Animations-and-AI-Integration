import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, X, Sparkles,Plus,Trash2,Trophy, ExternalLink,ChevronLeft    } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CurvedJourneyTimeline = () => {
  
  const [milestones, setMilestones] = useState([])
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [bikeProgress, setBikeProgress] = useState(0);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [bikePos, setBikePos] = useState({ x: 0, y: 0 });
  const [bikeAngle, setBikeAngle] = useState(0);
  const [particles, setParticles] = useState([]);
    
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);  
  const [showModal, setShowModal] = useState(false);
  const [svgHeight, setSvgHeight] = useState(1200);  


  const [showAllCards, setShowAllCards] = useState(false);
  const INITIAL_CARDS_TO_SHOW = 5;
  
  const navigate = useNavigate()
    
    
    
 useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);
  }, []);
  
 const [form, setForm] = useState({
    year: "",
    date: "",
    title: "",
        description: "",
    achievements: [
            { name: "", github_link: "" ,image:null,preview: ""}
    ]
    })
     useEffect(() => {
    const baseHeight = 1200;
    const heightPerMilestone = 180;
    const calculatedHeight = Math.max(baseHeight, milestones.length * heightPerMilestone);
    setSvgHeight(calculatedHeight);
     }, [milestones.length])
    
    
    useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, [milestones.length, svgHeight]);

    useEffect(() => {
     
      const stored = localStorage.getItem('user');
      const user = stored && stored !== 'undefined' && stored !== 'null' 
        ? JSON.parse(stored) 
        : null;
        
      setIsSuperUser(user?.is_superuser || false);
      
    }, []);
    
      const fetchJourney = async () => {
            const token = localStorage.getItem("access");
            const res = await api.get("api/accounts/journey/", {
            headers: { Authorization: `Bearer ${token}` }
            });
            setMilestones(res.data);
        };
        useEffect(() => {
            fetchJourney();
        }, []);
    
const handleSubmit = async () => {
  if (!form.year || !form.date || !form.title || !form.description) {
    toast.error('All fields are required');
    return;
  }

  const formData = new FormData();
  formData.append("year", form.year);
  formData.append("date", form.date);
  formData.append("title", form.title);
  formData.append("description", form.description);

  form.achievements.forEach((ach, index) => {
    formData.append("achievements", JSON.stringify({
      name: ach.name,
      github_link: ach.github_link,
    }));

    if (ach.image) {
      formData.append(`achievement_image_${index}`, ach.image);
    }
  });

  try {
    const token = localStorage.getItem("access");

    const res = await api.post(
      "api/accounts/journey/add/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      }
    );

    toast.success(res.data.message);
    setShowModal(false);

    setForm({
      year: "",
      date: "",
      title: "",
      description: "",
      achievements: [{ name: "", github_link: "", image: null, preview: "" }]
    });

    fetchJourney();
  } catch (err) {
    toast.error("Failed to add journey");
    console.log(err);
  }
};


    
    const deleteMilestone = async (id) => {
        if (!window.confirm("Delete milestone?")) return;
        const token = localStorage.getItem("access");

        const res = await api.post(`api/accounts/journey/delete/${id}/`,{}, {
        headers: { Authorization: `Bearer ${token}` }
        });
        fetchJourney();
        toast.success(res.data.message)
    };
    const addAchievement = () => {
        setForm(prev => ({
            ...prev,
            achievements: [...prev.achievements, { name: "", github_link: "" ,image:null,preview: ""}]
        }));
        };

        const updateAchievement = (index, field, value) => {
        setForm((prev) => {
          const updated = [...prev.achievements];
          if (field === "image" && value) {
            const file = value;
            updated[index].image = file;
            updated[index].preview = URL.createObjectURL(file);
          } else {
            updated[index][field] = value;
          }
          return { ...prev, achievements: updated };
        });
      };

        const removeAchievement = (index) => {
        const updated = form.achievements.filter((_, i) => i !== index);
        setForm(prev => ({ ...prev, achievements: updated }));
        };

  useEffect(() => {
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

 useEffect(() => {
  if (!pathLength || milestones.length === 0) return;

  
  if (milestones.length === 1) {
    const point = pathRef.current.getPointAtLength(0);
    setBikeProgress(0);
    setBikePos({ x: point.x, y: point.y });
    setBikeAngle(0);
    return;
  }

  const totalSegments = milestones.length - 1;
  const targetProgress = Math.min(
    Math.max(activeMilestone / totalSegments, 0),
    1
  );

  const startProgress = bikeProgress;
  const duration = 2000;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

 
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const currentProgress = startProgress + (targetProgress - startProgress) * eased;
    setBikeProgress(currentProgress);

    if (pathRef.current) {
      const posLength = currentProgress * pathLength;

      let point, nextPoint;
      try {
        point = pathRef.current.getPointAtLength(posLength);
        nextPoint = pathRef.current.getPointAtLength(Math.min(posLength + 10, pathLength));
      } catch {
        return;  
      }

      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
      setBikePos({ x: point.x, y: point.y });
      setBikeAngle(angle);
    }

    if (progress < 1) requestAnimationFrame(animate);
  };

  animate();
}, [activeMilestone, pathLength, milestones.length]);

  const handleMilestoneClick = (index) => {
    setActiveMilestone(index);
  };

  const handleCardClick = (index) => {
    setActiveMilestone(index);
    setExpandedCard(index);
  };

 const getMilestonePositions = () => {
  if (!pathRef.current || !pathLength || milestones.length === 0) return [];

   
  if (milestones.length === 1) {
    const point = pathRef.current.getPointAtLength(0);
    return [{ x: point.x, y: point.y }];
  }

  return milestones.map((_, index) => {
    const progress = index / (milestones.length - 1);
    const point = pathRef.current.getPointAtLength(progress * pathLength);
    return { x: point.x, y: point.y };
  });
};


  const milestonePositions = getMilestonePositions();

  const getCardIllumination = (milestoneIndex) => {
    if (!milestonePositions[milestoneIndex]) return 0;
    const pos = milestonePositions[milestoneIndex];
    const dx = pos.x - bikePos.x;
    const dy = pos.y - bikePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 150;
    return Math.max(0, 1 - distance / maxDistance);
  };

    
    
    const generateDynamicPath = () => {
    if (milestones.length === 0) return "M 500 100";
    const startY = 100;
    const segmentHeight = 180;
    let pathCommands = [`M 500 ${startY}`];
    for (let i = 0; i < milestones.length - 1; i++) {
      const y1 = startY + i * segmentHeight;
      const y2 = startY + (i + 1) * segmentHeight;
      const midY = (y1 + y2) / 2;
      if (i % 4 === 0) pathCommands.push(`C 500 ${y1 + 100}, 600 ${midY - 50}, 700 ${y2}`);
      else if (i % 4 === 1) pathCommands.push(`C 800 ${y1 + 50}, 800 ${midY + 50}, 700 ${y2}`);
      else if (i % 4 === 2) pathCommands.push(`C 600 ${y1 + 50}, 400 ${midY - 50}, 300 ${y2}`);
      else pathCommands.push(`C 200 ${y1 + 50}, 200 ${midY + 50}, 300 ${y2}`);
    }
    return pathCommands.join(' ');
  };

  const dynamicPath = generateDynamicPath();
  const MILESTONE_SPACING = 180;  
  const displayedMilestones = showAllCards ? milestonePositions.length : Math.min(INITIAL_CARDS_TO_SHOW, milestonePositions.length);
const TOTAL_PATH_HEIGHT = Math.max(
  800,
  displayedMilestones * MILESTONE_SPACING + 400
);
     
  return (
    <div id='journey' className="min-h-screen  text-white overflow-x-hidden relative  ">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400 pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
    {isLoggedIn ? (<>
           <div className="relative z-10 px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
            <motion.h1
                initial={{ opacity: 0, y: 400 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false ,amount: 0.5 }}
                transition={{duration:1}}
            
              className="text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Journey Timeline
          </motion.h1>
            <motion.p
                initial={{ opacity: 0, x: 400 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false ,amount: 0.5 }}
                transition={{duration:1}}
            
              className="text-cyan-300/70 text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Follow the curved path Explore each point 
          </motion.p>
              </motion.div>
             {isSuperUser && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white flex items-center gap-2 transition-colors shadow-lg shadow-cyan-500/50"
            >
              <Plus className="w-5 h-5" /> Add Journey
            </button>
          </div>
        )}
        <div className="relative w-full" style={{ minHeight: `${TOTAL_PATH_HEIGHT + 200}px` }} >
          <svg
            viewBox={`0 0 1000 ${TOTAL_PATH_HEIGHT}`}
            className="w-full h-full absolute inset-0 pointer-events-none"
            style={{ filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.2))', minHeight: `${TOTAL_PATH_HEIGHT}px`,zIndex: 1 }}
          >
            <defs>
               <radialGradient id="naturalHeadlight" cx="30%" cy="50%" r="200%">
                    <stop offset="0%" stopColor="#fff9e6" stopOpacity="1" />
                    <stop offset="25%" stopColor="#fde68a" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.3" />
                    <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#451a03" stopOpacity="0" />
                </radialGradient>

  
                <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="12" />
                </filter>
                          
             <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.85" />
            </linearGradient>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="blur"/>
                <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
              <radialGradient id="headlight">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                <stop offset="35%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
            </defs>
            <path
              ref={pathRef}
              d={dynamicPath}
              stroke="url(#pathGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              filter="url(#softGlow)"
                className="opacity-60"
                strokeDasharray={pathLength}
                strokeDashoffset={showAllCards ? 0 : pathLength - (pathLength * Math.min(INITIAL_CARDS_TO_SHOW, milestones.length) / Math.max(milestones.length - 1, 1))}
            />
            <motion.path
              d={dynamicPath}
              stroke="#06b6d4"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: showAllCards ? bikeProgress : Math.min(bikeProgress, Math.min(INITIAL_CARDS_TO_SHOW, milestones.length) / Math.max(milestones.length - 1, 1)),
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                pathLength: { duration: 0.5 },
                opacity: { duration: 1.5, repeat: Infinity }
              }}
            />
            {milestonePositions.slice(0, showAllCards ? milestonePositions.length : INITIAL_CARDS_TO_SHOW).map((pos, index) => {
              const illumination = getCardIllumination(index);
              const isActive = illumination > 0.3;
              return (
                <g key={index}>
                  {isActive && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r="30"
                      fill="url(#headlight)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: illumination * 0.7 }}
                    />
                  )}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="10"
                    fill={isActive ? "#06b6d4" : "#334155"}
                    stroke={isActive ? "#ffffff" : "#475569"}
                    strokeWidth="3"
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => handleMilestoneClick(index)}
                    whileHover={{ scale: 1.4 }}
                    animate={{
                      scale: isActive ? [1, 1.3, 1] : 1
                    }}
                    transition={{
                      scale: { duration: 1, repeat: Infinity }
                    }}
                  />
                </g>
              );
            })}
            {bikePos.x > 0 && (
 
 
        <g
        transform={`translate(${bikePos.x}, ${bikePos.y}) rotate(${bikeAngle})`}
        className="pointer-events-none"
        >
        <motion.path
            d="M 35,-25 Q 180,0 35,25 Q 80,0 35,-25 Z"
            fill="url(#naturalHeadlight)"
            filter="url(#softGlow)"
            animate={{ 
            opacity: [0.6, 0.85, 0.6],
            d: [
                "M 35,-25 Q 160,0 35,25 Q 80,0 35,-25 Z",
                "M 35,-25 Q 200,0 35,25 Q 80,0 35,-25 Z",
                "M 35,-25 Q 160,0 35,25 Q 80,0 35,-25 Z"
            ]
            }}
            transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
            }}
        />
 
        <circle cx="38" cy="0" r="8" fill="#fff9e6" filter="url(#softGlow)" opacity="0.9" />
        <motion.ellipse
            cx="38"
            cy="-2"
            rx="55"
            ry="32"
            fill="url(#headlight)"
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        <path
            d="M 0,-8 L 30,0 L 0,8 Z"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        
        <ellipse cx="-12" cy="-6" rx="8" ry="4" fill="#1e293b" />

        
        <path
            d="M 28,-4 L 36,-4 L 36,0 L 28,0"
            fill="none"
            stroke="#64748b"
            strokeWidth="3"
            strokeLinecap="round"
        />

        
        <circle cx="30" cy="0" r="12" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="30" cy="0" r="9" fill="#334155" />
        
        {[...Array(6)].map((_, i) => (
            <line
            key={i}
            x1={30 + 9 * Math.cos((i * Math.PI) / 3)}
            y1={0 + 9 * Math.sin((i * Math.PI) / 3)}
            x2={30 + 12 * Math.cos((i * Math.PI) / 3)}
            y2={0 + 12 * Math.sin((i * Math.PI) / 3)}
            stroke="#64748b"
            strokeWidth="1"
            />
        ))}

        
        <circle cx="-20" cy="0" r="12" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="-20" cy="0" r="9" fill="#334155" />
        {[...Array(6)].map((_, i) => (
            <line
            key={i}
            x1={-20 + 9 * Math.cos((i * Math.PI) / 3)}
            y1={0 + 9 * Math.sin((i * Math.PI) / 3)}
            x2={-20 + 12 * Math.cos((i * Math.PI) / 3)}
            y2={0 + 12 * Math.sin((i * Math.PI) / 3)}
            stroke="#64748b"
            strokeWidth="1"
            />
        ))}

        
        <circle cx="5" cy="0" r="3" fill="#64748b" />
        <motion.rect
            x="-8" y="-1.5" width="26" height="3"
            rx="1.5"
            fill="#06b6d4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "5px 0px" }}
        />
        </g>
                    )}
          </svg>
          {milestonePositions.slice(0, showAllCards ? milestonePositions.length : INITIAL_CARDS_TO_SHOW).map((pos, index) => {
            const illumination = getCardIllumination(index);
            const isLeft = index % 2 === 0;
              const offsetX = isLeft ? -350 : 100;
              const topPercent = (pos.y / TOTAL_PATH_HEIGHT) * 100
            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${(pos.x / 1000) * 100}%`,
                  top: `${topPercent}%`,
                  transform: `translate(${offsetX}px, -50%)`,
                  width: '320px'
                }}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={{ 
                  opacity: illumination > 0.1 ? 1 : 0.3,
                  x: 0,
                  scale: illumination > 0.3 ? 1 : 0.95
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`relative p-6 rounded-2xl backdrop-blur-xl cursor-pointer transition-all duration-500 ${
                    illumination > 0.3
                      ? 'bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-purple-500/20 border-2 border-cyan-400/30'
                      : 'bg-gray-900/50 border border-gray-700/40'
                  }`}
                  style={{
                    boxShadow: illumination > 0.3
                      ? `0 0 ${illumination*30}px rgba(6,182,212,0.25)`
                      : 'none'
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  {illumination > 0.2 && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${isLeft ? '100%' : '0%'} 50%, rgba(255,255,255,${illumination * 0.15}) 0%, transparent 70%)`,
                      }}
                      animate={{
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  )}
            <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                illumination > 0.25
                    ? 'bg-cyan-500/20 border border-cyan-500/40 shadow-sm'
                    : 'bg-gray-800/60 border border-gray-700/40'
                }`}>
                <span className={`text-lg font-bold ${
                    illumination > 0.25 ? 'text-cyan-200' : 'text-gray-500'
                }`}>
                    {milestones[index].year}
                </span>
                </div>
            
                {illumination > 0.45 && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                    <Sparkles className="w-5 h-5 text-cyan-400/70" />
                </motion.div>
                )}
            </div>

            <h3 className={`text-xl font-bold mb-3 transition-colors ${
                illumination > 0.25 ? 'text-white' : 'text-gray-500'
            }`}>
                {milestones[index].title}
            </h3>

            <p className={`text-sm leading-relaxed line-clamp-3 transition-colors ${
                illumination > 0.25 ? 'text-gray-200' : 'text-gray-600'
            }`}>
                {milestones[index].description}
            </p>

            
            {illumination > 0.35 && (
                <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8 }}
                className="h-px bg-gradient-to-r from-cyan-400/40 via-blue-500/30 to-purple-500/20 rounded-full mt-4"
                />
            )}
            </div>

    
            <div
            className={`absolute top-1/2 ${isLeft ? 'left-full' : 'right-full'} w-16 h-px transition-all`}
            style={{
                background: illumination > 0.25
                ? 'linear-gradient(to right, rgba(6, 182, 212, 0.4), transparent)'
                : 'rgba(75, 85, 99, 0.3)',
                boxShadow: 'none' 
            }}
            />
                            <div
                        className={`absolute top-1/2 ${isLeft ? 'left-full' : 'right-full'} w-20 h-0.5 transition-all ${
                      illumination > 0.3
                        ? 'bg-gradient-to-r from-cyan-400/60 to-transparent'
                        : 'bg-gray-700/30'
                    }`}
                    style={{
                      boxShadow: illumination > 0.3 ? `0 0 10px rgba(6, 182, 212, ${illumination * 0.6})` : 'none'
                    }}
                  />
                    </div>
                 
              </motion.div>
            );
          })}
            {milestones.length > INITIAL_CARDS_TO_SHOW && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute z-20"
        style={{
          left: '50%',
          top: showAllCards 
            ? `${(milestonePositions[milestonePositions.length - 1]?.y / svgHeight) * 100 + 12}%`
            : `${(milestonePositions[INITIAL_CARDS_TO_SHOW - 1]?.y / svgHeight) * 100 + 12}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <button
          onClick={() => {
            setShowAllCards(!showAllCards);
            if (showAllCards) {
            
              const journeySection = document.getElementById('journey');
              if (journeySection) {
                journeySection.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl font-semibold text-white shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-105"
        >
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 blur-lg transition-opacity"
            animate={{
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          <span className="relative flex items-center gap-2">
            {showAllCards ? (
              <>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronLeft className="w-5 h-5 rotate-90" />
                </motion.div>
                Show Less
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Show More ({milestones.length - INITIAL_CARDS_TO_SHOW} more)
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronLeft className="w-5 h-5 -rotate-90" />
                </motion.div>
              </>
            )}
          </span>
        </button>
      </motion.div>
    )}
        </div>
          </div>
            {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">

            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-cyan-400/30 p-6 rounded-2xl w-full max-w-lg shadow-2xl max-h-full overflow-y-auto"style={{ maxHeight: '90vh' }}
            >
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Add Journey</h2>

            <input
                className="border border-gray-700 bg-gray-800 text-white p-3 w-full mb-3 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="Year (e.g., 2024)"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
            />

            <input
                type="date"
                className="border border-gray-700 bg-gray-800 text-white p-3 w-full mb-3 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <input
                className="border border-gray-700 bg-gray-800 text-white p-3 w-full mb-3 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
                className="border border-gray-700 bg-gray-800 text-white p-3 w-full mb-3 rounded-lg h-24 resize-none focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <p className="font-semibold mb-2 text-cyan-300">Achievements</p>

          {form.achievements.map((ach, i) => (
          <div
            key={i}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-4 shadow-sm hover:border-cyan-500/30 transition-all"
          >
         
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                placeholder="Achievement name"
                value={ach.name}
                onChange={(e) => updateAchievement(i, "name", e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <input
                placeholder="GitHub link (optional)"
                value={ach.github_link}
                onChange={(e) => updateAchievement(i, "github_link", e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
 
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
             
              <div className="flex-1 flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateAchievement(i, "image", e.target.files?.[0] || null)}
                  className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 cursor-pointer"
                />
               
                {ach.preview && (
                  <img
                    src={ach.preview}
                    alt="preview"
                    className="w-12 h-12 rounded-lg object-cover border border-cyan-500/40 shadow-sm"
                  />
                )}
              </div>
 
              <button
                onClick={() => removeAchievement(i)}
                className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-all duration-200 group"
                title="Remove achievement"
              >
                <X size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        ))}

            <button
                onClick={addAchievement}
                className="text-cyan-400 hover:text-cyan-300 text-sm mb-4 flex items-center gap-1 transition-colors"
            >
                <Plus size={16} /> Add achievement
            </button>

            <div className="flex justify-between gap-3">
                <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors"
                >
                Cancel
                </button>
                <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors shadow-lg shadow-cyan-500/30"
                >
                Save Journey
                </button>
            </div>
            </motion.div>
        </div>
        )}
    <AnimatePresence>
      {expandedCard !== null && (
        <>
      
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40"
            onClick={() => setExpandedCard(null)}
          />

    
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div
              className="
                relative max-w-6xl w-full max-h-[92vh] overflow-y-auto
                bg-gray-900
                rounded-2xl
                shadow-2xl shadow-cyan-500/10
                border border-gray-800
                scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-gray-800
              "
            >
          
              <button
                onClick={() => setExpandedCard(null)}
                className="
                  absolute top-6 right-6 p-2 z-10
                  rounded-lg bg-gray-800 hover:bg-gray-750
                  border border-gray-700 hover:border-cyan-500/50
                  transition-all duration-200
                "
              >
                <X className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </button>

            
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 px-12 py-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-4 mb-4"
                >
                  <div className="
                    w-16 h-16 rounded-xl
                    bg-white/20 backdrop-blur-sm
                    flex items-center justify-center
                    border border-white/30
                  ">
                    <span className="text-3xl font-bold text-white">
                      {milestones[expandedCard].year}
                    </span>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-bold text-white mb-3 leading-tight"
                >
                  {milestones[expandedCard].title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-cyan-50 leading-relaxed max-w-4xl"
                >
                  {milestones[expandedCard].description}
                </motion.p>
              </div>

          
              <div className="px-12 py-10">
            
                {Array.isArray(milestones[expandedCard].Achievements) && 
                milestones[expandedCard].Achievements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-100">
                        Key Achievements
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {milestones[expandedCard].Achievements.map((ach, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="
                            group
                            bg-gray-800/50 hover:bg-gray-800
                            border border-gray-700 hover:border-cyan-500/50
                            rounded-xl
                            p-6
                            transition-all duration-300
                            hover:shadow-lg hover:shadow-cyan-500/10
                          "
                        >
              
                          {ach.image && (
                            <div className="mb-5">
                              <img
                                src={ach.image}
                                alt={ach.name}
                                className="
                                  w-full h-72 object-cover
                                  rounded-lg
                                  border border-gray-700
                                  shadow-md
                                  group-hover:shadow-xl group-hover:shadow-cyan-500/20
                                  transition-all duration-300
                                "
                              />
                            </div>
                          )}

                  
                          <div className="flex items-start gap-4">
                            <div className="
                              w-12 h-12 rounded-lg flex-shrink-0
                              bg-gradient-to-br from-cyan-500 to-cyan-600
                              flex items-center justify-center
                              shadow-lg shadow-cyan-500/30
                            ">
                              <Trophy className="w-6 h-6 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-gray-100 mb-3 leading-snug">
                                {ach.name}
                              </h4>

                              {ach.github_link && (
                                <a
                                  href={ach.github_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="
                                    inline-flex items-center gap-2 px-4 py-2
                                    text-sm font-medium text-cyan-400 hover:text-cyan-300
                                    bg-cyan-500/10 hover:bg-cyan-500/20
                                    border border-cyan-500/30 hover:border-cyan-500/50
                                    rounded-lg
                                    transition-all duration-200
                                  "
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  View on GitHub
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

          
                <div className="mt-10 pt-8 border-t border-gray-800 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Milestone #{expandedCard + 1}</span>
                  </div>

                  {isSuperUser && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMilestone(milestones[expandedCard].id);
                        setExpandedCard(null);
                      }}
                      className="
                        flex items-center gap-2 px-5 py-2.5
                        text-red-400 hover:text-red-300
                        bg-red-500/10 hover:bg-red-500/20
                        border border-red-500/30 hover:border-red-500/50
                        rounded-lg text-sm font-medium
                        transition-all duration-200
                      "
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Milestone
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

      </>) : (
        
        <div className="relative z-10 flex min-h-screen items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Journey Timeline
            </h2>

            <p className="text-lg text-gray-300">
              Login to see the journey
            </p>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-medium text-white shadow-lg shadow-cyan-500/30 transition-all pointer-events-auto"
            >
              Login
            </button>
          </motion.div>
          </div>
          
      )}
          
      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default function Journey() {
    return (
        
        <div className="min-h-screen overflow-y-auto">
  <CurvedJourneyTimeline />
</div>
    )
} 
 