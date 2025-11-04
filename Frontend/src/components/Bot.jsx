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

        fullName: "Sayyed Rabeeh (also called Rabeeh, Thangal, Sayyed, or Rabi - multi-version human release 😄)",


    }

    const getBotResponse = (userInput) => {
        const input = userInput.toLowerCase()
        if (input.includes('your name') || input.includes('who are you') || input === 'name') {
            return `I am ${knowledgeBase.fullName}`
        }

    } 
    
    const handleSend = () => {
        
        if (!input.trim()) return 
        const userMessage = { type: 'user', text: 'text' }
        setMessage(prev => [...prev, userMessage])
        
        setTimeout(() => {
            const botResponse = { type: 'bot', text: getBotResponse(input) }
            setMessage(prev =>[...prev,botResponse])
        }, 500)
        setInput('')

    }

    const handleKeyPress = (e) => {
        
        if (e.key === 'enter') {
            handleSend()
        }

    }

    return (
        <>
        ChatBot
        </>
    )
    
}