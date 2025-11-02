import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, X, Sparkles,Plus  } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';

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
  
  const [isSuperUser, setIsSuperUser] = useState(false);  
  const [showModal, setShowModal] = useState(false);
  
  const [form, setForm] = useState({
    year: "",
    date: "",
    title: "",
        description: "",
    achievements: [
            { name: "", github_link: "" }
    ]
    })
    
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
        if (!form.title || !form.year || !form.description) {
            toast.error('All fields are required');
            return;
        }

        try {
            const token = localStorage.getItem("access");
            const res = await api.post(
            "/journey/add/",
            form,
            { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success(res.data.message);
            setShowModal(false);
            fetchJourney();
        } catch (err) {
            toast.error("Failed to add journey");
            console.log(err)
        }
        };

    
    const deleteMilestone = async (id) => {
        if (!window.confirm("Delete milestone?")) return;

        const res = await api.delete(`api/accounts/journey/delete/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        fetchJourney();
        toast.success(res.data.message)
    };
    const addAchievement = () => {
        setForm(prev => ({
            ...prev,
            achievements: [...prev.achievements, { name: "", github_link: "" }]
        }));
        };

        const updateAchievement = (index, field, value) => {
        const updated = [...form.achievements];
        updated[index][field] = value;

        setForm(prev => ({ ...prev, achievements: updated }));
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
    if (!pathLength) return;
    
    const targetProgress = activeMilestone / (milestones.length - 1);
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
        const point = pathRef.current.getPointAtLength(currentProgress * pathLength);
        const nextPoint = pathRef.current.getPointAtLength(Math.min(currentProgress * pathLength + 10, pathLength));
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
        
        setBikePos({ x: point.x, y: point.y });
        setBikeAngle(angle);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
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
    if (!pathRef.current || !pathLength) return [];
    
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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 overflow-hidden">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400"
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
      <div className="relative z-10 px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Journey Timeline
          </h1>
          <p className="text-cyan-300/70 text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Follow the curved path
          </p>
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
        <div className="relative w-full" style={{ minHeight: '1200px' }}>
          <svg
            viewBox="0 0 1000 1200"
            className="w-full h-full absolute inset-0"
            style={{ filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.2))' }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="headlight">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              ref={pathRef}
              d="M 500 100 
                 C 500 200, 600 250, 700 300
                 C 800 350, 800 450, 700 500
                 C 600 550, 400 550, 300 600
                 C 200 650, 200 750, 300 800
                 C 400 850, 600 850, 700 900
                 C 800 950, 800 1050, 700 1100"
              stroke="url(#pathGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
              className="opacity-60"
            />
            <motion.path
              d="M 500 100 
                 C 500 200, 600 250, 700 300
                 C 800 350, 800 450, 700 500
                 C 600 550, 400 550, 300 600
                 C 200 650, 200 750, 300 800
                 C 400 850, 600 850, 700 900
                 C 800 950, 800 1050, 700 1100"
              stroke="#06b6d4"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: bikeProgress,
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                pathLength: { duration: 0.5 },
                opacity: { duration: 1.5, repeat: Infinity }
              }}
            />
            {milestonePositions.map((pos, index) => {
              const illumination = getCardIllumination(index);
              const isActive = illumination > 0.3;
              return (
                <g key={index}>
                  {isActive && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r="40"
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
                    className="cursor-pointer"
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
              <g transform={`translate(${bikePos.x}, ${bikePos.y}) rotate(${bikeAngle})`}>
                <motion.ellipse
                  cx="30"
                  cy="0"
                  rx="60"
                  ry="35"
                  fill="url(#headlight)"
                  animate={{
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
                <circle cx="0" cy="0" r="18" fill="#06b6d4" opacity="0.3" filter="url(#glow)" />
                <circle cx="0" cy="0" r="10" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                <motion.circle
                  cx="0"
                  cy="0"
                  r="15"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.7, 0, 0.7]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
              </g>
            )}
          </svg>
          {milestonePositions.map((pos, index) => {
            const illumination = getCardIllumination(index);
            const isLeft = index % 2 === 0;
            const offsetX = isLeft ? -350 : 100;
            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${(pos.x / 1000) * 100}%`,
                  top: `${(pos.y / 1200) * 100}%`,
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
                      ? 'bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-purple-500/20 border-2 border-cyan-400/60'
                      : 'bg-gray-900/50 border border-gray-700/40'
                  }`}
                  style={{
                    boxShadow: illumination > 0.3
                      ? `0 0 ${illumination * 80}px rgba(6, 182, 212, ${illumination * 0.8}), inset 0 0 ${illumination * 40}px rgba(6, 182, 212, ${illumination * 0.3})`
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
                        illumination > 0.3
                          ? 'bg-cyan-400/30 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                          : 'bg-gray-800/80 border border-gray-600'
                      }`}>
                        <span className={`text-lg font-bold ${
                          illumination > 0.3 ? 'text-cyan-300' : 'text-gray-500'
                        }`}>
                          {milestones[index].year}
                        </span>
                      </div>
                      {illumination > 0.5 && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-6 h-6 text-cyan-400" />
                        </motion.div>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold mb-3 transition-colors ${
                      illumination > 0.3 ? 'text-white' : 'text-gray-500'
                    }`}>
                      {milestones[index].title}
                    </h3>
                    <p className={`text-sm leading-relaxed line-clamp-3 transition-colors ${
                      illumination > 0.3 ? 'text-gray-200' : 'text-gray-600'
                    }`}>
                      {milestones[index].description}
                    </p>
                    {illumination > 0.4 && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8 }}
                        className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full mt-4"
                      />
                    )}
                  </div>
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
                {isSuperUser && (
              <button
                onClick={() => deleteMilestone(m.id)}
                className="text-red-400 mt-3 flex gap-1 items-center"
              >
                <Trash2 size={18} /> Delete
              </button>
            )}
              </motion.div>
            );
          })}
        </div>
          </div>
            {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">

            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-cyan-400/30 p-6 rounded-2xl w-full max-w-lg shadow-2xl"
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
                <div key={i} className="flex gap-2 mb-3 items-center">
                <input
                    className="border border-gray-700 bg-gray-800 text-white p-2 w-1/2 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="Achievement"
                    value={ach.name}
                    onChange={(e) => updateAchievement(i, "name", e.target.value)}
                />
                <input
                    className="border border-gray-700 bg-gray-800 text-white p-2 w-1/2 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="GitHub Link"
                    value={ach.github_link}
                    onChange={(e) => updateAchievement(i, "github_link", e.target.value)}
                />

                <button
                    onClick={() => removeAchievement(i)}
                    className="text-red-400 hover:text-red-300 px-2 transition-colors"
                >
                    <X size={20} />
                </button>
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
              className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40"
              onClick={() => setExpandedCard(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.4, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.4, rotateY: -90 }}
              transition={{ 
                type: "spring", 
                stiffness: 150, 
                damping: 25
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="relative max-w-4xl w-full bg-gradient-to-br from-gray-900 via-blue-900/40 to-purple-900/30 border-2 border-cyan-400/70 rounded-3xl shadow-[0_0_120px_rgba(6,182,212,0.6)] p-10 backdrop-blur-2xl">
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-3xl"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                />
                
                <button
                  onClick={() => setExpandedCard(null)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-cyan-500/20 hover:bg-cyan-500/40 transition-all border border-cyan-400/40 group z-10"
                >
                  <X className="w-6 h-6 text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
                </button>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.7)]">
                      <span className="text-3xl font-bold text-white">
                        {milestones[expandedCard].year}
                      </span>
                    </div>
                    <Sparkles className="w-10 h-10 text-cyan-400" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {milestones[expandedCard].title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-200 leading-relaxed mb-8"
                  >
                    {milestones[expandedCard].description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
        <CurvedJourneyTimeline/>
    )
} 
 