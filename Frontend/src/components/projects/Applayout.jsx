import React, { useState,useEffect } from "react";
import { Home,Globe,Layers,Zap,Terminal,Brain,Puzzle,BookOpen,Github,Mail,Linkedin,Menu,X,LogOut,FolderPlus,ArrowLeft  } from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { id: "", name: "Home", icon: Home, color: "bg-blue-500" },
    { id: "fullstack", name: "Full Stack Apps", icon: Globe, color: "bg-purple-500" },
    { id: "django", name: "Django Backend", icon: Layers, color: "bg-emerald-600" },
    { id: "react", name: "React Frontend", icon: Zap, color: "bg-cyan-500" },
    { id: "opencv", name: "Computer Vision", icon: Terminal, color: "bg-indigo-500" },
    { id: "ai", name: "AI & Assistants", icon: Brain, color: "bg-pink-500" },
    { id: "miniprojects", name: "Mini Projects", icon: Puzzle, color: "bg-yellow-600" },
    { id: "learnings", name: "Learning & Docs", icon: BookOpen, color: "bg-sky-500" },
  ];
  const [counts, setCounts] = useState({
    total: 0,
    fullstack: 0,
    django: 0,
    react: 0,
    opencv: 0,
    ai: 0,
    miniprojects: 0,
  });
  const handleLogout = () => {
 
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setIsSuperUser(user?.is_superuser || false)
    
    fetch("http://127.0.0.1:8000/api/accounts/counts/")
      .then(res => res.json())
      .then(data => setCounts(data))
    .catch(err => confirm.log(err))

  },[])

  

  return (
    <div className="flex w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white ">
       <aside
        className={`fixed top-0 left-0 ${
          isSidebarOpen ? "w-72" : "w-0"
        } bg-gray-900/70 backdrop-blur-md border-r border-gray-800 transition-all duration-300 overflow-hidden   flex flex-col h-screen`}
      >
       <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-4 mb-1">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
            SR
          </div>
          <div>
            <h2 className="font-bold text-lg">Sayyed Rabeeh</h2>
            <p className="text-gray-400 text-sm">Full Stack Developer</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <a
            href="https://github.com/sayyedrabeeh"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            <Github size={18} />
          </a>
          <a
            href="mailto:sayyedrabeeh240@gmail.com"
            className="p-2.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            <Linkedin size={18} />
          </a>
        </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 
          scrollbar-thin scrollbar-thumb-[#3B82F6]/40 scrollbar-track-transparent 
          hover:scrollbar-thumb-[#8B5CF6]/60 transition-colors duration-300">
          {categories.map(({ id, name, icon: Icon, color }) => {
            const active = location.pathname === `/projects/${id}` || 
              (id === "" && location.pathname === "/projects");
            return (
              <button
                key={id}
                onClick={() => navigate(`/projects/${id}`)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-blue-900/80 to-purple-600/80  "
                    : "hover:bg-gray-800 hover:bg-opacity-60"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    active ? "bg-white/20" : `${color} bg-opacity-60`
                  }`}
                >
                  <Icon size={20} />
                </div>
                <span className="font-medium text-sm">{name}</span>
              </button>
            );
          })}
        </nav>
       <div className="p-4 border-t border-gray-800 space-y-3">
        {isSuperUser && (
          <div
            onClick={() => navigate("/projects/add_project")}
            className="flex items-center justify-center gap-2 py-2 
                      text-gray-200 font-semibold text-base 
                      cursor-pointer hover:text-green-400 
                      transition-all duration-200"
          >
            <FolderPlus size={18} className="text-green-400" />
            <span>Add Project</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg 
                    bg-gradient-to-r from-red-600 to-pink-600 
                    hover:from-red-500 hover:to-pink-500 
                    transition-all font-semibold text-white 
                    shadow-lg shadow-red-600/30"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

     
      </aside>

      <main className={`flex-1 flex flex-col ml-${isSidebarOpen ? "72" : "0"} transition-all duration-300`}>
       <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 px-4 py-3 flex items-center justify-between w-full">
 
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-800/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/80 text-gray-200 text-sm font-medium rounded-lg hover:bg-gray-700/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-800/70 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <Home size={16} />
            Home
          </button>
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ml-10">
            My Projects
          </h1>
        </div>
        <div className="hidden md:flex flex-wrap gap-2 text-xs font-medium">
            {counts.total > 0 && <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full border border-blue-800/50">Total {counts.total}</span>}
            {counts.fullstack > 0 && <span className="px-2 py-1 bg-purple-900 text-purple-300 rounded-full border border-purple-800/50">Fullstack {counts.fullstack}</span>}
            {counts.django > 0 && <span className="px-2 py-1 bg-emerald-900 text-emerald-300 rounded-full border border-emerald-800/50">Django {counts.django}</span>}
            {counts.react > 0 && <span className="px-2 py-1 bg-cyan-900 text-cyan-300 rounded-full border border-cyan-800/50">React {counts.react}</span>}
            {counts.opencv > 0 && <span className="px-2 py-1 bg-indigo-900 text-indigo-300 rounded-full border border-indigo-800/50">CV {counts.opencv}</span>}
            {counts.ai > 0 && <span className="px-2 py-1 bg-pink-900 text-pink-300 rounded-full border border-pink-800/50">AI {counts.ai}</span>}
            {counts.miniprojects > 0 && <span className="px-2 py-1 bg-yellow-900 text-yellow-300 rounded-full border border-yellow-800/50">Mini {counts.miniprojects}</span>}
            {counts.learning > 0 && <span className="px-2 py-1 bg-sky-900 text-sky-300 rounded-full border border-sky-800/50">Learning {counts.learning}</span>}
          </div>

        </header>
        <section className="flex-1 overflow-y-auto   bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 w-full">
          <Outlet />
        </section>
      </main>
    </div>
  );
}





