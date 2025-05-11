"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useI18n } from "@/components/i18n-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Settings, Key, Code, Terminal, Trash, Send, Clock, MessageSquare } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  tokens?: {
    input: number
    output: number
    total: number
  }
}

export default function ChatPage() {
  const { t } = useI18n()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "在吗！有什么可以帮您的吗？ 😊",
      timestamp: new Date(),
      tokens: {
        input: 10,
        output: 10,
        total: 20,
      },
    },
  ])
  const [input, setInput] = useState("")
  const [selectedApiKey, setSelectedApiKey] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedEndpoint, setSelectedEndpoint] = useState("/v1/chat/completions")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const apiKeys = [
    { id: "openai", name: "OpenAI API Key" },
    { id: "anthropic", name: "Anthropic API Key" },
    { id: "custom", name: "自定义 API Key" },
  ]

  const models = [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" },
    { id: "llama-3-70b", name: "Llama 3 70B" },
    { id: "qwen3-72b", name: "Qwen3 72B" },
  ]

  const endpoints = [
    { id: "/v1/chat/completions", name: "/v1/chat/completions" },
    { id: "/v1/completions", name: "/v1/completions" },
    { id: "/v1/embeddings", name: "/v1/embeddings" },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // 模拟 API 调用
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `这是来自 ${models.find((m) => m.id === selectedModel)?.name || "AI"} 的回复。您的消息是: "${input}"`,
        timestamp: new Date(),
        tokens: {
          input: Math.floor(input.length / 2),
          output: Math.floor(input.length * 1.5),
          total: Math.floor(input.length * 2.5),
        },
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "在吗！有什么可以帮您的吗？ 😊",
        timestamp: new Date(),
        tokens: {
          input: 10,
          output: 10,
          total: 20,
        },
      },
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  return (
    <div className="container py-4 grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-3.5rem)]">
      {/* 左侧设置面板 */}
      <div className="md:col-span-1">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              聊天设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium">
                <Key className="h-4 w-4 mr-2" />
                API 密钥来源
              </div>
              <Select value={selectedApiKey} onValueChange={setSelectedApiKey}>
                <SelectTrigger>
                  <SelectValue placeholder="选择 API 密钥" />
                </SelectTrigger>
                <SelectContent>
                  {apiKeys.map((key) => (
                    <SelectItem key={key.id} value={key.id}>
                      {key.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium">
                <Code className="h-4 w-4 mr-2" />
                选择模型
              </div>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="选择模型" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium">
                <Terminal className="h-4 w-4 mr-2" />
                终端类型
              </div>
              <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                <SelectTrigger>
                  <SelectValue placeholder="选择终端类型" />
                </SelectTrigger>
                <SelectContent>
                  {endpoints.map((endpoint) => (
                    <SelectItem key={endpoint.id} value={endpoint.id}>
                      {endpoint.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full flex items-center justify-center" onClick={clearChat}>
              <Trash className="h-4 w-4 mr-2" />
              清除聊天记录
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 右侧聊天区域 */}
      <div className="md:col-span-3">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />与 AI 聊天
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
            <div className="flex flex-col p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.role === "user" ? "" : ""}`}>
                    <div className="mb-1 text-sm font-medium">{message.role === "user" ? "您" : "助手"}</div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.tokens && (
                        <div className="mt-2 text-xs opacity-70 flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          <Separator orientation="vertical" className="h-3" />
                          <span>输入: {message.tokens.input}</span>
                          <Separator orientation="vertical" className="h-3" />
                          <span>输出: {message.tokens.output}</span>
                          <Separator orientation="vertical" className="h-3" />
                          <span>总计: {message.tokens.total}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              <Textarea
                ref={textareaRef}
                className="flex-1 min-h-[60px] resize-none"
                placeholder="输入你的消息... (Shift+Enter 换行)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()} className="h-[60px] px-4">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
