import React, { useState, useEffect, useRef } from "react";
import { MessageCircle,X,Send } from "lucide-react";
 

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [isTyping, setIsTyping] = useState(false);
    const [message, setMessage] = useState([
        {
            type: 'bot',
            text: "Hey there! 👋 I'm Sayyed Rabeeh's AI assistant. Ask me anything about Sayyed - from tech skills to favorite food, I know it all!"
        }
    ])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef(null)
 
    const textareaRef = useRef(null);
 
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior:'smooth'})
    }

    useEffect(() => {
        scrollToBottom()
    }, [message])

    const SYSTEM_PROMPT = `You are Sayyed Rabeeh's personal AI assistant. You're friendly, helpful, and know everything about him. 

        IMPORTANT PERSONALITY TRAITS:
        - Be conversational and casual (use emojis occasionally)
        - Keep responses concise but informative
        - Show enthusiasm when talking about his projects
        - Be honest when you don't have specific information

        ABOUT SAYYED RABEEH:

        BASIC INFO:
        - Full Name: Sayyed Rabeeh (also called Rabeeh, Thangal, Sayyed, or Rabi)
        - Age: 21 years old (born March 27, 2004)
        - Location: Puzhakkattiri village near Perinthalmanna, Malappuram, Kerala, India
        - Contact: Email: sayyedrabeehom240@gmail.com | Phone/WhatsApp: 9207286895
        - Links: GitHub: github.com/sayyedrabeeh | LinkedIn: linkedin.com/in/sayyed-rabeeh | LeetCode: leetcode.com/u/sayyed-rabeeh

        BACKGROUND:
        - Studied at religious Arabic college for 9+ years (parents' dream to become Hudawi)
        - Took +2 Humanities (only option available)
        - Switched to tech 1.5-2 years ago - best decision ever!
        - Currently training at Brototype (Kerala's #1 IT bootcamp)
        - Has 1.5 years of hands-on development experience
        - 1,000+ GitHub commits
        - Built 30+ projects

        TECH SKILLS:
        Primary Stack: Full Stack Developer - Python/Django/React
        - Python: Intermediate level, builds real-world projects confidently
        - Django: Built 10+ projects, expert in Django REST Framework
        - React: Built 10+ projects, modern UI specialist
        - Node.js/Express: Doesn't know yet, but confident can learn fast
        - Databases: PostgreSQL (primary), MySQL and MongoDB (basic level)
        - CSS: Tailwind CSS (favorite), retired Semantic UI
        - Docker: Used in TaleTailor project, understands fundamentals
        - Git/GitHub: Daily user since start, 1,000+ commits
        - Cloud: AWS (EC2, S3), also uses Render, Railway, Vercel
        - APIs: Strong REST API experience, GraphQL not much yet
        - TypeScript: On the learning list

        TOP PROJECTS:
        1. TaleTailor - AI-powered storytelling platform with social features. Generates stories using AI, real-time collaboration (WebSockets), mood-based theming, reactions, comments. Like Wattpad + AI + Social platform. GitHub: github.com/sayyedrabeeh/taletailor

        2. ResuMatch - Resume & job-hunting assistant. Analyzes resumes, matches with jobs, scores them, suggests improvements, 100+ HR questions, chatbot for interview practice. Django + React + Tailwind. GitHub: github.com/sayyedrabeeh/resume-ai-

        3. AI Sketch Studio - Converts images to 14 artistic styles (pencil, watercolor, oil painting). Django + OpenCV with drag-and-drop UI. GitHub: github.com/sayyedrabeeh/artist

        4. Virtual Painter - Interactive painting app using hand gestures via OpenCV & MediaPipe. Draw in air with webcam or mouse. 17 GitHub stars. GitHub: github.com/sayyedrabeeh/virtual-painter

        5. Jarvis AI - Desktop voice assistant. Speech recognition, plays music, Wikipedia, opens sites. GitHub: github.com/sayyedrabeeh/jarvis-ai

        6. Full-Stack Portfolio - Production-level project with Django + React, Tailwind + Framer Motion, Matter.js & Three.js for 3D/physics, JWT auth.

        CAREER & WORK:
        - Looking for: Full-Stack roles (preferred), Backend, or Frontend positions
        - Work Preference: On-site (not remote, not hybrid in Kerala)
        - Company Type: Prefers startups first, then mid-sized. Product-based companies only, not service-based
        - Dream Companies: FAANG (Google, Meta, Amazon, Apple, Netflix)
        - Career Goal: Build something big - a tech product or company. Billionaire ambitions included 😎

        PERSONAL:
        - Hobbies: Movies (high-voltage like KGF, Salaar, Baahubali), music (mood-based playlist)
        - Gaming: Loves chess, occasional video games
        - Sports: Interested in dance, karate, fitness (plans to train when settled)
        - Creative: Simple nature sketching for relaxation
        - Travel: Wants to explore the world once career is stable
        - Favorite Language: Python (first love), React (close second)
        - Coffee/Tea: Prefers tea, but doesn't rely much on either
        - Food: Loves experimenting, plans to try everything once financially stable
        - Schedule: Night owl by nature, but family enforces morning routine
        - IDE: VS Code (lightweight, customizable, perfect for full-stack)
        - OS: Dreams of Mac, currently uses Windows (finance said no 😅)
        - Tech Channels: Fireship, Traversy Media, Tech With Tim, Code With Harry, freeCodeCamp
        - Tabs vs Spaces: Spaces always! Consistency matters.

        CHALLENGING EXPERIENCES:
        Most frustrating project was his portfolio - accidentally duplicated login component file. Kept editing wrong file, deployment wasn't updating. Taught him importance of folder architecture, naming conventions, and systematic debugging.

        RESPONSE GUIDELINES:
        - If asked about skills/projects, mention specific ones with GitHub links
        - If asked about contact, provide email, phone, and LinkedIn
        - If asked about work, mention he's actively looking and his preferences
        - If question is unclear, ask for clarification
        - If you don't know something specific, be honest but helpful
        - Keep responses natural and conversational
        - Use markdown for links when sharing URLs

        Now respond to user queries as Sayyed Rabeeh's personal AI assistant! Be conversational, use emojis, keep answers concise`;


    
    const getGeminiResponse = async (userInput) => {
        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                
                                {
                                    text : SYSTEM_PROMPT
                                },
                                {
                                    text: `User : ${userInput}\n\nAssistant:`
                                }
                            ]
                        }
                    ],
                     generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800,
                        topP: 0.9,
                        topK: 40
                    }
                })
            })
            if (!response.ok) {
                throw new Error(`Api Error : ${response.status}`)
            }
            const data = await response.json()
            const aiResponse = data.candidates[0].content.parts[0].text
            return aiResponse
        
        } catch (error) {
            console.log('Gemni api error', error)
         return `😅 Oops! I'm having a moment. My AI brain needs a quick reboot. Try asking again, or reach out directly:\n\n📧 Email: sayyedrabeehom240@gmail.com\n📱 WhatsApp: 9207286895`   
        }
        

     }
     
 
    
     const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { type: 'user', text: input };
        setMessage(prev => [...prev, userMessage]);
        const userInput = input;
        setInput("");
        setIsTyping(true);  

        try {
            let botReply = await getGeminiResponse(userInput);

            const delay = Math.min(2000, 500 + botReply.length * 20)

            setTimeout(() => {
                const botMessage = { type: "bot", text: botReply };
                setMessage(prev => [...prev, botMessage]);
                setIsTyping(false);
            }, delay)
 

            if (botReply?.action === "clear") {
            setTimeout(() => {
                setMessage([{ type: "bot", text: "Chat cleared" }]);
                setIsTyping(false);
            }, 800); 
            return;
            }

            if (botReply?.action === "close") {
            setTimeout(() => {
                setIsOpen(false);
                setIsTyping(false);
            }, 800);
            return;
            }
 
       

            

        } catch (err) {
            console.error("Bot error:", err);
            setMessage(prev => [...prev, { type: "bot", text: "Something went wrong!" }]);
            setIsTyping(false);
        }
        };



    const handleKeyPress = (e) => {
        
 
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }else {
        setTimeout(resizeTextarea, 0);
    }
    }
    const resizeTextarea = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
        }
    };

    useEffect(() => {
     resizeTextarea();
    }, [input]);
 
  



    return (
         <>
            <button onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 bg-gray-900 rounded-full shadow-2xl  hover:shadow-xl hover: shadow-purple-500/20 ring-1 ring-gray-700 transition-all duration-300 ease-out hover:scale-110 hover:ring-purple-500/50
                z-50  ${ isOpen ? 'hidden':'flex' } items-center justify-center p-1.5 group overflow-hidden  `}
            >
                <img
                    src="/images/rabi2.jpg"
                    alt="sayyed rabeeh"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-800 shadow-lg "
                />
    <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>

            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-gradient-to-b from-gray-900 via-gray-900 to-black shadow-2xl z-50 flex flex-col animate-slide-in border-l border-purple-500/20">
                        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-5 flex items-center justify-between relative overflow-hidden">
                            <div className="absolute inset-0 bg-black opacity-20"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="relative">
                                <img
                                src="/images/rabi2.jpg"
                                alt="Sayyed Rabeeh"
                                className="relative w-14 h-14 rounded-full object-cover border-2 border-white/70" 
                                />
                                 </div>
                                <div>
                                    <h2 className="font-bold text-lg">Sayyed Rabeeh</h2>
                                    <p className="text-xs text-blue-100 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Online • Full Stack Dev
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/20 p-2 rounded-full transition relative z-10"
                            >
                                <X size={24} />
                            </button>
                        </div>
 
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-black">
                            {message.map((msg, idx) => (
                                <div 
                                    key={idx}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                                >
                                    <div 
                                        className={`max-w-[85%] p-3 rounded-2xl backdrop-blur-sm ${
                                            msg.type === 'user' 
                                                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-br-none shadow-lg shadow-purple-500/30' 
                                                : 'bg-gray-800/80 text-gray-100 rounded-bl-none border border-purple-500/20 shadow-lg'
                                        }`}
                                    >
                                     <p
                                    className="text-sm whitespace-pre-line leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: msg.text }}
                                        ></p>
                                      
                                    </div>
                                </div>
                            ))}
                           
                            {isTyping && <p className="bot-typing  flex items-center gap-2 bg-cyan-500/10 text-cyan-400 text-sm font-medium px-4 py-2 rounded-xl w-fit mt-3 shadow-md backdrop-blur-sm animate-pulse" >RabiBot is typing<span className="dot">...</span></p>}


                            <div ref={messagesEndRef} />
                        </div>
 
                        <div className="p-4 bg-gradient-to-r from-gray-900 to-black border-t border-purple-500/20">
                            <div className="flex gap-2">
 
                                <textarea
                                    value={input}
                                    ref={textareaRef}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask me anything...."
                                    className="flex-1 p-3 bg-gray-800/50 border border-purple-500/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-gray-100 placeholder-gray-500 backdrop-blur-sm"
                                    rows={1}
                                    style={{ minHeight: '44px', maxHeight: '120px' }}
                                    />
 
                                <button
                                    onClick={handleSend}
                                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-3 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <style>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .dot::after {
                content: '';
                animation: dots 1s steps(5, end) infinite;
                }
                @keyframes dots {
                0%, 20% { content: ''; }
                40% { content: '.'; }
                60% { content: '..'; }
                80%, 100% { content: '...'; }
                }
            `}</style>
        </>
)}