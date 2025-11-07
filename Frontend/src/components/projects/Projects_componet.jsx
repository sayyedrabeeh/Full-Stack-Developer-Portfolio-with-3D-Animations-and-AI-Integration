import React, { useState, useEffect,useCallback,useRef } from "react"
 
import { ArrowLeft, Heart, MessageCircle, Share2Icon, Trash2 ,Github,Bookmark, BookmarkCheck, ExternalLink, X,ChevronLeft, ChevronRight, Calendar, Send } from "lucide-react"
import moment from "moment";
import api from "../../api/axios";
import { toast } from "react-toastify";

 const safeJson = async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
         
        if (!text || text.trim() === '' || text === 'undefined') return [];
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("Parse failed:",e, text);
            return [];
        }
    };

export default function Project_Component({ Project_type }) {
    
     
    const [project, setProject] = useState([])
    const [currentImgIdx, setCurrentImgIdx] = useState({})
    const [showCommentBox, setShowCommentBox] = useState(false)
    const [currentProjectId, setCurrentProjectId] = useState(null)
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])
    const [isSuperUser, setIsSuperUser] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [initialLoad, setInitialLoad] = useState(true)

    const [commentToDelete, setCommentToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    
    const observerTarget = useRef(null)
    const LIMIT = 3;
     
 
    const baseURL = "https://portfolio-backend-0gnb.onrender.com/api/"

    const fetchProjects = useCallback(async (currentOffset, isInitial = false) => { 
        if (loading || (!hasMore && !isInitial)) return;
        setLoading(true);
        const token = localStorage.getItem("access");
    const url = Project_type 
            ? `${baseURL}/api/accounts/projects?project_type=${Project_type}&offset=${currentOffset}&limit=${LIMIT}`
            : `${baseURL}/api/accounts/projects?offset=${currentOffset}&limit=${LIMIT}`;

        try {
            const response = await fetch(url, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            
            const result = await safeJson(response);
            const newProjects = result.projects || [];
            
            setHasMore(result.hasMore);
            
            if (isInitial) {
                setProject(newProjects);
                const idx = {};
                newProjects.forEach((p) => { idx[p.id] = 0 });
                setCurrentImgIdx(idx);
            } else {
                setProject(prev => [...prev, ...newProjects]);
                setCurrentImgIdx(prev => {
                    const newIdx = { ...prev };
                    newProjects.forEach((p) => { newIdx[p.id] = 0 });
                    return newIdx;
                });
            }
        } catch (e) {
            console.log('load error', e);
            toast.error("Failed to load projects");
        } finally {
               setTimeout(() => {
                setLoading(false);
                setInitialLoad(false);
            }, 1000);
        }
    }, [Project_type, loading, hasMore]);

    
    useEffect(() => {
        setProject([]);
        setOffset(0);
        setHasMore(true);
        setInitialLoad(true);
        fetchProjects(0, true);
    }, [Project_type]);

     
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading && !initialLoad) {
                    const newOffset = offset + LIMIT;
                    setOffset(newOffset);
                    fetchProjects(newOffset);
                }
            },
            { threshold: 0.5 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loading, offset, fetchProjects, initialLoad]);



     
    
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

 
  useEffect(() => {
   
    const stored = localStorage.getItem('user');
    const user = stored && stored !== 'undefined' && stored !== 'null' 
      ? JSON.parse(stored) 
      : null;
    setCurrentUserId(user?.id);
    setIsSuperUser(user?.is_superuser || false);
     
  }, []);
  
 
 

  const fmtDate = (d) => {
    const date = new Date(d);
    const now = new Date();
    const diffH = (now - date) / (1000 * 60 * 60);

    if (diffH < 1) return "just now";
    if (diffH < 24) return `${Math.floor(diffH)}h ago`;
    if (diffH < 168) return `${Math.floor(diffH / 24)}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

 
    const toggle_like = async (id) => {
        const token = localStorage.getItem('access')
        
        const res = await fetch(`http://127.0.0.1:8000/api/accounts/projects/${id}/likes`, {
            
            method: 'POST',
            headers: {
            "Authorization": `Bearer ${token}`,
            }
        })
        const data = await safeJson(res)
        setProject((prev)=> prev.map((p)=>p.id === id ?{...p,likes:data.likes,userLiked:data.liked}:p))
        
    }

    const addComment = async () => {
        const token = localStorage.getItem('access')
        if (!commentText.trim()) return
        const res =  await fetch(`http://127.0.0.1:8000/api/accounts/projects/${currentProjectId}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            },
            body:JSON.stringify({text:commentText})
        })

            const data = await safeJson(res);
            setProject(prev => prev.map((p) =>
                p.id === currentProjectId ? { ...p, comments: data.comments } : p
            ));
            if (data.new_comment) {
                setComments(prev => [data.new_comment,...prev]);
            }

            setCommentText('');
                
    }

    const openComments = async (projectId) => {
        if (showCommentBox && currentProjectId === projectId) {
            setShowCommentBox(false)
            setCurrentProjectId(null)
            return
        }
        
        setShowCommentBox(true)
        setCurrentProjectId(projectId)
        const token = localStorage.getItem('access')
        const res = await fetch(`http://127.0.0.1:8000/api/accounts/projects/${projectId}/get_comments/`, {
             headers: { "Authorization": `Bearer ${token}` }
        }) 
        const data = await safeJson(res)
        setComments((data.comments || []).sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
                ))

    }
   const handleBookmark = async (id) => {
        try {
            const res = await api.post(`/api/accounts/projects/${id}/bookmark/`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            }
            });

            const status = res.data.status;  

            toast.success(
            status === "added"
                ? "Added to saved projects"
                : "Removed from saved"
            );
            setProject(prev =>
            prev.map(p =>
                p.id === id
                ? { ...p, is_bookmarked: status === "added" }
                : p
            )
            );
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
};
 


   
    return (
        <div className="min-h-screen  bg-gray-900">
            <header className="sticky top-0 z-10   bg-gray-800 border-b  border-gray-700" >
                <div className="max-w-2xl  mx-auto flex items-center justify-center px-4 py-3" >
                <div className="mb flex flex-col items-center gap-1">
                    <h1 className="text-[26px] font-extrabold  text-white tracking-tight">
                        {Project_type?.toUpperCase() || "ALL PROJECTS"}
                    </h1>

                    <p className="text-sm  text-gray-400">
                        curated feed of My work
                    </p>

                    <div className="mt-2 h-1 w-14 rounded-full  bg-white/80"></div>
 
                    </div>

                    <div className="w-8"/>                    
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-4 space-y-6 pb-20 ">
                {project.length === 0 ? (
 
 
                    <p className="text-center  text-gray-400 py-12" >
 
 
                        No Projects Yet.
                    </p>
                ) : (
                        project.map((p) => {
                            const imgIdx = currentImgIdx[p.id] ?? 0
                            const manyImage = p.media_type === 'image' && p.images?.length > 1;
 
                             const isCommentsOpen = showCommentBox && currentProjectId === p.id;

                            return (
                                <article key={p.id}
                                    className=" bg-gray-800 rounded-2xl shadow-sm overflow-hidden border  border-gray-700" 
                                >
                                    <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-3 " >
                                            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center  justify-center font-bold text-white  " >
                                                { p.name.charAt(0).toUpperCase() }
                                            </div>
                                            <div>
 
                                                <h3 className="font-semibold  text-white" >
                                                    { p.name }
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm  text-gray-400" >
 
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
 
                                        <button onClick={() => toggle_like(p.id)}
                                            className={`flex items-centre gap-1.5 transition-all ${p.userLiked ? 'text-red-500' : ' text-gray-300'} hover:scale-110`}
                                        >
                                            <Heart className={`w-6 h-6 ${p.userLiked  ? 'fill-current animate-pulse' : ''}`} />
                                                                <span className="text-sm font-medium">
                                                                 {p.likes || 0 }
                                                                </span>
                                        </button>
                                        
                                    <button onClick={() => openComments(p.id)}
                                        className={`flex items-center gap-1.5 transition-all hover:scale-110 ${isCommentsOpen ? ' text-blue-400' : 'text-gray-300'}`}>
                                        <MessageCircle className={`w-6 h-6 ${isCommentsOpen ? 'fill-current' : ''}`} />
                                        <span className="text-sm font-medium">{p.comments || 0}</span>
                                    </button>
                                                                
                                        <button
                                    onClick={() => handleBookmark(p.id)}
                                    className="flex items-center gap-1.5  text-gray-300 hover:scale-110 transition-all ml-auto"
                                    >
                                    {p.is_bookmarked ? (
                                        <BookmarkCheck className="w-6 h-6" />
                                    ) : (
                                        <Bookmark className="w-6 h-6" />
                                    )}
                                     
                                        </button>
                                        
                                    {isSuperUser && (
                                    <button
                                    onClick={() => {
                                    setProjectToDelete(p.id);
                                    setShowDeleteModal(true);
                                    }}
                                    className="flex items-center gap-1.5 text-red-500 hover:scale-110 transition-all"
                                    >
                                    <Trash2 className="w-6 h-6" />
                                    </button>
                                )}
                                    </div>

                                {showDeleteModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                    <div className="bg-gray-800 rounded-xl p-6 w-80 text-center">
                                    <h2 className="text-lg font-bold text-white mb-4">Confirm Delete</h2>
                                    <p className="text-gray-300 mb-6">
                                        Are you sure you want to delete this project? This action cannot be undone.
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
                                        >
                                        Cancel
                                        </button>
                                        <button
                                        onClick={async () => {
                                            if (!projectToDelete) return;
                                            try {
                                            await api.delete(`/api/accounts/projects/${projectToDelete}/delete/`, {
                                                headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
                                            });
                                            setProject(prev => prev.filter(p => p.id !== projectToDelete));
                                            toast.success("Project deleted successfully");
                                            } catch (err) {
                                            console.error(err);
                                            toast.error("Failed to delete project");
                                            } finally {
                                            setShowDeleteModal(false);
                                            setProjectToDelete(null);
                                            }
                                        }}
                                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                        >
                                        Delete
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                )}


                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCommentsOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className=" bg-gray-900/50 px-4 py-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-semibold  :text-white">
                                                Comments ({comments.length})
                                            </h4>
                                            <button onClick={() => openComments(p.id)}
                                                className=" text-gray-400  hover:text-gray-200 transition-colors">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto space-y-3 mb-4 pr-2 scrollbar-thin  scrollbar-thumb-gray-600">
                                            {comments.length > 0 ? (
                                                comments.map((c) => (
                                                    <div key={c.id} className=" bg-gray-800 rounded-lg p-3 shadow-sm border  border-gray-700">
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                                                                {c.user.charAt(0).toUpperCase()}
                                                            </div>
                                                             <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-semibold text-sm  text-white">
                                                                {c.user}
                                                            </p>
                                                            <span className="text-[11px]  text-gray-400">
                                                               <p title={moment(c.created_at).format("DD MMM YYYY, hh:mm A")}>
                                                                        {moment(c.created_at).fromNow()}
                                                                        </p>
                                                            </span>
                                                        </div>

                                                        <p className="text-sm text-gray-300 mt-1 break-words">
                                                            {c.text}
                                                        </p>
                                                            </div>
                                                       {(isSuperUser || c.user_id === currentUserId) && (
                                                <button   onClick={() => {
                                                    setCommentToDelete(c.id);
                                                    setShowDeleteConfirm(true);
                                                }} className="ml-2 text-red-500 hover:text-red-400">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                )}

                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-8">
                                                    <MessageCircle className="w-12 h-12 mx-auto  text-gray-600 mb-2" />
                                                    <p className="text-sm  text-gray-400">
                                                        No comments yet. Be the first to comment!
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                            {showDeleteConfirm && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                                <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
                                <p className="text-white mb-4">Are you sure you want to delete this comment?</p>
                                <div className="flex justify-center gap-4">
                                    <button
                                    onClick={async () => {
                                        try {
                                        await api.post(
                                            `/api/accounts/comments/${commentToDelete}/delete/`,
                                            {},
                                            { headers: { Authorization: `Bearer ${localStorage.getItem("access")}` } }
                                        );
                                            setComments(prev => prev.filter(c => c.id !== commentToDelete));
                                              setProject(prevProjects => 
                                                prevProjects.map(p => 
                                                    p.id === currentProjectId 
                                                    ? { ...p, comments: (p.comments || 1) - 1 } 
                                                    : p
                                                ))
                                        toast.success("Comment deleted successfully");
                                        } catch (err) {
                                        console.error(err);
                                        toast.error("Failed to delete comment");
                                        } finally {
                                        setShowDeleteConfirm(false);
                                        setCommentToDelete(null);
                                        }
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                    Delete
                                    </button>
                                    <button
                                    onClick={() => {
                                        setShowDeleteConfirm(false);
                                        setCommentToDelete(null);
                                    }}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                    Cancel
                                    </button>
                                </div>
                                </div>
                            </div>
                            )}

                                      
                                        <div className="relative">
                                            <textarea
                                                rows={3}
                                                placeholder="Write a comment..."
                                                className="w-full resize-none rounded-xl border  border-gray-600 bg-gray-800 px-4 py-3 pr-12 text-sm   placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        addComment();
                                                    }
                                                }}
                                            />
                                            <button
                                                onClick={addComment}
                                                disabled={!commentText.trim()}
                                                className="absolute right-2 bottom-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100"
                                                aria-label="Send comment">
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                    <div className="px-4 pb-3 space-y-2"  >
                                        <p className="text-sm  text-gray-100  leading-relaxed" >
 
                                            { p.description  }
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 " >
                                            {p.tech_stack?.split(',').map((t) => t.trim()).filter(Boolean).map((t, i) => (
 
 
                                                 <span key={i} className="text-xs font-medium  text-blue-400">#{t.replace(/\s+/g, "")}</span>
 
 
                                             )) }
                                        </div>
                                            
                                        <div className="flex gap-4 pt-2 text-xs">
                                            {p.live_link && (
                                                <a
                                                    href={p.live_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
 
                                                    className="flex items-centre gap-1  text-blue-400 hover:underline font-medium ">
 
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                    live
                                                </a>
                                        )  }    
                                            {p.github_link && (
                                                <a
                                                    href={p.github_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
 
                                                    className="flex items-centre gap-1 text-blue-400 hover:underline font-medium ">
 
  
                                                    <Github className="w-3.5 h-3.5" />
                                                    Code
                                                </a>
                                        )  }    
                                        </div>
                                    </div>
                                    <div ref={observerTarget}></div> 
                                    {loading && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                        <div className="w-16 h-16 border-4 border-t-transparent border-purple-600 border-solid rounded-full animate-spin"></div>
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



