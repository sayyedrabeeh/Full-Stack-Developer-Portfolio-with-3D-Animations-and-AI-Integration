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

    const github = `<a href="https://github.com/sayyedrabeeh" target="_blank"  rel="noopener noreferrer" class="text-blue-500 font-semibold underline hover:text-blue-700 transition duration-200">github.com/sayyedrabeeh</a>`
    
    const knowledgeBase = {

        fullName: "Officially, I'm Sayyed Rabeeh.Unofficially, it depends who you ask — Rabeeh, Thangal, Sayyed, or Rabi.",
        nicknames: ["Rabeeh", "Thangal", "Sayyed", "Rabi"],
        dob: "Well… I usually don’t share it with everyone, but you seem special 😌  I was born on 27 March 2004 (21 year old).So yes, I’m a 2K kid Bro — not too old, not too young…  Maturity? Flexible — depends on situation",
        location: "I’m from a   village called Puzhakkattiri near Perinthalmanna in Malappuram, Kerala,india.  but I’m definitely a city-vibe person — I love the energy and opportunities cities bring",
        background: "I am Studied at a religious Arabic college for 9+ years training to become a Hudawi (parents' dream). Did +2 Humanities because that's only they allowed. Then realized 'Life is short, Wi-Fi is fast, and my passion is tech' - so Ctrl+Alt+Exit! Switched to tech 1.5-2 years ago and never looked back.",
        transitionStory: "Honestly, Humanities and I were never a love story — we were more like an arranged marriage that I didn’t sign up for 😅I studied at a religious Arabic college, and there the only option was Humanities. So I took it, not because I loved it, but because… well, no Ctrl+Z in real life 😂But deep down, I was always a tech person —the kid who preferred computers over textbooks, circuits over poetry, and coding over calligraphy.One day I realized:“If I'm going to spend my life working hard,I should at least work hard on something I love.”So I switched to tech, and honestly?Best plot twist of my life. Now I'm building things, learning fast, and loving every moment.In short —Forced into Humanities, chosen by Tech. And I’m happily taken now.",
        qualification: "+2 Humanities (haven't taken degree yet, plan to soon)",
        currentStatus: "Student at Brototype, the No.1 IT bootcamp in Kerala. Training like it's a full-time job!",
        codingExperience: "I have around 1.5 years of hands-on development experience — built through serious self-learning, bootcamp training, and working on real‐world personal projects , 1,000+ GitHub commits,   and practical problem-solving experience.No company tag yet, but trust me…I’ve written enough code, fixed enough bugs,  enough deployments to count as real-world experience 😌💪In short:Not “corporate experience” yet —but practical,problem-solving experience?✅ Absolutely.And now I’m ready to bring that same energy to a professional team ",
        primaryStack: "Full Stack Developer - Python, Django, React",
        pythonLevel: "I'd call myself an intermediate Python developer.I can Build real-world projects Turn “why isn’t this working???” code into “oh wow it runs!” code 😌 Solve problems and debug confidently Work with frameworks like Django & automation tools Write clean code that future-me doesn't fight with  I'm not calling myself an expert yet — Python gurus can probably write code in their sleep.I still need internet + ai tools + Stack Overflow…  If you check my GitHub, you’ll get a clear picture of my journey & progress Growing every day, writing better code every night — Intermediate now, future expert loading…",
        django: `I’ve built quite a lot of Django projects over time — some purely for practice and experimentation,some backend + templates full–stack,and some full–stack with Django + React.Not every project reached GitHub (some were beautiful disasters from my learning phase 😅),but the polished ones are there if you want check — 👉  ${github} So yeah, I’ve been coding, breaking, fixing, and learning continuously…and if you ask how many Django projects I've actually built?Let’s just say… around 10 and more not know exact .`,
        react: "I’ve built quite a good number of React projects too — not as many as Django, since I started with Django + HTML first,and later moved into the React world.Some were experiments, some were serious full-stack builds,some are on GitHub, some are…well, hiding in my old folders like secret missions 😅If you check my GitHub, you'll get the exact count —but yeahhh,i think around 10+ React projects too.",


        
    
    }

    const getBotResponse = (userInput) => {
        const input = userInput.toLowerCase().trim().replace(/\s+/g, " ").replace(/[?.,!]/g, "");
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
        if ((input.includes('background') || input.includes('story') || input.includes('humanities') || input.includes('religious') || input.includes('college'))
        && !input.includes("python")
        && !input.includes("react")
        && !input.includes("django")) {
            return knowledgeBase.background;
        }
        if (input.includes('why tech') || input.includes('transition') || input.includes('switch')) {
            return knowledgeBase.transitionStory;
        }
        if (
            input.includes("why tech") ||
            input.includes("why did you choose tech") ||
            input.includes("why choose tech") ||
            input.includes("why you choose tech") ||
            input.includes("why you selected tech") ||
            input.includes("why tech field") ||
            input.includes("why tech industry") ||
            input.includes("love tech") ||
            input.includes("passion for tech") ||
            input.includes("interest in tech") ||
            input.includes("why into tech") ||
            input.includes("how you got into tech") ||
            input.includes("how you entered tech") ||
            input.includes("tech journey") ||
            input.includes("field change") ||
            input.includes("career change") ||
            input.includes("career switch") ||
            input.includes("switch to tech") ||
            input.includes("transition to tech") ||
            input.includes("shift to tech") ||
            input.includes("move to tech") ||
            input.includes("why transition") ||
            input.includes("why switched") ||
            input.includes("why shift") ||
            input.includes("why it") ||
            input.includes("non tech to tech") ||
            input.includes("coming from non tech") ||
            input.includes("non background to tech") ||
            input.includes("your background to tech") ||
            input.includes("why programming") ||
            input.includes("why coding") ||
            input.includes("why software") ||
            input.includes("why developer") ||
            input.includes("what made you choose tech") ||
            input.includes("what inspired you to choose tech") ||
            input.includes("why engineering") ||
            input.includes("why it field") ||
            input.includes("why software field")
        ) {
            return knowledgeBase.transitionStory;
        }
   
        if (input.includes("clear") && input.includes("chat")) {
            return { action: "clear" };
        }
    
        if (input.includes("close") && input.includes("chat")) {
            return { action: "close" };
        }
        if (input.includes('when') && input.includes('started') && (input.includes('coding') || input.includes('programming'))) {
            return "I started coding around 1.5 to 2 years ago.Basically, one fine day I quit my religious Arabic college, packed my dreams, and walked straight into a bootcamp… and never looked back 💻✨Since then, it’s been non-stop coding, learning, breaking things, fixing them again, and leveling up every single day.You can say my journey started with:“Bismillah… console.log('Hello World');” 😌🤣And honestly? That was the day life changed — I switched from memorizing texts to building stuff the world can actually use. Best decision ever.";
        }
        if (input.includes('qualification') || input.includes('education') || input.includes('degree') || input.includes('study')) {
            return knowledgeBase.qualification;
        }
        if (input.includes('current') && (input.includes('study') || input.includes('work') || input.includes('doing'))) {
            return knowledgeBase.currentStatus;
        }
        
        if (
        (
            input.includes("experience") ||
            input.includes("experiences") ||
            input.includes("exp") ||
            input.includes("how long") ||
            input.includes("how many years") ||
            input.includes("years") ||
            input.includes("developing") ||
            input.includes("coding") ||
            input.includes("programming") ||
            input.includes("since when") ||
            input.includes("started coding") ||
            input.includes("started programming") ||
            input.includes("background")
        )
        && !input.includes("python")
        && !input.includes("react")
        && !input.includes("django")

        ) {
            return knowledgeBase.codingExperience;
        }
        if (input.includes('skill') || input.includes('tech stack') || input.includes('technology')) {
            return `${knowledgeBase.primaryStack}. I work with Django, React, PostgreSQL, Tailwind, Docker, AWS, REST APIs, and more! Full-stack specialist 💪`;
        }
        
        if (
        input.includes("python") ||
        input.includes("pyhton") ||  
        input.includes("py") ||
        input.includes("your python") ||
        input.includes("python level") ||
        input.includes("python skills") ||
        input.includes("python experience") ||
        input.includes("python expert") ||
        input.includes("python dev") ||
        input.includes("python developer") ||
        input.includes("know python") ||
        input.includes("can you code python") ||
        input.includes("python knowledge") ||
        input.includes("how good are you in python") ||
        input.includes("strong in python") ||
        input.includes("python proficiency") ||
        input.includes("python ability") ||
        input.includes("python rating") ||
        input.includes("python background")
        ) {
            return `${knowledgeBase.pythonLevel} Check my GitHub: ${github}`;
        }
        if (
            input.includes("django") ||
            input.includes("dangoo") || 
            input.includes("djanngo") ||
            input.includes("djngo") ||
            input.includes("dnago") ||
            input.includes("djang") ||
            input.includes("python django") ||
            input.includes("django experience") ||
            input.includes("django projects") ||
            input.includes("django level") ||
            input.includes("django skills") ||
            input.includes("django dev") ||
            input.includes("know django") ||
            input.includes("can you do django") ||
            input.includes("django proficiency") ||
            input.includes("strong in django") ||
            input.includes("django background") ||
            input.includes("django developer") ||
            input.includes("django expert") ||
            input.includes("django rating") ||
            input.includes("how good in django") ||
            input.includes("django knowledge") ||
            input.includes("django framework")
        ) {
            return `${knowledgeBase.django}`;
        }
        if (
        input.includes("react") ||
        input.includes("recat") ||
        input.includes("raect") ||
        input.includes("reactjs") ||
        input.includes("react js") ||
        input.includes("recat js") ||
        input.includes("reaact") ||
        input.includes("ract") ||
        input.includes("recat") ||
        input.includes("react developer") ||
        input.includes("react dev") ||
        input.includes("react engineer") ||
        input.includes("react projects") ||
        input.includes("react experience") ||
        input.includes("react apps") ||
        input.includes("build react") ||
        input.includes("can you do react") ||
        input.includes("know react") ||
        input.includes("react knowledge") ||
        input.includes("react skills") ||
        input.includes("react level") ||
        input.includes("react proficiency") ||
        input.includes("react expertise") ||
        input.includes("react background") ||
        input.includes("react strong") ||
        input.includes("strong in react") ||
        input.includes("how good in react") ||
        input.includes("react rating") ||
        input.includes("react framework") ||  
        input.includes("frontend react") ||
        input.includes("react frontend") ||
        input.includes("react proficiency") ||
        input.includes("react role") ||
        input.includes("react knowledge level")
    ) {
        return `${knowledgeBase.react} You can explore projects here: ${github}; `;
    }





    } 
    
    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { type: 'user', text: input };
        setMessage(prev => [...prev, userMessage]);
        const userInput = input; 
        setInput(""); 
        setTimeout(() => {
            const botReply = getBotResponse(userInput);
            if (botReply?.action === "clear") {
                setMessage([
                    { type: "bot", text: "Chat cleared ✅" }
                ]);
                return;
            }
            if (botReply?.action === "close") {
                setIsOpen(false);
                return;
            }
            let textResponse = botReply?.text || botReply;
            const botMessage = { type: "bot", text: textResponse };
            setMessage(prev => [...prev, botMessage]);
            
        }, 500);
    };


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
                                     <p
                                    className="text-sm whitespace-pre-line leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: msg.text }}
                                    ></p>

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