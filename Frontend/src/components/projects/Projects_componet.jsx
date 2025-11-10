import React, { useState, useEffect, useCallback, useContext,useRef } from "react"

 
import { ArrowLeft, Heart, MessageCircle, Share2Icon, Trash2 ,Github,Bookmark, BookmarkCheck, ExternalLink, X,ChevronLeft, ChevronRight, Calendar, Send,Youtube ,Linkedin } from "lucide-react"
import moment from "moment";
import api from "../../api/axios";
import { toast } from "react-toastify";
import CommentBox from "./conmment";
import { BackendContext } from '../../api/BackendContext.jsx';


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
      const { backendLoading } = useContext(BackendContext);
    
     
    const [project, setProject] = useState([])
    const [currentImgIdx, setCurrentImgIdx] = useState({})
    const [showCommentBox, setShowCommentBox] = useState(false)
    const [currentProjectId, setCurrentProjectId] = useState(null)
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
     
 
    const baseURL = "https://portfolio-backend-0gnb.onrender.com"

    const fetchProjects = useCallback(async (currentOffset, isInitial = false) => { 
        if (loading || (!hasMore && !isInitial)) return;
        setLoading(true);
        const token = localStorage.getItem("access");
    const url = Project_type 
            ? `${baseURL}/api/accounts/projects/?project_type=${Project_type}&offset=${currentOffset}&limit=${LIMIT}`
            : `${baseURL}/api/accounts/projects/?offset=${currentOffset}&limit=${LIMIT}`;

        try {
            const response = await fetch(url, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            
            const result = await safeJson(response);
            const newProjects = result.projects || [];
             console.log(newProjects)
            
            setHasMore(result.hasMore);
            
            if (isInitial) {
                setProject(newProjects);
                const idx = {};
                newProjects.forEach((p) => { idx[p.id] = 0 });
                setCurrentImgIdx(idx);
            } else {
                setProject(prev => [...prev,...newProjects]);
                setCurrentImgIdx(prev => {
                    const newIdx = { ...prev };
                    newProjects.forEach((p) => { newIdx[p.id] = 0 });
                    return newIdx;
                });
            }
            setOffset(prev => prev + LIMIT);
            
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
    if (!backendLoading) {
        setProject([]);
        setOffset(0);
        setHasMore(true);
        setInitialLoad(true);
        fetchProjects(0, true);
    }
}, [Project_type, backendLoading]);

     
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
        
        const res = await fetch(`https://portfolio-backend-0gnb.onrender.com/api/accounts/projects/${id}/likes`, {
            
            method: 'POST',
            headers: {
            "Authorization": `Bearer ${token}`,
            }
        })
        const data = await safeJson(res)
        setProject((prev)=> prev.map((p)=>p.id === id ?{...p,likes:data.likes,userLiked:data.liked}:p))
        
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
        const res = await fetch(`https://portfolio-backend-0gnb.onrender.com/api/accounts/projects/${projectId}/get_comments/`, {
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
                                            <img src={ p.images[imgIdx].image.startsWith("http")
                                                        ? p.images[imgIdx].image
                                                        : `${baseURL}${p.images[imgIdx].image}`}
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
                                            ? (p.video.thumbnail.startsWith("http")
                                                ? p.video.thumbnail
                                                : `${baseURL}${p.video.thumbnail}`)
                                            : undefined
                                            }>
                                            <source src={ p.video.video.startsWith("http")
                                                ? p.video.video
                                                : `${baseURL}${p.video.video}`} type="video/mp4" />
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
                            comments.map((c) => {
                                console.log('c.user_id', c.user_id, 'currentUserId', currentUserId);

                                return (
                                    <div key={c.id} className="bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-700">
                                        <div className="flex items-start gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                                                {c.user.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center">
                                                    <p className="font-semibold text-sm text-white">{c.user}</p>
                                                    <span className="text-[11px] text-gray-400">
                                                        <p title={moment(c.created_at).format("DD MMM YYYY, hh:mm A")}>
                                                            {moment(c.created_at).fromNow()}
                                                        </p>
                                                    </span>
                                                </div>
                                            <p className="text-sm text-gray-300 mt-1 break-words">
                                            {c.text && c.text.split(" ").map((word, idx) => <span key={idx}>{word} </span>)}
                                            {c.media && <img src={c.media} alt="gif" className="w-24 h-24 rounded mt-1" />}
                                            </p>                         
                                            </div>

                                            {(isSuperUser || Number(c.user_id) === Number(currentUserId)) && (
                                                <button
                                                    onClick={() => {
                                                        setCommentToDelete(c.id);
                                                        setShowDeleteConfirm(true);
                                                    }}
                                                    className="ml-2 text-red-500 hover:text-red-400"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8">
                                <MessageCircle className="w-12 h-12 mx-auto text-gray-600 mb-2" />
                                <p className="text-sm text-gray-400">No comments yet. Be the first to comment!</p>
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
                                           {showCommentBox && currentProjectId === p.id && (
                                        <CommentBox
                                            projectId={p.id}
                                            onNewComment={(newComment) => setComments((prev) => [newComment, ...prev])}
                                        />
                                        )}

                                             
                                        </div>
                                    </div>
                                </div>
                            <div className="px-5 pb-4 space-y-4">
                                <p className="text-sm text-gray-200 leading-relaxed">
                                    {p.description}
                                </p>
                                
                                {p.tech_stack && (
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {p.tech_stack.split(',').map((t) => t.trim()).filter(Boolean).map((t, i) => (
                                                <span 
                                                    key={i} 
                                                    className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-slate-800 to-slate-800/80 border border-slate-700/60 rounded-md text-xs font-medium text-slate-300 shadow-sm"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2 pt-2">
                                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Project Links</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {p.live_link && (
                                            <a
                                                href={p.live_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-lg text-xs font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                Live Demo
                                            </a>
                                        )}
                                        {p.github_link && (
                                            <a
                                                href={p.github_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg text-xs font-semibold text-slate-200 hover:text-white shadow-md hover:shadow-lg transition-all duration-200"
                                            >
                                                <Github className="w-3.5 h-3.5" />
                                                Source Code
                                            </a>
                                        )}
                                        {p.linkedin_link && (
                                            <a
                                                href={p.linkedin_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg text-xs font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200"
                                            >
                                                <Linkedin className="w-3.5 h-3.5" />
                                                LinkedIn
                                            </a>
                                        )}

                                        {p.youtube_link && (
                                            <a
                                                href={p.youtube_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg text-xs font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200"
                                            >
                                                <Youtube className="w-3.5 h-3.5" />
                                                Watch Video
                                            </a>
                                        )}

                                
                                       {p.custom_links?.length > 0 && (
                                            <>
                                                {p.custom_links.map((link, i) => {
                                    
                                                    const url = link.url.toLowerCase();
                                                    let Icon = ExternalLink;
                                                    let bgColor = "from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600";
                                                    
                                                    if (url.includes('medium.com')) {
                                                        Icon = () => (
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                                                            </svg>
                                                        );
                                                        bgColor = "from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800";
                                                    } else if (url.includes('twitter.com') || url.includes('x.com')) {
                                                        Icon = () => (
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                                            </svg>
                                                        );
                                                        bgColor = "from-gray-900 to-black hover:from-gray-800 hover:to-gray-900";
                                                    } else if (url.includes('dribbble.com')) {
                                                        Icon = () => (
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm8.635 9.47c-.34-.095-3.036-.846-6.106-.39.63 1.73 1.178 3.178 1.252 3.467 2.366-1.43 3.352-3.48 3.854-4.077zM12 2.183c2.545 0 4.87.97 6.62 2.558-.43.515-1.477 2.28-3.658 3.526-1.905-3.504-4.01-6.34-4.33-6.776A9.774 9.774 0 0112 2.183zM8.51 2.867c.305.42 2.38 3.26 4.308 6.7-5.424 1.443-10.2 1.42-10.71 1.414A9.824 9.824 0 018.51 2.867zM1.846 12.013v-.34c.526.01 6.408.084 12.27-1.703.355.693.69 1.398 1.005 2.107-.155.044-.313.09-.468.138-6.085 1.964-9.31 7.37-9.538 7.82A9.802 9.802 0 011.846 12.013zm10.155 9.804c-2.114 0-4.065-.668-5.663-1.803.186-.386 2.462-4.812 9.14-7.12l.017-.006c1.455 3.775 2.055 6.945 2.205 7.828a9.785 9.785 0 01-5.699 1.1zm7.66-2.86c-.107-.636-.668-3.63-1.992-7.344 2.82-.45 5.288.287 5.585.382a9.834 9.834 0 01-3.593 6.962z"/>
                                                            </svg>
                                                        );
                                                        bgColor = "from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600";
                                                    } else if (url.includes('behance.net')) {
                                                        Icon = () => (
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.424-.29.68-.61.78-.94h2.588c-.403 1.28-1.048 2.2-1.9 2.75-.85.56-1.884.83-3.08.83-.837 0-1.584-.13-2.246-.4-.66-.27-1.22-.65-1.67-1.14-.46-.49-.81-1.07-1.06-1.74-.24-.67-.36-1.39-.36-2.17 0-.75.125-1.45.38-2.12.25-.67.61-1.25 1.085-1.74.48-.48 1.054-.86 1.736-1.13.68-.27 1.44-.41 2.28-.41.88 0 1.63.16 2.26.48.63.32 1.14.74 1.55 1.27.4.52.69 1.12.87 1.78.17.66.26 1.34.24 2.05h-7.69c.01.92.26 1.64.71 2.07l.007.002zm-14.02 2.15c.48 0 .91-.08 1.3-.24.39-.16.72-.38.98-.66.26-.28.46-.61.59-.98.13-.37.19-.78.19-1.23 0-.89-.25-1.56-.74-2.018-.49-.46-1.15-.69-1.99-.69H2.24v5.79h.68zm.145-12.19c.44 0 .83.08 1.17.24.33.16.61.37.82.63.21.26.36.55.45.87.09.32.14.65.14.98 0 .75-.21 1.33-.64 1.74-.43.41-1.04.61-1.82.61H2.24V6.63h.83l-.01-.005zm12.68.12h3.988v1.017h-3.988V6.746z"/>
                                                            </svg>
                                                        );
                                                        bgColor = "from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600";
                                                    } else if (url.includes('devpost.com')) {
                                                        Icon = () => (
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/>
                                                            </svg>
                                                        );
                                                        bgColor = "from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600";
                                                    } else if (url.includes('instagram.com')) {
                                                        Icon = () => (
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                                            </svg>
                                                        );
                                                        bgColor = "from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500";
                                                    }else if (url.includes('reddit.com')) {
                                                                Icon = () => (
                                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.307 3.438 9.8 8.205 11.387-.113-.97-.215-2.46.045-3.523.234-.99 1.51-6.29 1.51-6.29s-.385-.77-.385-1.908c0-1.788 1.037-3.122 2.33-3.122 1.097 0 1.627.823 1.627 1.81 0 1.103-.704 2.75-1.066 4.275-.304 1.29.647 2.345 1.917 2.345 2.3 0 4.066-2.423 4.066-5.923 0-3.09-2.224-5.255-5.406-5.255-3.686 0-5.845 2.764-5.845 5.62 0 1.12.43 2.325.97 2.98a.39.39 0 01.09.37c-.1.41-.33 1.29-.38 1.47-.06.23-.19.28-.44.17-1.63-.76-2.65-3.14-2.65-5.05 0-4.12 2.996-7.9 8.64-7.9 4.53 0 8.07 3.23 8.07 7.55 0 4.51-2.84 8.13-6.78 8.13-1.32 0-2.57-.68-2.99-1.47l-.81 3.09c-.29 1.11-1.07 2.49-1.6 3.34A11.986 11.986 0 0024 12z" />
                                                                    </svg>
                                                                );
                                                                bgColor = "from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600";
                                                            }

                                                    
                                                    return (
                                                        <a
                                                            key={i}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${bgColor} rounded-lg text-xs font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200`}
                                                        >
                                                            <Icon />
                                                            {link.name}
                                                        </a>
                                                    );
                                                })}
                                            </>
                                        )}
                                    </div>
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



