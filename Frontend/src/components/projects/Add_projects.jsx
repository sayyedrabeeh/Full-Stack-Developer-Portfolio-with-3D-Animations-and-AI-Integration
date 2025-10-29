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

    const validateField = (name, value) => {
     
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
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        validateField(name,value)
    }

    const handleFileChange = (e) => {
        
        const selectedFiles = e.target.files
        if (!selectedFiles) return;

        if (formData.media_type === 'image') {
            const validFiles = Array.from(selectedFiles).filter((file) => file.type.startswith('image/') && file.size <= 10 * 1024 * 1024)
             setFiles(validFiles)
        } else {
            const file = selectedFiles[0]
            if (file && file.type.startswith('video/') && file.size <= 100 * 1024 * 1024) {
                setVideo(file)
            }
        }

    }

    const removeFile = (index) => {
        setFiles(files.filter((_,i) => i !== index ))
    }

    const removeVideo = () => setVideo(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(errors).length > 0 || !formData.name || formData.description) {
            alert('Fix errors Before Submitting ')
        }
        setLoading(true)
        const data = new formData()
        Object.entries(formData).forEach(([key, value]) => data.append(key, value))
        
        if (formData.media_type === 'image') {
            files.forEach((file) => data.append('images',file))
        } else if (video) {
            data.append('videos',video)
        }
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            alert('project published successfully ')
            setFormData({
                name: "",
                description: "",
                live_link: "",
                github_link: "",
                tech_stack: "",
                time_spent: "",
                media_type: "image",
            });
            setFiles([])
            setVideo(null)
              }
        catch(err) {
            console.error(err)
            alert('failed to publish project ')

        } finally {
            setLoading(false)
        }
    }

     const formateTime = (date) => {
            const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000)
            if (minutes < 1) return 'just now'
            if (minutes < 60) return `${minutes} min ago`
            const hours = Math.floor(minutes / 60);
            return `${hours} hour${hours > 1?'s':''}ago`

    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white ">

            <div className="max-w-7xl mx-auto px-6 py-12" >
                <div className="mb-12 ">
                    <div className="flex items-center gap-5 mb-6 ">
                        <div className="p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl shadow-purple-500/30 animate-pluse" >
                            <Sparkles className="w-9 h-9 text-white"/>
                        </div>
                        <div>
                            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight" >
                                Create New Project
                            </h1>
                            <p className="text-slate-400 text-lg mt-2 max-w-2xl">
                                Showcase your work with rich media, detailed descriptions, and live demos.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8 " >
                            <div className="bg-slate-900/70  backdrop-blur-2xl rounded-3xl border border-slate-800/60 p-8 shadow-2xl" >
                                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-slate-800/50">
                                    <CheckCircle2 className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-bold text-white ">Basic Information</h2>
                                </div>
                                <div className="space-y-7">
                                    <div className="relative space-y-2" >
                                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300" >
                                            Project Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text" name="name" value={formData.name} onChange={handleChange} onFocus={() => setFocusField('name')} onBlur={() => setFocusField(null)}
                                            className={`w-full px-5 py-4 bg-slate-800/60 border-2 rounded-2xl transition-all duration-300 outline-none text-white placeholder-slate-500 font-medium 
                                                ${focusField === 'name' ? 'border-blue-500 shadow-xl shadow-blue-500/30' : 'border-slate-700'} ${errors.name ? 'border-red-500 ' : ''}
                                                hover:border-blue-400/70 hover:bg-slate-800/80 `} placeholder="Enter Project Name" required />
                                        {errors.name && (
                                            <p className="text-xs text-red-400  flex items-center gap-1 mt-1" >
                                                <AlertCircle className="w-3 h-3"/>{errors.name}
                                            </p>
                                            )}
                                    </div>
                                    <div className="relative space-y-2" >
                                        <div className="flex items-center justify-between" >
                                        <label className="flex items-center    gap-2 text-sm font-semibold text-slate-300" >
                                            Description <span className="text-red-400">*</span>
                                        </label>
                                        <span className="text-xs text-slate-500">
                                            {formData.description.length}/1000
                                            </span>
                                        </div>
                                        <textarea
                                            name="description" value={formData.description} onChange={handleChange} onFocus={() => setFocusField('description')} onBlur={() => setFocusField(null)}
                                            rows={6} maxLength={1000}
                                            className={`w-full px-5 py-4 bg-slate-800/60 border-2 rounded-2xl transition-all duration-300 outline-none text-white placeholder-slate-500 font-medium 
                                                ${focusField === 'description' ? 'border-purple-500 shadow-xl shadow-purple-500/30' : 'border-slate-700'} ${errors.description ? 'border-red-500 ' : ''}
                                                hover:border-purple-400/70 hover:bg-slate-800/80 `} placeholder="Explain your project in detail: goals, challenges, solutions, tech used, and impact..." required />
                                        {errors.description && (
                                            <p className="text-xs text-red-400  flex items-center gap-1 mt-1" >
                                                <AlertCircle className="w-3 h-3"/>{errors.description}
                                            </p>
                                            )}
                                    </div>
                                </div>
                            </div>

                            

                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}

