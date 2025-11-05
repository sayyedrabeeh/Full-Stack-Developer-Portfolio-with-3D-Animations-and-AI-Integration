import React, { useState, useEffect, useRef } from "react";
import { MessageCircle,X,Send } from "lucide-react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState([
        {
            type: 'bot',
            text: "Hey there! 👋 I'm Sayyed Rabeeh's AI assistant. Ask me anything about Sayyed - from tech skills to favorite food, I know it all!"
        }
    ])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior:'smooth'})
    }

    useEffect(() => {
        scrollToBottom()
    }, [message])
    
    const knowledgeBase = {

        fullName: "Officially, I'm Sayyed Rabeeh.Unofficially, it depends who you ask — Rabeeh, Thangal, Sayyed, or Rabi.",
        nicknames: ["Rabeeh", "Thangal", "Sayyed", "Rabi"],
        dob: "Well… I usually don’t share it with everyone, but you seem special 😌  I was born on 27 March 2004 (21 year old).So yes, I’m a 2K kid Bro — not too old, not too young…  Maturity? Flexible — depends on situation",
        location: "I’m from a   village called Puzhakkattiri near Perinthalmanna in Malappuram, Kerala,india.  but I’m definitely a city-vibe person — I love the energy and opportunities cities bring",
        background: "I am Studied at a religious Arabic college for 9+ years training to become a Hudawi (parents' dream). Did +2 Humanities because that's only they allowed. Then realized 'Life is short, Wi-Fi is fast, and my passion is tech' - so Ctrl+Alt+Exit! Switched to tech 1.5-2 years ago and never looked back.",

    }

    const getBotResponse = (userInput) => {
        const input = userInput.toLowerCase()
        if (
            input.includes("your name") ||
            input.includes("who are you") ||
            input.includes("what is your name") ||
            input.includes("tell me your name") ||
            input.includes("may i know your name") ||
            input.includes("name please") ||
            input.includes("who r u") ||
            input.includes("you are who") ||
            input.includes("identify yourself") ||
            input.includes("what do i call you") ||
            input.includes("can i know your name") ||
            input.includes("what's your name") ||
            input.includes("whats your name") || 
            input.includes("who is this") ||
            input.trim() === "name"
        ) {
            return ` ${knowledgeBase.fullName}`;
        }
        if (
            input.includes("nickname") ||
            input.includes("other name") ||
            input.includes("what should i call you") ||
            input.includes("your nick name") ||
            input.includes("do you have a nickname") ||
            input.includes("any nickname") ||
            input.includes("what are you called") ||
            input.includes("people call you") ||
            input.includes("pet name") ||
            input.includes("short name") ||
            input.includes("your short name") ||
            input.includes("your pet name")
        ) {
            return `People call me different names: ${knowledgeBase.nicknames.join(', ')}. I'm basically a multi-version human release! 😄`;
        }
        if (input.includes('age') || input.includes('old') || input.includes('birth') || input.includes('dob') || input.includes('born')) {
            return `${knowledgeBase.dob}.   🎂`;
        }
        if (
            (input.includes("where") && input.includes("from")) ||
            (input.includes("where") && input.includes("live")) ||
            (input.includes("where") && input.includes("location")) ||
            (input.includes("your") && input.includes("location")) ||
            (input.includes("where") && input.includes("you from")) ||
            input.includes("your city") ||
            input.includes("your town") ||
            input.includes("your place") ||
            input.includes("where do you stay") ||
            input.includes("where do you live") ||
            input.includes("what is your location") ||
            input.includes("which place") ||
            input.includes("which city") ||
            input.includes("which country") ||
            input.includes("your home") ||
            input.includes("hometown") ||
            input.includes("location") ||
            input.includes("place") ||
            input.includes("where are you staying") ||
            input.includes("where are you located") ||
            input.includes("share your location") ||
            input.includes("drop location") ||
            input.includes("current location") ||
            input.includes("present location") ||
            input.includes("situated")
        ) {
            return knowledgeBase.location;
        }
        if (input.includes('background') || input.includes('story') || input.includes('humanities') || input.includes('religious') || input.includes('college')) {
            return knowledgeBase.background;
        }


    } 
    
    const handleSend = () => {
        
        if (!input.trim()) return 
        const userMessage = { type: 'user', text: input }
        setMessage(prev => [...prev, userMessage])
        
        setTimeout(() => {
            const botResponse = { type: 'bot', text: getBotResponse(input) }
            setMessage(prev =>[...prev,botResponse])
        }, 500)
        setInput('')

    }

    const handleKeyPress = (e) => {
        
        if (e.key === 'Enter') {
            handleSend()
        }

    }





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
                                        className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
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
                                        <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
 
                        <div className="p-4 bg-gradient-to-r from-gray-900 to-black border-t border-purple-500/20">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    className="flex-1 p-3 bg-gray-800/50 border border-purple-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-100 placeholder-gray-500 backdrop-blur-sm"
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
            `}</style>
        </>
)}