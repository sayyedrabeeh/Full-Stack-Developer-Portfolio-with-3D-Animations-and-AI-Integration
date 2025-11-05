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
        nodeExpress: "To be honest — I don’t know Node.js or Express yet.Not even a single line But here’s the thing:I learned Python, Django, and React completely through self-study,so if I decide to pick up Node & Express,’m confident I can learn it pretty fast Tech is just logic — once you know how to learn,new stacks are just another level in the game.",
        docker: `Yes — I’ve worked with Docker in one of my projects, TaleTailor (an AI-powered storytelling platform with social features). I containerized the application as part of the deployment flow.I'm not a Docker Guru yet, but I understand the fundamentals:- Writing Dockerfiles  - Building & running containers  - Understanding images & layers  - Docker Compose basics  I can confidently work with Docker, and if deeper Docker magic is needed, I'll dive in fast 🚀  You can check the project here: <a href="https://github.com/sayyedrabeeh/taletailor" target="_blank" rel="noopener noreferrer" class="text-blue-500 font-semibold underline hover:text-blue-700 transition duration-200">github.com/sayyedrabeeh/taletailor</a>`,        
        git: "I’ve been using Git and GitHub since the start of my developer journey —  one  and half yer plus now. I use Git daily for version control, branching, merging, resolving conflicts, and collaborating on projects.Also, fun fact: I  crossed 1,000+ GitHub commits — so you could say git is part of my everyday muscle memory now.😌🔥",
        cloud: "My first real deployment was on AWS — I set up EC2, S3 for static files, and got my app live there. After that, I explored Render, Railway, and Vercel for hosting other projects (mostly because… let's be honest… they are free and AWS is not 🤝💸).So yes — I’ve worked with AWS, but I also know how to survive in the “developer on a budget” world too",
        apis: "I have strong REST API experience — I build backend APIs using Django REST Framework and integrate them with React frontends in full-stack projects.GraphQL? Haven’t used it much yet — REST keeps me pretty happy for now — but if a project needs GraphQL, I’ll pick it up fast (just like I did with Django & React)",
        typescript: " I’ve been working mostly with JavaScript so far.But TypeScript is definitely on my list, and with my habit of self-learning , I’m confident I can pick it up quickly when needed.",
        css: "I am  actively use Tailwind CSS, and it has become my favorite for building fast, modern UI. I’ve also used Semantic UI in the past (RIP to that era 😅 — it's outdated now so I retired it from my toolkit).Currently, I prefer Tailwind + custom components, and I’m exploring component libraries.",
        databases: "PostgreSQL (primary) i know well,I’ve worked with MySQL and MongoDB, but only at a basic level so far.I can perform core operations and build functional DB structures,but I wouldn’t claim “deep expertise” yet.That said, learning new tools is kind of my hobby at this point — so if the project needs it, give me a little time and I'll level up fast",

        projects: {
            resumatch: "ResuMatch - Resume & job-hunting assistant. Analyzes resumes, matches with jobs, scores them, suggests improvements, 100+ HR questions, chatbot for interview practice. Django + React + Tailwind",
            taletailor: "TaleTailor - AI-powered storytelling platform with social features. Generate stories, real-time collaboration (WebSockets), mood-based theming, reactions, comments, chat, share as PDF. Like Wattpad + AI + Social platform",
            jarvis: "Jarvis AI - Desktop voice assistant inspired by Marvel. Speech recognition, plays music, Wikipedia, calculations, opens YouTube/sites, jokes. Better listener than some humans 😌",
            viAssistant: "VI Assistant - Web-based JARVIS chatbot. Django-powered, performs searches, opens sites, plays media. Live at jarvis-ai-2nfc.onrender.com",
            gestureGames: "Multiple gesture-controlled games: Dino Runner (hand controls Chrome dino), Doctor Strange Simulator (hand gestures for shields/portals), Virtual Painter (air-pen drawing), Gesture Game Controller (human joystick for Subway Surfers/Temple Run). Python + OpenCV + MediaPipe",
            aiSketch: "AI Sketch Studio - Converts images to artistic styles (pencil, watercolor, oil). Django + OpenCV with drag-and-drop UI",
            portfolio: "Full-Stack Portfolio - Production-level project with Django + React, Tailwind + Framer Motion, Matter.js & Three.js for 3D/physics, JWT auth, email verification. Represents personality and skills"
        },
        


    }

    const getBotResponse = (userInput) => {

        const input = userInput.toLowerCase().trim().replace(/\s+/g, " ").replace(/[?.,!]/g, "");

        if (/\b(your name|who are you|what is your name|tell me your name|may i know your name|name please|who r u|you are who|identify yourself|what do i call you|can i know your name|what's your name|whats your name|who is this|name)\b/i.test(input.trim())) {
            return `${knowledgeBase.fullName}`;
        }

        if (/\b(nickname|other name|what should i call you|your nick name|do you have a nickname|any nickname|what are you called|people call you|pet name|short name|your short name|your pet name)\b/i.test(input)) {
            return `People call me different names: ${knowledgeBase.nicknames.join(', ')}. I'm basically a multi-version human release! 😄`;
        }

        if (input.includes('age') || input.includes('old') || input.includes('birth') || input.includes('dob') || input.includes('born')) {
            return `${knowledgeBase.dob}.   🎂`;
        }
        if (/\b(where\s+(?:are\s+)?(?:you|u|i)?\s*(?:from|live|located|staying|do\s+you\s+stay|do\s+you\s+live)?|your\s+(?:city|town|place|home|location)|hometown|which\s+(?:place|city|country)|current\s+location|present\s+location|share\s+your\s+location|drop\s+location|situated|location|place)\b/i.test(input)) {
            return knowledgeBase.location;
        }

        if (/\b(background|story|humanities|religious|college)\b/i.test(input) && !/\b(python|react|django)\b/i.test(input)) {
            return knowledgeBase.background;
        }

        if (input.includes('why tech') || input.includes('transition') || input.includes('switch')) {
            return knowledgeBase.transitionStory;
        }
        if (/(why tech|why did you choose tech|why choose tech|why choose it|why you choose tech|why you selected tech|why tech field|why tech industry|love tech|passion for tech|interest in tech|why into tech|how you got into tech|how you entered tech|tech journey|field change|career change|career switch|switch to tech|transition to tech|shift to tech|move to tech|why transition|why switched|why shift|why it|non tech to tech|coming from non tech|non background to tech|your background to tech|why programming|why coding|why software|why developer|what made you choose tech|what inspired you to choose tech|why engineering|why it field|why software field)/i.test(input)) {
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
        
        if (/\b(experience|experiences|exp|how long|how many years|years|developing|coding|programming|since when|started coding|started programming|background)\b/i.test(input) 
            && !/\b(python|react|django)\b/i.test(input)) {
            return knowledgeBase.codingExperience;
        }

        if (input.includes('skill') || input.includes('tech stack') || input.includes('technology')) {
            return `${knowledgeBase.primaryStack}. I work with Django, React, PostgreSQL, Tailwind, Docker, AWS, REST APIs, and more! Full-stack specialist 💪`;
        }
        
        if (/\b(python|pyhton|py|your python|python level|python skills|python experience|python expert|python dev|python developer|know python|can you code python|python knowledge|how good are you in python|strong in python|python proficiency|python ability|python rating|python background)\b/i.test(input)) {
            return `${knowledgeBase.pythonLevel} Check my GitHub: ${github}`
        };

        if (/\b(django|dangoo|djanngo|djngo|dnago|djang|python django|django experience|django projects|django level|django skills|django dev|know django|can you do django|django proficiency|strong in django|django background|django developer|django expert|django rating|how good in django|django knowledge|django framework)\b/i.test(input)) {
            return `${knowledgeBase.django}`
        };

        if (/\b(react|recat|raect|reactjs|react js|recat js|reaact|ract|react developer|react dev|react engineer|react projects|react experience|react apps|build react|can you do react|know react|react knowledge|react skills|react level|react proficiency|react expertise|react background|react strong|strong in react|how good in react|react rating|react framework|frontend react|react frontend|react role|react knowledge level)\b/i.test(input)) {
            return `${knowledgeBase.react} You can explore projects here: ${github};`
        };

        if (/\b(node|nodejs|node js|node\.js|node express|node and express|express|expressjs|express js|express\.js|nide|nod|notejs|nodej|nod js|nod express|expres|exprss|exprees|know node|know express|learn node|learn express|node skills|express skills|node level|express level|node experience|express experience|how good in node|how good in express|node projects|express projects|node developer|express developer|do you know node|do you know express|can you do node|can you do express|worked with node|worked with express)\b/i.test(input)) {
            return knowledgeBase.nodeExpress
        };

        if (/\b(docker|dockerfile|docker file|docker compose|docker-compose|doker|docer|dokar|dcker|dockr|dockerz|docker skills|docker experience|know docker|can you use docker|used docker|how good in docker|docker level|docker knowledge|docker expert|learn docker|using docker)\b/i.test(input)) {
            return knowledgeBase.docker;
        } 
        if (/\b(git|github|githhub|git hub|guthub|giithub|gitlab|version control|know git|use git|git skills|git experience|git level|git proficiency|git workflow|git knowledge|git rating|git background|github experience|github profile|github projects|github link|github repo|github repository|github commits)\b/i.test(input)) {
            return `${knowledgeBase.git}. Check my GitHub: ${github}`;
        }

        if (
        /\b(cloud hosting|cloud experience|cloud services|cloud platforms|amazon web services|aws ec2|aws s3|aws deployment|server deploy|production deploy|how do you deploy|production server|free hosting|deploy app|upload project online|go live|make website live|publish project|cloud|aws|ec2|s3|host|hosting|deploy|deployed|deployment|deploying|render|railway|vercel)\b/i
        .test(input)
        ) {
            return knowledgeBase.cloud;
        }
        if (/\b(api|rest|graphql|rest api|graphql api|restful|restful api|api development|api experience|build api|develop api|backend api|api skills|api knowledge)\b/i.test(input)) {
            return knowledgeBase.apis;
        }
        if (/\b(typescript|ts|type script|type-sript|typscript|tye script|ts lang)\b/i.test(input)) {
            return knowledgeBase.typescript;
        }
        if (/\b(css|tailwind|tailwind css|bootstrap|semantic ui|styling|ui framework|component library|material ui|material-ui)\b/i.test(input)) {
            return knowledgeBase.css;
        }
        if (/\b(database|databases|db|postgres|postgresql|mysql|mongo|mongodb|nosql|relational database|sql database|db experience)\b/i.test(input)) {
            return knowledgeBase.databases;
        }
        if (input.includes('skill') || input.includes('tech stack') ||input.includes('tech')||input.includes('stack')|| input.includes('technology')) {
            return `${knowledgeBase.primaryStack}. I work with Django, React, PostgreSQL, Tailwind, Docker, AWS, REST APIs, and more! Full-stack specialist 💪`;
        }
        if (input.includes('resumatch') || input.includes('resume')) {
            return `ResuMatch: ${knowledgeBase.projects.resumatch}`;
        }
        if (input.includes('taletailor') || input.includes('story maker') || input.includes('storytelling')) {
            return `TaleTailor: ${knowledgeBase.projects.taletailor}`;
        }
        if (input.includes('jarvis') || input.includes('voice assistant')) {
            return `${knowledgeBase.projects.jarvis}`;
        }
        if (input.includes('vi assistant')) {
            return `${knowledgeBase.projects.viAssistant}`;
        }
        if (input.includes('gesture') || input.includes('game control') || input.includes('hand control')) {
            return `${knowledgeBase.projects.gestureGames}`;
        }
        if (input.includes('ai sketch') || input.includes('artist')) {
            return `${knowledgeBase.projects.aiSketch}`;
        }
        if (input.includes('portfolio') && input.includes('project')) {
            return `${knowledgeBase.projects.portfolio}`;
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