"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Plus, Send, MoreVertical, Settings, Search, PaperclipIcon, FileText, Keyboard } from "lucide-react"
import { Badge } from "../components/ui/badge"
import ChatSidebar from "../components/chat/ChatSidebar"
import ChatMessage from "../components/chat/ChatMessage"
import ModelSelector from "../components/chat/ModelSelector"

interface ChatRoom {
  id: string
  name: string
  lastMessage?: string
  timestamp?: string
  isActive?: boolean
}

interface ChatMessageType {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  model?: string
}

interface SuggestionPrompt {
  title: string
  description: string
}

export default function ChatPage() {
  const { t } = useTranslation()
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    { id: "new", name: "New Room", isActive: true },
    { id: "my-new-room", name: "My New Room" },
  ])
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [selectedModel, setSelectedModel] = useState("Auto Router")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestionPrompts: SuggestionPrompt[] = [
    { title: "Advanced", description: "Ask about any topic or location." },
    { title: "9.9 vs 9.11", description: "Which one is larger?" },
    { title: "Strawberry Test", description: "How many r's are in the word" },
    { title: "Poem Riddle", description: "Compose a 12-line poem" },
    { title: "Personal Bio", description: "Draft up a personal bio" },
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Update the active room with last message
    setChatRooms((prev) =>
      prev.map((room) =>
        room.isActive ? { ...room, lastMessage: inputMessage, timestamp: new Date().toLocaleString() } : room,
      ),
    )

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response to: "${inputMessage}"`,
        sender: "assistant",
        timestamp: new Date(),
        model: selectedModel,
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const createNewRoom = () => {
    const newRoom: ChatRoom = {
      id: `room-${Date.now()}`,
      name: "New Room",
      isActive: true,
    }

    // Set all rooms to inactive and add new room
    setChatRooms((prev) => [newRoom, ...prev.map((room) => ({ ...room, isActive: false }))])

    // Clear messages for new room
    setMessages([])
  }

  const selectRoom = (roomId: string) => {
    setChatRooms((prev) =>
      prev.map((room) => ({
        ...room,
        isActive: room.id === roomId,
      })),
    )

    // In a real app, we would load messages for the selected room
    // For now, just clear messages if it's a new room
    if (roomId === "new") {
      setMessages([])
    }
  }

  return (
    <div className="flex h-[calc(100vh-12.5rem)]">
      {/* Sidebar - Chat Rooms */}
      <ChatSidebar rooms={chatRooms} onRoomSelect={selectRoom} onNewRoom={createNewRoom} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">To:</span>
            <ModelSelector selectedModel={selectedModel} onModelSelect={setSelectedModel} />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add model
              <Badge variant="outline" className="ml-1">
                ⌘ K
              </Badge>
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <h2 className="text-2xl font-bold mb-2">Start a new conversation</h2>
              <p className="text-muted-foreground mb-8">
                Choose a model and start chatting, or try one of the suggestions below.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                sender={message.sender}
                timestamp={message.timestamp}
                model={message.model}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Prompts */}
        {messages.length === 0 && (
          <div className="grid grid-cols-5 gap-2 p-4 border-t">
            {suggestionPrompts.map((prompt, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => {
                  setInputMessage(prompt.title)
                }}
              >
                <div className="font-medium truncate">{prompt.title}</div>
                <div className="text-xs text-muted-foreground truncate">{prompt.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="border-t p-3">
          <div className="flex items-center gap-2 border rounded-lg bg-background">
            <div className="flex items-center p-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">Web Search</span>
            </div>

            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Start a message..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="flex items-center gap-2 pr-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 px-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground">
                New Room
                <FileText className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <Keyboard className="h-3 w-3 inline mr-1" />
              Press Enter to send
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
