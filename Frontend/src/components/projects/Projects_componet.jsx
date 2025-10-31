import React, { useState, useEffect } from "react"
import { ArrowLeft, Heart, MessageCircle, Share2, Github, ExternalLink, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function Project_Component({ Project_type }) {
    
    const navigate = useNavigate()
    const [project, setProject] = useState([])
    const [currentImgIdx, setCurrentImgIdx] = useState({})
    const [liked, setLiked] = useState({})
    const baseURL = "http://127.0.0.1:8000"

    useEffect(() => {
        fetch(`${baseURL}/api/accounts/projects?project_type=${Project_type}`)
            .then(r => r.json())
            .then((data) => {
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
                <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3" >
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                        { Project_type }
                    </h1>
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
                                                            <span>{p.time_spent }</span>
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
                                                    <button onClick={() => prevImag(p.id, p.image.length)}
                                                        className="absolute left-3 top-1/2 translate-y-1/2 bg-black/60  hover:bg-black/80 text-white p-2 rounded-full"
                                                        aria-label="Prev"    
                                                    >
                                                        <ChevronLeft className="w-5 h-5" />
                                                        
                                                    </button>                         
                                                    <button onClick={() => nextImag(p.id, p.image.length)}
                                                        className="absolute right-3 top-1/2 translate-y-1/2 bg-black/60  hover:bg-black/80 text-white p-2 rounded-full"
                                                        aria-label="Next"    
                                                    >
                                                        <ChevronLeft className="w-5 h-5" />
                                                    </button>                         
                                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 " >
                                                        {p.image.map((_, i) => (
                                                            <div key={i}
                                                            className={`h-1 rounded-full transition-all ${i === imgIdx ? 'bg-white w-7 ': 'bg-white/50 w-2'}`}/>

                                                        )) }
                                                    </div>
                                                </>
                                            ) }
                                        </div>
                                    )}
                                    

                                 </article>
                            )

                        })
                ) }

            </main>
        
        </div>
)



}



