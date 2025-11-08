import React, { useState, useEffect,useCallback,memo } from "react";
import { Upload,Video,Image,Loader2,CheckCircle2,ExternalLink,Github,Clock,Code,Sparkles,ArrowLeft,X,AlertCircle,ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useOutletContext } from "react-router-dom";


    const Content_card = memo(function Content_card({
                        formData,
                        handleChange,
                        focusField,
                        setFocusField,
                        errors
    }) {
        return(
        <>
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
                                <AlertCircle className="w-3 h-3" />{errors.name}
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
                                <AlertCircle className="w-3 h-3" />{errors.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-800/60 p-8 shadow-2xl ">
                <div className="flex items-center gap-3 mb-7  pb-5 border-b border-slate-800/50" >
                    <ExternalLink className="w-6  h-6 text-emerald-400" />
                    <h2 className="text-2xl font-bold text-white">Project Links</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 ">
                    <div className="space-y-2" >
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300" >
                            <ExternalLink className="w-4 h-4 text-emerald-400" />Live Demo
                        </label>
                        <input
                            type="url"
                            name="live_link"
                            value={formData.live_link}
                            onChange={handleChange}
                            onFocus={() => setFocusField('live_link')} onBlur={() => setFocusField(null)}
                                            
                            className={`w-full px-5 py-4 bg-slate-800/60 border-2 rounded-2xl transition-all duration-300 outline-none text-white placeholder-slate-500 font-medium 
                                                ${focusField === 'live_link' ? 'border-emerald-500 shadow-xl shadow-emerald-500/30' : 'border-slate-700'} ${errors.live_link ? 'border-red-500 ' : ''}
                                                hover:border-emerald-400/70 hover:bg-slate-800/80 `} placeholder="https://yourproject.com" required />
                        {errors.live_link && (
                            <p className="text-xs text-red-400  flex items-center gap-1 mt-1" >
                                <AlertCircle className="w-3 h-3" />{errors.live_link}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2" >
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300" >
                            <ExternalLink className="w-4 h-4 text-violet-400" />Repository
                        </label>
                        <input
                            type="url"
                            name="github_link"
                            value={formData.github_link}
                            onChange={handleChange}
                            onFocus={() => setFocusField('github_link')} onBlur={() => setFocusField(null)}
                                            
                            className={`w-full px-5 py-4 bg-slate-800/60 border-2 rounded-2xl transition-all duration-300 outline-none text-white placeholder-slate-500 font-medium 
                                                ${focusField === 'github_link' ? 'border-violet-500 shadow-xl shadow-violet-500/30' : 'border-slate-700'} ${errors.github_link ? 'border-red-500 ' : ''}
                                                hover:border-violet-400/70 hover:bg-slate-800/80 `} placeholder="https://github.com/username/repo" required />
                        {errors.github_link && (
                            <p className="text-xs text-red-400  flex items-center gap-1 mt-1" >
                                <AlertCircle className="w-3 h-3" />{errors.github_link}
                            </p>
                        )}
                        </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                            <ExternalLink className="w-4 h-4 text-blue-500" />LinkedIn
                        </label>
                        <input
                            type="url"
                            name="linkedin_link"
                            value={formData.linkedin_link || ''}
                            onChange={handleChange}
                            onFocus={() => setFocusField('linkedin_link')}
                            onBlur={() => setFocusField(null)}
                            className={`w-full px-5 py-4 bg-slate-800/60 border-2 rounded-2xl outline-none text-white placeholder-slate-500 font-medium
                                        ${focusField === 'linkedin_link' ? 'border-blue-500 shadow-xl shadow-blue-500/30' : 'border-slate-700'}
                                        hover:border-blue-400/70 hover:bg-slate-800/80`}
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>
                        
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                            <ExternalLink className="w-4 h-4 text-red-500" />YouTube
                        </label>
                        <input
                            type="url"
                            name="youtube_link"
                            value={formData.youtube_link || ''}
                            onChange={handleChange}
                            onFocus={() => setFocusField('youtube_link')}
                            onBlur={() => setFocusField(null)}
                            className={`w-full px-5 py-4 bg-slate-800/60 border-2 rounded-2xl outline-none text-white placeholder-slate-500 font-medium
                                        ${focusField === 'youtube_link' ? 'border-red-500 shadow-xl shadow-red-500/30' : 'border-slate-700'}
                                        hover:border-red-400/70 hover:bg-slate-800/80`}
                            placeholder="https://youtube.com/..."
                        />
                    </div>


                </div>
            </div>


            <div className="bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-800/60 p-8 shadow-2xl" >
                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-slate-800/50" >
                    <Code className="w-6 h-6 text-orange-400" />
                    <h2 className="text-2xl font-bold text-white " >Technical Details</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 ">
                    <div className="space-y-2" >
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300" >
                            <Code className="w-4 h-4 text-orange-400" />Tech Stack
                        </label>
                        <input
                            type="text"
                            name="tech_stack"
                            value={formData.tech_stack}
                            onChange={handleChange}
                            onFocus={() => setFocusField('tech_stack')} onBlur={() => setFocusField(null)}
                                            
                            className={`w-full px-5 py-4 bg-slate-800/60 border-2 rounded-2xl transition-all duration-300 outline-none text-white placeholder-slate-500 font-medium 
                                                ${focusField === 'tech_stack' ? 'border-orange-500 shadow-xl shadow-orange-500/30' : 'border-slate-700'} ${errors.tech_stack ? 'border-red-500 ' : ''}
                                                hover:border-orange-400/70 hover:bg-slate-800/80 `} placeholder="React, Node.js, Tailwind, PostgreSQL" required />
                        {errors.tech_stack && (
                            <p className="text-xs text-red-400  flex items-center gap-1 mt-1" >
                                <AlertCircle className="w-3 h-3" />{errors.tech_stack}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2" >
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300" >
                            <Clock className="w-4 h-4 text-pink-400" />Time Spent
                        </label>
                        <input
                            type="text"
                            name="time_spent"
                            value={formData.time_spent}
                            onChange={handleChange}
                            onFocus={() => setFocusField('time_spent')} onBlur={() => setFocusField(null)}
                                            
                            className={`w-full px-5 py-4 bg-slate-800/60 border-2 rounded-2xl transition-all duration-300 outline-none text-white placeholder-slate-500 font-medium 
                                                ${focusField === 'time_spent' ? 'border-pink-500 shadow-xl shadow-pink-500/30' : 'border-slate-700'} ${errors.time_spent ? 'border-red-500 ' : ''}
                                                hover:border-pink-400/70 hover:bg-slate-800/80 `} placeholder="3 weeks ~60 hours" />
                        {errors.time_spent && (
                            <p className="text-xs text-red-400  flex items-center gap-1 mt-1" >
                                <AlertCircle className="w-3 h-3" />{errors.time_spent}
                            </p>
                        )}
                    </div>
                </div>

                             
                <div className="space-y-2 mt-5">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                        <Code className="w-4 h-4 text-cyan-400" /> Project Type
                    </label>

                    <div className="relative">
                        <select
                            name="project_type"
                            value={formData.project_type}
                            onChange={handleChange}
                            onFocus={() => setFocusField('project_type')}
                            onBlur={() => setFocusField(null)}
                            className={`w-full px-5 py-4 bg-slate-800/60 border-2 rounded-2xl appearance-none cursor-pointer text-white font-medium transition-all duration-300 outline-none
                                    ${focusField === 'project_type'
                                    ? 'border-cyan-500 shadow-xl shadow-cyan-500/30'
                                    : 'border-slate-700'
                                }
                                    ${errors.project_type ? 'border-red-500' : ''}
                                    hover:border-cyan-400/70 hover:bg-slate-800/80
                                `}
                            required
                        >
                            <option value="" className="text-slate-500">Select Project Type</option>
                            <option value="fullstack">Fullstack</option>
                            <option value="django">Django</option>
                            <option value="react">React</option>
                            <option value="opencv">OpenCV</option>
                            <option value="ai">AI / Machine Learning</option>
                            <option value="miniprojects">Mini Projects</option>
                            <option value="learning">Learning / Practice</option>

                        </select>

                            
                        <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>

                    {errors.project_type && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" /> {errors.project_type}
                        </p>
                    )}
                </div>

            </div>
        
        </>
    )})


const Media_section = memo(function Media_section({
    formData,
    setFormData,
    files,
    setFiles,
    video,
    setVideo,
    handleFileChange,
    removeFile,
    removeVideo,
    handleSubmit,
    loading,errors
}) {
        return (
            <div className="bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-800/60 p-8 shadow-2xl lg:sticky lg:top-24" >
                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-slate-500/50" >
                    <Upload className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-2xl text-white font-bold">Media</h2>
                </div>

                <div className="space-y-4 mb-7 " >
                    <label className="text-sm  font-semibold text-slate-300" >
                        Media Type
                    </label>
                    <div className="grid grid-cols-2 gap-3" >
                        {['image', 'video'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => {
                                    setFormData({ ...formData, media_type: type })
                                    setFiles([])
                                    setVideo(null)
                                }}
                                className={`flex flex-col items-center justify-center gap-2.5 px-5 py-7 rounded-2xl border-2 transition-all duration-300 
                                                font-semibold text-sm backdrop-blur-sm  ${formData.media_type === type ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-2xl shadow-cyan-500/30' :
                                        'border-slate-700 bg-slate-800/40 text-slate-400  hover:border-slate-600 hover:bg-slate-800/60'
                                    }`}>
                                {type === 'image' ? <Image className="w-7 h-7" /> : <Video className="w-7 h-7" />}
                                <span className="capitalize">{type === 'image' ? 'Images' : 'video'}</span>
                            </button>
                        ))}
                    </div>
                </div>


                <div className="space-y-4" >
                    <label className="text-sm font-semibold text-slate-300">
                        {formData.media_type === 'image' ? 'Upload Images' : 'Upload Video'}
                    </label>
                    <div className="relative group">
                        <input
                            type="file"
                            accept={formData.media_type === 'image' ? 'image/*' : 'video/*'}
                            multiple={formData.media_type === 'image'}
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`flex flex-col items-center justify-center gap-4 px-6 py-14 border-2 border-dashed rounded-2xl 
                                        transition-all duration-300 cursor-pointer ${files.length > 0 || video ? 'border-emerald-500/50 bg-emerald-500/5' :
                                'border-slate-700/60 bg-slate-800/40  group-hover:border-cyan-500/60  group-hover:bg-slate-800/60'
                            } `} >
                                                
                            <Upload className={`w-10 h-10 transition-colors duration-300 ${files.length > 0 || video ? 'text-emerald-400' : 'text-slate-500 group-hover:text-cyan-400 '}`} />
                            <div className="text-center">
                                <p className={`text-sm font-medium transition-colors duration-300 ${files.length > 0 || video ? 'text-emerald-400' : 'text-slate-300 group-hover:text-cyan-400'} `} >
                                    {files.length > 0 || video ? 'Files Ready' : 'Drop Files Here Or Click To Browse'}
                                </p>
                                            
                                <p className="text-xs text-slate-500 mt-1" >
                                    {formData.media_type === 'image' ? 'PNG, JPG, GIF Max 10MB each' : 'MP4 WebM Max 100MB '}
                                </p>
                            </div>
                        </div>
                    </div>

                    {formData.media_type === 'image' && files.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            {files.map((file, i) => (
                                <div key={i} className="relative group rounded-xl overflow-hidden">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`preview ${i + 1}`}
                                        className="w-full h-24 object-cover" />
                                    <button onClick={() => removeFile(i)}
                                        className="absolute top-1 right-1 p1 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100  transition-opacity">
                                        <X className="w-3 h-3 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                                    
                    {formData.media_type === 'video' && video && (
                                     
                        <div className="mt-4 p-4 bg-slate-800/60  rounded-2xl border border-emerald-500/30 ">
                            <video
                                src={URL.createObjectURL(video)}
                                controls
                                className="w-full rounded-xl" />
                            <button onClick={removeVideo}
                                className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                                <X className=" w-3 h-3" />Remove Video
                            </button>
                        </div>
                    )}

                </div>


                <button type="submit"
                    disabled={loading || Object.keys(errors).length > 0 || !formData.name || !formData.description || !formData.github_link || !formData.media_type || !formData.project_type || !formData.tech_stack}
                    className="w-full mt-8 flex items-center justify-center gap-3 py-5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600
                                              hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 transition-all duration-300 font-bold text-white
                                              text-lg shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:hover:scale-100 disabled:opacity-50">
                                           
                    {loading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Publishing Project...</span>
                        </>
                    ) :
                        (
                            <>
                                <CheckCircle2 className="w-6 h-6" />
                                <span>Publish Project </span>
                            </>
                        )}
                </button>
            </div>
        );
    })



export default function Add_Project() {
    const { isSidebarOpen,refreshCounts  } = useOutletContext()
    const [formData, setFormData] = useState({
        name : '',
        description : '',
        live_link : '',
        github_link: '',
        linkedin_link: '',
        youtube_link: '',
        tech_stack : '',
        time_spent: '',
        project_type: "",
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
        } else if (name === 'live_link' && value && !/^https?:\/\//.test(value)) {
            new_error.live_link = 'Live Link Must Be Start With http://'
        } else if (name === 'github_link' && value && !/^https:\/\/github\.com\/sayyedrabeeh(\/.*)?$/.test(value)) {
            new_error.github_link = "Must Be Valid sayyedrabeeh's GitHub Url"
        }if (name === 'linkedin_link' && value) {
        const linkedInPattern = /^https:\/\/www\.linkedin\.com\/.*$/;
        if (!linkedInPattern.test(value)) {
            new_error.linkedin_link = "Must be a valid LinkedIn URL";
        }
        }if (name === 'youtube_link' && value) {
            const youtubePattern = /^https:\/\/(www\.)?youtube\.com\/.*$/;
            if (!youtubePattern.test(value)) {
                new_error.youtube_link = "Must be a valid YouTube URL";
            }
        }
        else {
            delete new_error[name]
        }
    setErrors(new_error)
    }    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        validateField(name,value)
    }

    
    const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    if (formData.media_type === "image") {
        const validFiles = Array.from(selectedFiles).filter(
        (file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024
        );

        if (validFiles.length !== selectedFiles.length) {
        toast.error(" Some images are invalid or exceed 10MB!");
        } else {
        toast.success(" Images added successfully!");
        }

        setFiles(validFiles);
    } else {
        const file = selectedFiles[0];
        if (file) {
        if (!file.type.startsWith("video/")) {
            toast.error(" Please upload a valid video file!");
        } else if (file.size > 100 * 1024 * 1024) {
            toast.error(" Video exceeds 100MB limit!");
        } else {
            setVideo(file);
            toast.success(" Video selected successfully!");
        }
        }
    }

    e.target.value = "";
    };


    const removeFile = (index) => {
        setFiles(files.filter((_,i) => i !== index ))
    }

    const removeVideo = () => setVideo(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(errors).length > 0 || !formData.name || !formData.description || !formData.github_link || !formData.media_type ||!formData.project_type || !formData.tech_stack  ) {
            toast.error('Fix errors Before Submitting ')
            return 
        }
        if (formData.media_type === 'image' && files.length === 0) {
            toast.error('Please upload at least 1 project image')
            return
        }

        if (formData.media_type === 'video' && !video) {
            toast.error('Please upload a project video')
            return
        }
        setLoading(true)
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => data.append(key, value))
        
        if (formData.media_type === 'image') {
            files.forEach((file) => data.append('images',file))
        } else if (video) {
            data.append('video',video)
        }
        try {
            const res = await api.post("/api/accounts/create_project/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
            });

            toast.success(res.data.message)
            refreshCounts() 
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
            toast.error(err.response?.data?.error||'failed to publish project ')

        } finally {
            setLoading(false)
        }
    }

   

  

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white ">

            <div className="max-w-7xl mx-auto px-6 py-12" >
                <div className="mb-12 ">
                    <div className="flex items-center gap-5 mb-6 ">
                        <div className="p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl shadow-purple-500/30 animate-pulse" >
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

                    {isSidebarOpen ? (
                        <div className="space-y-8" >
                            <Content_card
                                formData={formData}
                                handleChange={handleChange}
                                focusField={focusField}
                                setFocusField={setFocusField}
                                errors = {errors}
                            />
                            <Media_section
                                formData={formData}
                                setFormData={setFormData}
                                files={files}
                                setFiles={setFiles}
                                video={video}
                                setVideo={setVideo}
                                handleFileChange={handleFileChange}
                                removeFile={removeFile}
                                removeVideo={removeVideo}
                                handleSubmit={handleSubmit}
                                loading={loading}
                                errors={errors}
                                
                            />
                        </div>
                    ) : (
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8 " >
                                    <Content_card
                                        formData={formData}
                                        handleChange={handleChange}
                                        focusField={focusField}
                                        setFocusField={setFocusField}
                                        errors = {errors}
                                    />
                                </div>    
                                <div className="lg:col-span-1">
                                    <Media_section
                                        formData={formData}
                                        setFormData={setFormData}
                                        files={files}
                                        setFiles={setFiles}
                                        video={video}
                                        setVideo={setVideo}
                                        handleFileChange={handleFileChange}
                                        removeFile={removeFile}
                                        removeVideo={removeVideo}
                                        handleSubmit={handleSubmit}
                                        loading={loading}
                                        errors={errors}
                                        
                                    />

                                </div>
                            </div>
                    )}
                </form>
            </div>
        </div>
    )
}

