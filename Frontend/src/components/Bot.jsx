import React, { useState, useEffect, useRef } from "react";
import { MessageCircle,X,Send } from "lucide-react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState([
        {
            type: 'bot',
            text: "Hey there! 👋 I'm Sayyed Rabeeh's AI assistant. Ask me anything about Sayyed - from tech skills to favorite food, I know it all!"
        }
    ])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior:'smooth'})
    }

    useEffect(() => {
        scrollToBottom()
    }, [message])
    
    const knowledgeBase = {

    }

    return (
        <>
        ChatBot
        </>
    )
    
}