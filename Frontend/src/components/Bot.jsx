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
 
    const textareaRef = useRef(null);
 

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior:'smooth'})
    }

    useEffect(() => {
        scrollToBottom()
    }, [message])

    const github = `<a href="https://github.com/sayyedrabeeh" target="_blank"  rel="noopener noreferrer" class="text-blue-500 font-semibold underline hover:text-blue-700 transition duration-200">github.com/sayyedrabeeh</a>`
    const linkedin = `<a href="https://linkedin.com/in/sayyed-rabeeh/" target="_blank"  rel="noopener noreferrer" class="text-blue-500 font-semibold underline hover:text-blue-700 transition duration-200">Linkedin.com/in/sayyed-rabeeh</a>`
    const leetcode = `<a href="https://leetcode.com/u/sayyed-rabeeh/" target="_blank"  rel="noopener noreferrer" class="text-blue-500 font-semibold underline hover:text-blue-700 transition duration-200">Leetcode.com/u/sayyed-rabeeh</a>`
    
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
        favoriteProject: "Two projects are my absolute favorites:1️⃣ My Full-Stack Portfolio Platform This wasn't just a portfolio — I treated it like a full-fledged production project.It includes:Django + React full stack architecture Tailwind CSS + Framer Motion for modern UI animations Matter.js & Three.js for interactive 3D/physics effects Swiper.js for interactive carousels JWT authentication It represents my personality, skills, animation sense, and backend capability — all in one place.2️⃣ TaleTailor — AI-Powered Story Generator This one is special because it's creative and technically challenging. Generates stories using AI Real-time collaboration editing (Django Channels / WebSockets) User accounts & profile system Like/comment interaction system Dynamic theaming accroding to story mood This project pushes boundaries — AI + real-time communication + storytelling platform.",
        challengingProject: "Honestly, every project I built has been challenging in different ways, because I work on them while learning and balancing a bootcamp — some took 1–4 months.But the most challenging experience not challanging fursrating was during my full-stack portfolio project.one of The Challenge  isI accidentally duplicated my login page component.I kept editing one file locally, but the deployed version wasn’t updating — because I was unknowingly modifying the wrong duplicate file.This created:UI conflicts Routing confusion Time wasted debugging “ghost bugs” It was frustrating because everything looked correct in code, but nothing changed on the site. I treated it like a production debugging task and: Re-audited the file structure Carefully inspected all auth component files Searched for duplicates in the repository Used Git history to track changes Saw where the wrong file started getting updated Identified the duplicated component Clean-up & Refactor Deleted duplicate file Standardized component naming Reorganized folder structure for clarity Set up a practice going forward ✅ Enforced clean folder structure ✅ Naming conventions ✅ Verified file references before coding This project taught me the importance of: Folder architecture discipline Consistent naming conventions Systematic debugging Using Git as a tracking tool, not just a backupPatience and persistence — because real dev bugs are rarely obvious 😄",
        openSource: "Yes — I have started contributing to open-source.Right now, most of my contributions are learning-focused, like contributing to beginner-friendly repositories such as First-Contributions and Code-Contributions, mainly to understand workflow, PR reviews, and community standards. I also attempted a contribution to Supabase-related project, but I realized the task required Subabase expertise and the code I wrote was in Python using SQL logic, which didn’t match the project requirements.Since I was balancing bootcamp + major personal projects at that time, I paused it rather than pushing incomplete work. Even though I'm early in my open-source journey, I enjoy it and plan to contribute more seriously going forward — especially in areas I work with daily like Django, React, and AI tools.",
        lookingForJob: "Yes, I am actively looking for job opportunities — ideally in Full-Stack Development, followed by Backend roles, and I’m open to Frontend roles as well.If the right company and role match my skills and offer good growth (and a good package 😉), I’m definitely ready to move forward 😉",
        workPreference: "I prefer on-site work.Remote isn’t really my style, and I’m not very interested in hybrid either — especially in Kerala.I enjoy being physically present with the team, collaborating directly, and learning from the environment.",
        companySize: "I prefer startup environments first — I love fast-paced learning and being hands-on with real problems.Mid-sized and enterprise companies are also great if the role and package are strong.However, I am specifically looking for product-based companies, not service-based ones.",
        dreamCompany: "My dream workplace is within the FAANG ecosystem — especially companies likeGoogle, Meta (Facebook), Amazon, Apple, or Netflix.These companies focus on innovation, large-scale engineering challenges, and real-world impact. admire environments where creativity and engineering excellence come together, and those companies strongly represent that culture.",
        hobbies: "Outside of coding, I’m really into movies and music. I don’t stick to one genre — if it’s good, I’m watching it. I'm a cinematic enjoyer, especially high-voltage movies like Lokesh universe, Bahubali, Salaar, KGF and all those goosebumps-triggers 😌🔥 I also love analyzing sound effects, background score, and visual shots — sometimes more than the story itself. If a movie has insane BGM and stylish scenes, I'm locked in",
        music: "I enjoy music based on my mood. My playlist shifts between emotional, energetic, and calm tracks depending on how I feel — I love exploring different genres rather than sticking to just one.I listen to music based on my mood — emotional songs when I'm sad, energetic ones when I'm happy. I don't have one fixed genre; I enjoy everything depending on how I feel.",
        codingMusic: "Depends on mood: Lo-fi (calm debugging), Trap/EDM (speed-coding), Instrumental BGM from KGF/Salaar/Baahubali (feel like saving world with terminal 🔥), sometimes emotional songs (debugging needs emotional support 😄)",
        gaming: "Love chess! I enjoy strategic games, especially chess. I'm not a professional player, but I love the game and play it regularly to improve my strategic thinking. I occasionally play video games for fun as well.",
        sports: "I enjoy physical activities like dance, karate, and fitness training. I haven’t formally trained yet due to financial and time focus on my tech journey, but it's definitely on my list once I’m more settled. I believe staying active is essential for discipline and mental clarity.",
        creative: "Enjoy drawing simple nature sketches. Not professional - just for relaxation and creative expression",
        travel: "Enjoy traveling, want to explore world in future. i want to explore different parts of the world in the future. I prefer meaningful travel with people I genuinely care about, rather than traveling just for the sake of it. Once I achieve stability in my career, I plan to prepare and start traveling more. Once career is stable, will travel more",
        favoriteLanguage: "Python is my favorite because it was the first language I studied seriously, and it clicked for me. It's clean, easy to understand, and powerful for backend systems.React comes right after — I love how quickly I can shape UI ideas into reality and build modern, interactive interfaces.",
        careerGoal: "Honestly, my long-term goal is to build something big — a tech product or company — and become extremely successful, financially and professionally.Yes… billionaire ambitions included  😎",
        coffeeOrTea: "I’m not really a big coffee person — I prefer tea when I need something. But honestly, I don’t rely much on either; I stay more focused without it.r",
        food: " I enjoy trying different snacks and flavors. I haven’t explored many cuisines yet, but once I’m financially stable, I’m planning to try everything—from burgers with cheese to international street food. I love experimenting with food, so I know I'll develop many favorites soon.",
        schedule: "I'm a night owl by nature — nights feel peaceful and creative for me.But my family is strict about late nights, so I’m a night owl living under morning-person surveillanceI naturally think and work better at night — it’s quiet, creative, and helps me focus deeply.However, I also understand the importance of discipline and routine, so I adjust when needed.Right now, my family prefers a more structured schedule, so I balance both.In short: I can thrive in both schedules, but my brain secretly votes for nighttime productivity",
        ide: "My favorite code editor is VS Code.It’s lightweight, fast, highly customizable, and has powerful extensions that support both backend and frontend development.From Django tooling to React productivity plugins, it perfectly fits my full-stack workflow.",
        os: "My heart says Mac, my wallet says Windows.I absolutely love macOS — clean, smooth, developer-friendly, and honestly just gives main character energy.But right now… finance said “no bro”, so I'm rocking Windows like a loyal soldier 💻🤣(One day soon thogh… MacBook will be mine. Manifesting it.",
        techChannels: "Fireship, Traversy Media, Tech With Tim, Code With Harry, freeCodeCamp, Corey Schafer - basically YouTube university!",
         tabsOrSpaces: "Spaces. Always spaces. Consistency matters! Tabs are chaos, spaces are peace 😌",
    }

 


    async function get_hugging_response(userInput) {
        
        const input = userInput.toLowerCase().trim().replace(/\s+/g, " ").replace(/[?.,!]/g, "");

        try {
            
            const response = await fetch('https://api-inference.huggingface.co/models/google/gemma-2b', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: input })
            })
            if (!response.ok) {
                throw new Error(`Hugging Face API error: ${response.status}`)
            }
            const data = await response.json()
            let generatedText = null;

            if (Array.isArray(data) && data[0]?.generated_text) {
                generatedText = data[0].generated_text;
            } else if (data?.generated_text) {
                generatedText = data.generated_text;
            } else if (data?.outputs?.[0]?.generated_text) {
                generatedText = data.outputs[0].generated_text;
            }

            if (!generatedText || generatedText.trim() === '') {
                throw new Error('Empty model response ')
            }
            return generatedText.trim()
        } catch (error) {
            console.warn("⚠️ Hugging Face fallback triggered:", error.message);

            return `😎 Hey there! Great question! I'm currently in training (learning all the cool stuff about Sayyed), so I might not get it 100% right just yet. After I finish my training, I promise to give a proper answer!  
                    If it's urgent, you can reach out at this number 📞 – 9207286895 My boss will pick the call , just one tiny request: whenever you send me something, please double-check your spelling 😅.  
                    Meanwhile, you can still ask me about skills, projects, background, hobbies, favorite things, career goals, work preferences… basically, anything! Even fun stuff like "what's your favorite movie" or "tabs vs spaces". 😄`;


        }

    }


 
    const getBotResponse = (userInput) => {

        const input = userInput.toLowerCase().trim().replace(/\s+/g, " ").replace(/[?.,!]/g, "");

        if (/\b(your name|who are you|what is your name|tell me your name|may i know your name|name please|who r u|you are who|identify yourself|what do i call you|can i know your name|what's your name|whats your name|who is this|name)\b/i.test(input.trim())) {
            return `${knowledgeBase.fullName}`;
        }

        if (/\b(nickname|other name|what should i call you|your nick name|do you have a nickname|any nickname|what are you called|people call you|pet name|short name|your short name|your pet name)\b/i.test(input)) {
            return `People call me different names: ${knowledgeBase.nicknames.join(', ')}. I'm basically a multi-version human release! 😄`;
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
        if (/\b(github|git hub|gh|git repository|git repo|git projects|github profile|github projects|github link|github repo|github repository|github commits|git commits)\b/i.test(input)) {
            return `Check out my GitHub: ${github} - 1,000+ commits and counting! 🔥`;
        }
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
        if (/\b(fav|fave|favorite|favourite)\s+projects?\b/i.test(input)) {
            return knowledgeBase.favoriteProject;
        }
        if (/\b(challeng(?:e|ing)?|difficult|hard|tough|problematic|tricky)\b/i.test(input)) {
            return knowledgeBase.challengingProject;
        }
        if (/\b(remote|onsite|on-site|hybrid|work preference|work mode|working remotely|working onsite|working on-site|working hybrid|remote work|office work|office-based|work from home|wfh|work from office|flexible work|flexible mode)\b/i.test(input)) {
            return knowledgeBase.workPreference;
        }
        
         if (/\b(open[\s-]?source|contribution|contributing|contributed|contribute|first[-\s]?contributions|code[-\s]?contributions|github[-\s]?contribution|oss|open-source project)\b/i.test(input)) {
            return knowledgeBase.openSource;
        }
        if (/\b(job|jobs|hire|hiring|hired|looking|looking for|looking to work|seeking|seeking job|employment|work opportunity|career opportunity|available for work)\b/i.test(input)) {
            return knowledgeBase.lookingForJob;
        }
        if (/\b(dream\s+(company|job|role|workplace)|preferred\s+(company|job|role|workplace)|favorite\s+(company|job|role|workplace)|faang|facebook|amazon|apple|netflix|google|meta|microsoft|big tech|company\s+you\s+love\s+to\s+work|which\s+company\s+do\s+you\s+like|company\s+you\s+prefer)\b/i.test(input)) {
            return knowledgeBase.dreamCompany;
        }

        if (/\b(company|companies|startup|startups|enterprise|enterprises|firm|organization|organisation|business|corporation|corp)\b/i.test(input)) {
            return knowledgeBase.companySize;
        }
        
        if (/\b(hobbi|hobby|hobbies|free\s+time|fun|pastime|leisure|spare\s+time|things\s+I\s+like\s+to\s+do|activities|recreation|interest|interests|what\s+do\s+you\s+do\s+for\s+fun)\b/i.test(input)) {
            return knowledgeBase.hobbies;
        }
        if (/\b(coding\s+music|coding\s+songs|music\s+while\s+coding|songs\s+while\s+coding|work\s+music|work\s+songs|study\s+music|study\s+songs|playlist|playlists|coding\s+playlist|study\s+playlist|work\s+playlist)\b/i.test(input)) {
            return knowledgeBase.codingMusic;
        }
        if (/\b(music|song|songs|listening\s+to\s+music|favorite\s+song|favorite\s+music|playing\s+music|singing|playlist|audio|tunes|melody|melodies|soundtrack|favorite\s+track|tracks|listen|listens|listened)\b/i.test(input)) {
            return knowledgeBase.music;
        }
        


        if (/\b(game|games|gaming|play game|play games|chess|video game|video games|board game|board games|online game|online games|pc game|mobile game|console game)\b/i.test(input)) {
            return knowledgeBase.gaming;
        }

        if (/\b(sport|sports|fitness|workout|exercise|exercising|gym|training|physical activity|cardio|strength training|athletics|yoga|pilates|running|jogging|cycling|swimming|team sport|individual sport)\b/i.test(input)) {
            return knowledgeBase.sports;
        }
        if (/\b(draw|drawing|sketch|sketching|paint|painting|art|artist|illustration|illustrate|doodle|digital art|graphic design|creative|craft|crafting|design)\b/i.test(input)) {
            return knowledgeBase.creative;
        }
       
        if (input.includes('skill') || input.includes('tech stack') || input.includes('technology')) {
            return `${knowledgeBase.primaryStack}. I work with Django, React, PostgreSQL, Tailwind, Docker, AWS, REST APIs, and more! Full-stack specialist 💪`;
        }
        if (/\b(travel|travelling|trip|journey|vacation|holiday|tour|explore|adventure|backpacking|roadtrip|globetrot|tourism|traveling)\b/i.test(input)) {
            return knowledgeBase.travel;
        }
        if (/\b(fav|fave|favorite|favourite)\b.*\b(language|programming language|coding language|prog language)\b/i.test(input)) {
            return knowledgeBase.favoriteLanguage;
        }
        if (input.includes('age') || input.includes('old') || input.includes('birth') || input.includes('dob') || input.includes('born')) {
            return `${knowledgeBase.dob}.   🎂`;
        }
        if (/\b(experience|experiences|exp|how long|how many years|years|developing|coding|programming|since when|started coding|started programming|background)\b/i.test(input) 
            && !/\b(python|react|django)\b/i.test(input)) {
            return knowledgeBase.codingExperience;
        }
        if (/\b(goal|career goal|future|future plan|future plans|ambition|career ambition|career objective|long[-\s]?term goal|long[-\s]?term plan|professional goal|professional ambition)\b/i.test(input)) {
            return knowledgeBase.careerGoal;
        }
        if (/(coffee|tea|drink|beverage|hot drink|morning drink|caffeinated drink|your favorite drink|tea or coffee|coffee or tea|tea\/coffee)/i.test(input)) {
            return knowledgeBase.coffeeOrTea;
        }
        if (/\b(food|eat|eating|meal|meals|cuisine|favorite food|favorite meal|what do you eat|what's your favorite food|your cuisine|food preference|meal preference|snack|dinner|lunch|breakfast)\b/i.test(input)) {
            return knowledgeBase.food;
        }
        if (/\b(morning|night|owl|early riser|late night|night owl|morning person|evening person|preferred time|work schedule| active hours|productive hours|working hours)\b/i.test(input)) {
            return knowledgeBase.schedule;
        }
        if (/\b(project|projects|built|work|worked|working)\b/i.test(input)) {
            return `I've built 30+ projects! Key ones: ResuMatch (resume assistant), TaleTailor (AI stories), Jarvis AI (voice assistant), gesture-controlled games, AI Sketch Studio, and my full-stack portfolio. Check them out: ${github}`;
        }

        if (/\b(ide|editor|code editor|vscode|vs code|visual studio code|intellij|pycharm|sublime|atom|netbeans|eclipse|webstorm|phpstorm|codeblocks|textmate|vim|emacs|notepad\+\+)\b/i.test(input)) {
            return knowledgeBase.ide;
        }
        if (/\b(linux|ubuntu|debian|fedora|red hat|centos|arch|mint|windows|win10|win11|mac|macos|osx|apple mac|operating system|os)\b/i.test(input)) {
            return knowledgeBase.os;
        }
        if (/\b(channel|youtube|youtube channel|podcast|tech podcast|tech channel|video channel|youtube videos|vlog|tech vlog|stream|live stream|tech stream)\b/i.test(input)) {
            return knowledgeBase.techChannels;
        }
         if (input.includes('skill') || input.includes('tech stack') ||input.includes('tech')||input.includes('stack')|| input.includes('technology')) {
            return `${knowledgeBase.primaryStack}. I work with Django, React, PostgreSQL, Tailwind, Docker, AWS, REST APIs, and more! Full-stack specialist 💪`;
        }

        if (/\b(tab|tabs|space|spaces|indent|indentation|tabs vs spaces|space vs tab)\b/i.test(input)) {
            return knowledgeBase.tabsOrSpaces;
        }

        if (/\b(linkedin|linkd|linkdn|lnkd|linked in|linkedin profile|linkedin account|linkedin page)\b/i.test(input)) {
            return `Connect with me on LinkedIn: ${linkedin}`;
        }
        if (/\b(leetcode|leet code|leet-code|coding platform|competitive coding|practice coding|online judge|problem solving platform)\b/i.test(input)) {
            return `My LeetCode profile: ${leetcode}`;
        }
        if (/\b(contact|reach|email|get in touch|message me|how to reach|how to contact|connect with me|contact info|contact details|call me|text me|dm me|message me|my number|my whatsapp|whatsapp|mobile|phone)\b|\b\d{10}\b|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}\b/i.test(input)) {
            return `You can reach me via:\nEmail: sayyedrabeehom240@gmail.com\nWhatsApp/Mobile: 9207286895\nLinkedIn: ${linkedin}`;
        }
        if (/\b(about|tell me about|introduce yourself|introduce|who are you|yourself|your story|bio|background|profile|information about you|can you introduce yourself|say something about you|who is|about you)\b/i.test(input)) {
            return `I'm Sayyed Rabeeh, a passionate Full Stack Developer from Kerala with a unique Humanities background. I switched to tech 1.5 years ago and haven't looked back! Building AI apps, gesture games, and full-stack platforms. Currently at Brototype bootcamp. Love Python, Django, React. Night owl, Mac dreamer, space-user, billionaire-in-progress 😎`;
        }
        if (/\b(hi|hello|hey|hlo|hey there|hi there|hello there|hiya|yo|greetings|sup|good morning|good afternoon|good evening)\b/i.test(input)) {
            return `Hey! 👋 I'm Sayyed Rabeeh's AI assistant. Ask me anything - tech skills, projects, hobbies, favorite food, dream company, or even tabs vs spaces! 😄`;
        }
        if (/\b(bye|goodbye|see you|see ya|catch you later|later|okk|okkk|take care|farewell|ciao|adios|peace|ttyl|talk to you later|see you soon)\b/i.test(input)) {
            return `Goodbye! 👋 It was nice chatting with you.`;
        }
        if (/\b(thanks|thank you|thx|ty|much appreciated|cheers|grateful|thanks a lot)\b/i.test(input)) {
            return "You're welcome! 😊";
        }
        if (/\b(ok|okay|sure|yep|yeah|yup|nope|nah|alright|perfect|sounds good|got it|understood|great|good|awesome|cool|nice|love it)\b/i.test(input)) {
            return "Got it! 👍";
        }
        if (/\b(how are you|what's up|whats up|how's it going|how are things|how you doing|how do you do)\b/i.test(input)) {
            return "I'm doing great, thanks for asking! 😄  ";
        }


 
         return `😎 Hey there! Great question! I'm currently in training (learning all the cool stuff about Sayyed), so I might not get it 100% right just yet. After I finish my training, I promise to give a proper answer!  
If it's urgent, you can reach out at this number 📞 – 9207286895 My boss will pick the call , just one tiny request: whenever you send me something, please double-check your spelling 😅.  
Meanwhile, you can still ask me about skills, projects, background, hobbies, favorite things, career goals, work preferences… basically, anything! Even fun stuff like "what's your favorite movie" or "tabs vs spaces". 😄`;

    } 
    
    const handleSend = () => {
 
        if (!input.trim()) return;

        const userMessage = { type: 'user', text: input };
        setMessage(prev => [...prev, userMessage]);
        const userInput = input; 
        setInput(""); 
 
        setTimeout(async() => {
            let botReply = getBotResponse(userInput);
            if (botReply && typeof botReply.then === 'function') {
                botReply = await botReply;
            }
 
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
            `}</style>
        </>
)}