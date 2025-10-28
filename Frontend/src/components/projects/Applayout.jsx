import React, { useState } from "react";
import {
  Home,
  Globe,
  Layers,
  Zap,
  Terminal,
  Brain,
  Database,
  Gamepad2,
  Code,
  BookOpen,
  Github,
  Mail,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { id: "/", name: "Home", icon: Home, color: "bg-blue-500" },
    { id: "/fullstack", name: "Full Stack Apps", icon: Globe, color: "bg-purple-500" },
    { id: "/django", name: "Django Backend", icon: Layers, color: "bg-emerald-600" },
    { id: "/react", name: "React Frontend", icon: Zap, color: "bg-cyan-500" },
    { id: "/opencv", name: "Computer Vision", icon: Terminal, color: "bg-indigo-500" },
    { id: "/ai", name: "AI & Assistants", icon: Brain, color: "bg-pink-500" },
    { id: "/chat", name: "Chat / Realtime", icon: Code, color: "bg-orange-500" },
    { id: "/games", name: "Game / Gesture", icon: Gamepad2, color: "bg-green-600" },
    { id: "/databases", name: "Database Models", icon: Database, color: "bg-yellow-600" },
    { id: "/learning", name: "Learning & Docs", icon: BookOpen, color: "bg-sky-500" },
  ];

  return (
    <div className="flex  w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white  ">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-72" : "w-0"
        } bg-gray-900/70 backdrop-blur-md border-r border-gray-800 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
              SR
            </div>
            <div>
              <h2 className="font-bold text-lg">Sayyed Rabeeh</h2>
              <p className="text-gray-400 text-sm">Full Stack Developer</p>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href="https://github.com/sayyedrabeeh"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:sayyedrabeeh240@gmail.com"
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            Categories
          </h3>
          {categories.map(({ id, name, icon: Icon, color }) => {
            const active = location.pathname === id;
            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30"
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

        {/* Footer Stats */}
        <div className="p-4 border-t border-gray-800">
          <div className="grid grid-cols-3 gap-2 text-center text-gray-400 text-sm">
            <div className="bg-gray-800/50 rounded-lg py-2">
              <div className="text-blue-400 font-semibold text-lg">50+</div>
              <div>Projects</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg py-2">
              <div className="text-purple-400 font-semibold text-lg">10+</div>
              <div>Repos</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg py-2">
              <div className="text-green-400 font-semibold text-lg">5</div>
              <div>Stars</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="bg-gray-900/60 border-b border-gray-800 p-4 flex items-center gap-4 backdrop-blur-md w-full">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Developer Dashboard
          </h1>
        </header>

        {/* Full width outlet */}
        <section className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 w-full">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
