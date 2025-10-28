import React, { useState } from "react"
import { Home, Globe, Layers, Zap, Terminal, Database, Github, Brain,Mail,Puzzle,BookOpen, Linkedin, Menu, X, } from 'lucide-react'
import { Outlet,useNavigate,useLocation } from "react-router-dom"




export default function AppLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const categories = [

    { id : '' , name : 'Home' , Icon : Home , color : 'bg-blue-500' },
    { id : 'fullstack' , name : 'FullStack Apps' , Icon : Globe , color : 'bg-purple-500' },
    { id : 'django' , name : 'Django Backend' , Icon : Layers , color : 'bg-emerald-600' },
    { id : 'react' , name : 'React Frontend' , Icon : Zap , color : 'bg-cyan-500' },
    { id : 'opencv' , name : 'Computer Vision ' , Icon : Terminal , color : 'bg-indigo-600' },
    { id : 'ai' , name : 'Ai & Assistants ' , Icon : Brain , color : 'bg-pink-500' },
    { id : 'miniprojects' , name : 'Mini Projects ' , Icon : Puzzle , color : 'bg-yellow-500' },
    { id : 'learnings' , name : 'Learnings & Docs   ' , Icon : BookOpen , color : 'bg-yellow-500' },

  ]


  return (
    <div className=" flex w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white " >

      <aside className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-gray-900/70 backdrop-blur-md  border-r border-gray-800 transition-all duration-300 overflow-hidden flex flex-col  `} >

        <div className="p-6 border-b border-gray-800 " >
          <div className="flex items-center gap-4  mb-4" >
            <div className="w-14 h-14 rounded-full  bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold" >
              SR
            </div>
            <div>
              <h2 className="font-bold text-lg">Sayyed Rabeeh</h2>
              <p className="text-gray-400 text-sm" >Fullstack Developer </p>
            </div>
          </div>

          <div className="flex gap-3" >

            <a
              href="https://github.com/sayyedrabeeh"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700  transition-colors"
            >
              <Github size={18}/>
            </a>
            <a
              href="mailto:sayyedrabeeh240@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700  transition-colors"
            >
              <Mail size={18}/>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700  transition-colors"
            >
              <Linkedin size={18}/>
            </a>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            


          </nav>


        </div>


      </aside>

      
    </div>
)

}