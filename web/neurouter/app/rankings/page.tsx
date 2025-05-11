"use client"

import { useState } from "react"
import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function RankingsPage() {
  const { t } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [timeRange, setTimeRange] = useState("today")

  // 类别数据
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "roleplay", name: "Roleplay" },
    { id: "programming", name: "Programming" },
    { id: "marketing", name: "Marketing" },
    { id: "marketing_seo", name: "Marketing/Seo" },
    { id: "technology", name: "Technology" },
    { id: "science", name: "Science" },
    { id: "translation", name: "Translation" },
    { id: "legal", name: "Legal" },
    { id: "finance", name: "Finance" },
    { id: "health", name: "Health" },
    { id: "trivia", name: "Trivia" },
    { id: "academia", name: "Academia" },
  ]

  // 图表数据
  const chartData = [
    { date: "May 13", tokens: 50, gpt: 20, claude: 15, gemini: 10, other: 5 },
    { date: "Jun 1", tokens: 100, gpt: 40, claude: 30, gemini: 20, other: 10 },
    { date: "Jul 15", tokens: 200, gpt: 80, claude: 60, gemini: 40, other: 20 },
    { date: "Aug 15", tokens: 300, gpt: 120, claude: 90, gemini: 60, other: 30 },
    { date: "Sep 1", tokens: 400, gpt: 160, claude: 120, gemini: 80, other: 40 },
    { date: "Oct 7", tokens: 500, gpt: 200, claude: 150, gemini: 100, other: 50 },
    { date: "Nov 25", tokens: 700, gpt: 280, claude: 210, gemini: 140, other: 70 },
    { date: "Dec 20", tokens: 900, gpt: 360, claude: 270, gemini: 180, other: 90 },
    { date: "Jan 13", tokens: 1100, gpt: 440, claude: 330, gemini: 220, other: 110 },
    { date: "Feb 10", tokens: 1400, gpt: 560, claude: 420, gemini: 280, other: 140 },
    { date: "Mar 3", tokens: 1650, gpt: 660, claude: 495, gemini: 330, other: 165 },
    { date: "Apr 21", tokens: 2200, gpt: 880, claude: 660, gemini: 440, other: 220 },
  ]

  // 排行榜数据
  const leaderboardData = [
    {
      id: 1,
      name: "OpenAI: GPT-4o-mini",
      provider: "OpenAI",
      tokens: "44.6B",
      change: -2,
      description: "GPT-4o mini is OpenAI's newest model after [GPT-4 Omni]",
    },
    {
      id: 2,
      name: "Anthropic: Claude 3.7 Sonnet",
      provider: "Anthropic",
      tokens: "38.3B",
      change: -4,
      description: "Claude 3.7 Sonnet is an advanced large language model with improved reasoning",
    },
    {
      id: 3,
      name: "Google: Gemini 2.0 Flash",
      provider: "Google",
      tokens: "33.2B",
      change: 1,
      description: "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT)",
    },
    {
      id: 4,
      name: "Google: Gemini 2.5 Flash Preview",
      provider: "Google",
      tokens: "17.5B",
      change: 6,
      description: "Gemini 2.5 Flash is Google's state-of-the-art workhorse model, specialized for",
    },
    {
      id: 5,
      name: "Google: Gemini 2.5 Pro Experimental",
      provider: "Google",
      tokens: "14.4B",
      change: 1,
      description: "Gemini 2.5 Pro is Google's state-of-the-art AI model designed for advanced",
    },
    {
      id: 6,
      name: "DeepSeek: DeepSeek V3 0324",
      provider: "DeepSeek",
      tokens: "12.9B",
      change: 0,
      description: "DeepSeek V3, a 68B+ parameter, mixture-of-experts model, is the latest",
    },
  ]

  const timeRangeOptions = [
    { id: "today", name: "Top today" },
    { id: "week", name: "Top this week" },
    { id: "month", name: "Top this month" },
    { id: "year", name: "Top this year" },
    { id: "all", name: "All time" },
  ]

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">LLM Rankings</h1>
        <div className="flex items-center justify-center text-muted-foreground">
          <span>Compare models for all prompts</span>
          <InfoIcon className="h-4 w-4 ml-1" />
        </div>
      </div>

      {/* 类别筛选 */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* 图表 */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGpt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClaude" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4D96FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4D96FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGemini" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6BCB77" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6BCB77" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOther" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD93D" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFD93D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={(value) => {
                    if (value >= 1000) return `${value / 1000}T`
                    return `${value}B`
                  }}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="other"
                  stackId="1"
                  stroke="#FFD93D"
                  fillOpacity={1}
                  fill="url(#colorOther)"
                />
                <Area
                  type="monotone"
                  dataKey="gemini"
                  stackId="1"
                  stroke="#6BCB77"
                  fillOpacity={1}
                  fill="url(#colorGemini)"
                />
                <Area
                  type="monotone"
                  dataKey="claude"
                  stackId="1"
                  stroke="#4D96FF"
                  fillOpacity={1}
                  fill="url(#colorClaude)"
                />
                <Area
                  type="monotone"
                  dataKey="gpt"
                  stackId="1"
                  stroke="#FF6B6B"
                  fillOpacity={1}
                  fill="url(#colorGpt)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 排行榜 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M15 8h.01" />
            <path d="M11 8h.01" />
            <path d="M7 8h.01" />
            <path d="M7 12h.01" />
            <path d="M7 16h.01" />
            <path d="M11 12h.01" />
            <path d="M15 12h.01" />
            <path d="M11 16h.01" />
            <path d="M15 16h.01" />
          </svg>
          <h2 className="text-xl font-semibold">Leaderboard</h2>
          <Badge variant="outline" className="ml-2">
            Token usage across models
          </Badge>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRangeOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {leaderboardData.map((model) => (
          <Card key={model.id} className="overflow-hidden hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center">
                <span className="text-xl font-bold text-muted-foreground w-8">{model.id}.</span>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-lg">{model.name}</h3>
                    <ChevronRight className="h-4 w-4 ml-1 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{model.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{model.tokens} tokens</p>
                  <p
                    className={`text-sm ${
                      model.change > 0 ? "text-green-500" : model.change < 0 ? "text-red-500" : "text-muted-foreground"
                    }`}
                  >
                    {model.change > 0 ? "↑" : model.change < 0 ? "↓" : ""}
                    {model.change !== 0 ? `${Math.abs(model.change)}%` : "0%"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
