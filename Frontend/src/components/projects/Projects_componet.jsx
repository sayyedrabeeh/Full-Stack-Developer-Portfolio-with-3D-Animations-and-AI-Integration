import React, { useState, useEffect } from "react"
import { ArrowLeft, Heart, MessageCircle, Share2Icon, Github, ExternalLink, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function Project_Component({ Project_type }) {
    
    const navigate = useNavigate()
    const [project, setProject] = useState([])
    const [currentImgIdx, setCurrentImgIdx] = useState({})
    const [liked, setLiked] = useState({})
    const baseURL = "http://127.0.0.1:8000"


    useEffect(() => {
        const url = Project_type 
      ? `http://127.0.0.1:8000/api/accounts/projects?project_type=${Project_type}`
      : `http://127.0.0.1:8000/api/accounts/projects`;
        fetch(url)
            .then(r => r.json())
            .then((data) => {
                console.log(data)
                const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                setProject(sorted)
                const idx = {}
                const Likes = {}
                sorted.forEach((p) => {
                    idx[p.id] = 0
                    Likes[p.id] = false
                })
                setCurrentImgIdx(idx)
                setLiked(Likes)
            })
            .catch((e) => console.log('load error', e));

    }, [Project_type])
    
    const nextImag = (id, total) => {
        setCurrentImgIdx((prev) => ({
            ...prev,
            [id]:(prev[id] + 1)% total
        }))
    }
    const prevImag = (id, total) => {
        setCurrentImgIdx((prev) => ({
            ...prev,
            [id]:(prev[id] - 1 + total )% total
        }))
    }

    const toggleLike = (id) => {
        setLiked((prev) =>({...prev,[id]:!prev[id]}))
    }

  const fmtDate = (d) => {
    const date = new Date(d);
    const now = new Date();
    const diffH = (now - date) / (1000 * 60 * 60);

    if (diffH < 1) return "just now";
    if (diffH < 24) return `${Math.floor(diffH)}h ago`;
    if (diffH < 168) return `${Math.floor(diffH / 24)}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="sticky top-0 z-10 bg-white  dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" >
                <div className="max-w-2xl  mx-auto flex items-center justify-center px-4 py-3" >
                <div className="mb flex flex-col items-center gap-1">
                    <h1 className="text-[26px] font-extrabold text-gray-900 dark:text-white tracking-tight">
                        {Project_type?.toUpperCase() || "ALL PROJECTS"}
                    </h1>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        curated feed of My work
                    </p>

                    <div className="mt-2 h-1 w-14 rounded-full bg-black/80 dark:bg-white/80"></div>
                    </div>

                    <div className="w-8"/>                    
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-4 space-y-6 pb-20 ">
                {project.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-12" >
                        No Projects Yet.
                    </p>
                ) : (
                        project.map((p) => {
                            const imgIdx = currentImgIdx[p.id] ?? 0
                            const manyImage = p.media_type === 'image' && p.images?.length > 1;
                            const isLiked = liked[p.id]

                            return (
                                <article key={p.id}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-3 " >
                                            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center  justify-center font-bold text-white  " >
                                                { p.name.charAt(0).toUpperCase() }
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white" >
                                                    { p.name }
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" >
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{fmtDate(p.created_at)}</span>
                                                    {p.time_spent && (
                                                        <>
                                                        <span className="mx-1" >•</span>
                                                           Completed Within  <span>{p.time_spent }</span>
                                                        </>
                                                    ) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {p.media_type === 'image' && p.images?.length > 0 && (
                                        <div className="relative bg-black" >
                                            <img src={`${baseURL}${p.images[imgIdx].image}`}
                                                alt={`${p.name} – ${imgIdx + 1}`}
                                                className="w-full max-h-96 object-contain"
                                            />
                                            {manyImage && (
                                                <>
                                                    <button onClick={() => prevImag(p.id, p.images.length)}
                                                        className="absolute left-3 top-1/2 translate-y-1/2 bg-black/60  hover:bg-black/80 text-white p-2 rounded-full"
                                                        aria-label="Prev"    
                                                    >
                                                        <ChevronLeft className="w-5 h-5" />
                                                        
                                                    </button>                         
                                                    <button onClick={() => nextImag(p.id, p.images.length)}
                                                        className="absolute right-3 top-1/2 translate-y-1/2 bg-black/60  hover:bg-black/80 text-white p-2 rounded-full"
                                                        aria-label="Next"    
                                                    >
                                                        <ChevronRight className="w-5 h-5" />
                                                    </button>                         
                                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 " >
                                                        {p.images.map((_, i) => (
                                                            <div key={i}
                                                            className={`h-1 rounded-full transition-all ${i === imgIdx ? 'bg-white w-7 ': 'bg-white/50 w-2'}`}/>

                                                        )) }
                                                    </div>
                                                </>
                                            ) }
                                        </div>
                                    )}

                                    {p.media_type === 'video' && p.video && (
                                        <div className="bg-black">
                                            <video
                                                controls
                                                className="w-full max-h-96 object-contain"
                                                poster={
                                                p.video.thumbnail
                                            ? `${baseURL}${p.video.thumbnail}`
                                            : undefined
                                            }>
                                            <source src={`${baseURL}${p.video.video}`} type="video/mp4" />
                                                Your browser does not support video.
                                            </video>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center gap-5 p-3" >
                                        <button onClick={() => toggleLike(p.id)}
                                            className={`flex items-centre gap-1.5 transition-all ${isLiked ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'} hover:scale-110`}
                                        >
                                            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current animate-pluse' : ''}`} />
                                                                <span className="text-sm font-medium">
                                                                {isLiked ? (p.likes || 0) + 1 : p.likes || 0}
                                                                </span>
                                        </button>

                                    <button className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:scale-110 transition-all">
                                        <MessageCircle className="w-6 h-6" />
                                        <span className="text-sm font-medium">{p.comments || 0}</span>
                                    </button>

                                    <button className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:scale-110 transition-all ml-auto">
                                        <Share2Icon className="w-6 h-6" />
                                        <span className="text-sm font-medium">{p.shares || 0}</span>
                                    </button>
                                    </div>


                                    <div className="px-4 pb-3 space-y-2"  >
                                        <p className="text-sm text-gray-900 dark:text-gray-100  leading-relaxed" >
                                            { p.description  }
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 " >
                                            {p.tech_stack?.split(',').map((t) => t.trim()).filter(Boolean).map((t, i) => (
                                                 <span key={i} className="text-xs font-medium text-blue-600 dark:text-blue-400">#{t.replace(/\s+/g, "")}</span>
                                             )) }
                                        </div>
                                            
                                        <div className="flex gap-4 pt-2 text-xs">
                                            {p.live_link && (
                                                <a
                                                    href={p.live_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-centre gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium ">
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                    live
                                                </a>
                                        )  }    
                                            {p.github_link && (
                                                <a
                                                    href={p.github_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-centre gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium ">
                                                    <Github className="w-3.5 h-3.5" />
                                                    Code
                                                </a>
                                        )  }    
                                        </div>
                                    </div>
                                 </article>
                            )

                        })
                ) }

            </main>
        
        </div>
)



}



