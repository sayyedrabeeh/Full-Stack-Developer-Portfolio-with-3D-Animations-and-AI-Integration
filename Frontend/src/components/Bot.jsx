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

        fullName: "Sayyed Rabeeh (also called Rabeeh, Thangal, Sayyed, or Rabi - multi-version human release 😄)",


    }

    const getBotResponse = (userInput) => {
        const input = userInput.toLowerCase()
        if (input.includes('your name') || input.includes('who are you') || input === 'name') {
            return `I am ${knowledgeBase.fullName}`
        }

    } 
    
    const handleSend = () => {
        
        if (!input.trim()) return 
        const userMessage = { type: 'user', text: 'text' }
        setMessage(prev => [...prev, userMessage])
        
        setTimeout(() => {
            const botResponse = { type: 'bot', text: getBotResponse(input) }
            setMessage(prev =>[...prev,botResponse])
        }, 500)
        setInput('')

    }

    const handleKeyPress = (e) => {
        
        if (e.key === 'enter') {
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
                    <div className="fixed inset-0  bg-black bg-opacity-70 z-40 transition-opacity  backdrop-blur-sm " onClick={() => isOpen(false)} />
                    
                    <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-gradient-to-b from-gray-900 via-gray-900 to-black  shadow-2xl z-50 flex flex-col animate-slide-in  border-l border-purple-500/20  " >
                        <div className="bg-gradient-to-r  from-blue-600 via-purple-600 to-pink-600 text-white p-5 flex  items-center justify-between relative overflow-hidden " >
                            <div className="absolute inset-0 bg-black opacity-20 " ></div>
                            <div className="flex items-center gap-3 relative z-10" >
                                <div className="relative">
                                    <img
                                        src="/images/rabi2.jpg"
                                        alt="sayyed rabeeh "
                                        className="w-12 h-12 rounded-full border-2 border-white shadow-lg" />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                                </div>

                                <div>
                                    <h2 className="font-bold text-lg " >Sayyed Rabeeh</h2>
                                    <p className="text-xs text-blue-100 flex items-center gap-1" >
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pluse  " ></span>
                                        Online • Full Stack Dev
                                    </p>
                                </div>
                            </div>


                            <button onClick={() => setIsOpen(false)}
                                className="hover: bg-white/20  p-2 rounded-full transition relative z-10 ">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-black">

                            {message.map((msg, idx) => (
                                <div key={idx}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}  animate-fade-in `}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl backdrop-blur-sm ${msg.type === 'user' ?
                                        'bg-gradient-to-r from-bg-600 via-purple-600 to-pink-600 text-white rounded-br-none shadow-lg shadow-purple-500/30 ' :
                                        'bg-gray-800-80 text-gray-100  rounded-bl-none border border-purple-500/20 shadow-lg'
                                        }`}>
                                        
                                        <p className="text-sm whitespace-pre-line leading-relaxed ">{ msg.text }</p>

                                    </div>

                                </div>
                            )) }

                            <div ref={messagesEndRef}/>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-gray-900 to-black border-t border-purple-500/20">
                        
                            <div className="flex gap-2">
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything " 
                                    className="flex-1 p-3 bg-gray-800/50 border border-purple-500/30  rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-100 placeholder-gray-500 backdrop-blur-sm "
                                />
                                <button onClick={handleSend} className="ng-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-3 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105  " >
                                    <Send size={20}/>
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