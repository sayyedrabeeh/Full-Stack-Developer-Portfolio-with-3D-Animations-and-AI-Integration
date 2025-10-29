import React, { useState, useEffect } from "react";
import { Upload,Video,Image,Loader2,CheckCircle2,ExternalLink,Github,Clock,Code,Sparkles,ArrowLeft,X,AlertCircle } from "lucide-react";




export default function Add_Project() {
    
    const [formData, setFormData] = useState({
        name : '',
        description : '',
        live_link : '',
        github_link : '',
        tech_stack : '',
        time_spent : '',
        media_type : 'image' 
    })

    const [files, setFiles] = useState([])
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [focusField, setFocusField] = useState(null)
    const [errors, setErrors] = useState({})
    const [lastSaved, setLastSaved] = useState(null)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (formData.name || formData.description) {
                setLastSaved(new Date())
            }
        }, 3000)
        return ()=> clearTimeout(timer)
    },[formData])    

    const validatefield = (name, value) => {
     
        const new_error = { ...errors }
        if (name === 'name' && value.length < 3) {
            new_error.name = ' Project Name Must Be At Least 3 Characters '
        } else if (name === 'description' && value.length < 50) {
            new_error.description = 'Project Description Must Be At Least 50 Characters '
        } else if (name === 'live_link' && value && !/^http?:\/\//.test(value)) {
            new_error.live_link = 'Live Link Must Be Start With http://'
        } else if (name === 'github_link' && value && !/^http?:\/\/(github\.com|gitlab\.com)/.test(value)) {
            new_error.github_link = 'Must Be Valid Github/Gitlab Url'
        } else {
            delete new_error[name]
        }
    }    
    
    








}

