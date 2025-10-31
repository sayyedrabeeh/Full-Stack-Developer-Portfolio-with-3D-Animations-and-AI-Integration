import React, { useState, useEffect } from "react"
import { ArrowLeft, Heart, MessageCircle, Share2, Github, ExternalLink, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function Project_Component({ Project_type }) {
    
    const navigate = useNavigate()
    const [project, setProject] = useState([])
    const [currentImgIdx, setCurrentImgIdx] = useState({})
    const [liked, setLiked] = useState({})
    const baseUrl = "http://127.0.0.1:8000"

    useEffect(() => {
        fetch(`${baseUrl}/api/accounts/projects?project_type=${Project_type}`)
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
        <>
        
        </>
)



}



