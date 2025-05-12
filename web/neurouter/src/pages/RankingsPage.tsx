"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../components/ui/button"
import { Info, ChevronRight, ChevronDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

interface ModelRanking {
  id: string
  name: string
  provider: string
  description: string
  tokens: string
  tokenValue: number
  growth: string
  growthValue: number
  path?: string
}

interface ChartDataPoint {
  date: string
  [key: string]: string | number
}

type Category =
  | "All Categories"
  | "Roleplay"
  | "Programming"
  | "Marketing"
  | "Marketing/Seo"
  | "Technology"
  | "Science"
  | "Translation"
  | "Legal"
  | "Finance"
  | "Health"
  | "Trivia"
  | "Academia"

export default function RankingsPage() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<Category>("All Categories")
  const [timeRange, setTimeRange] = useState("Top today")
  const [rankingData, setRankingData] = useState<ModelRanking[]>([])
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Categories for filtering
  const categories: Category[] = [
    "All Categories",
    "Roleplay",
    "Programming",
    "Marketing",
    "Marketing/Seo",
    "Technology",
    "Science",
    "Translation",
    "Legal",
    "Finance",
    "Health",
    "Trivia",
    "Academia",
  ]

  // Time range options
  const timeRanges = ["Top today", "This week", "This month", "All time"]

  // Generate mock chart data
  useEffect(() => {
    const generateChartData = () => {
      const data: ChartDataPoint[] = []
      const startDate = new Date(2023, 4, 13) // May 13, 2023
      const endDate = new Date(2024, 3, 21) // April 21, 2024

      // Model names and their base values
      const models = {
        "GPT-4o-mini": 10,
        "Gemini 2.0": 8,
        "Claude 3.7": 7,
        "Gemini 2.5": 6,
        "Llama 3": 5,
        Mistral: 4,
        "DeepSeek V3": 3,
        Other: 2,
      }

      // Generate data points for each date
      let currentDate = new Date(startDate)
      while (currentDate <= endDate) {
        const point: ChartDataPoint = {
          date: currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        }

        // Calculate growing values for each model
        const progress = (currentDate.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())
        const multiplier = Math.pow(progress, 1.5) * 100 + 1 // Non-linear growth with higher values

        Object.entries(models).forEach(([model, baseValue]) => {
          // Add some randomness to make the chart look more natural
          const randomFactor = 0.8 + Math.random() * 0.4
          point[model] = Math.round(baseValue * multiplier * randomFactor)
        })

        data.push(point)

        // Move to next date (add 14 days)
        const nextDate = new Date(currentDate)
        nextDate.setDate(nextDate.getDate() + 14)
        currentDate = nextDate
      }

      return data
    }

    const mockRankingData: ModelRanking[] = [
      {
        id: "gpt-4o-mini",
        name: "GPT-4o-mini",
        provider: "OpenAI",
        description: "GPT-4o mini is OpenAI's newest model after [GPT-4 Omni](/models/...",
        tokens: "42.9B",
        tokenValue: 42.9,
        growth: "+7%",
        growthValue: 7,
        path: "openai/gpt-4o-mini",
      },
      {
        id: "gemini-2-flash",
        name: "Gemini 2.0 Flash",
        provider: "Google",
        description: "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT)...",
        tokens: "32.5B",
        tokenValue: 32.5,
        growth: "+2%",
        growthValue: 2,
        path: "google/gemini-2-flash",
      },
      {
        id: "claude-3-7-sonnet",
        name: "Claude 3.7 Sonnet",
        provider: "Anthropic",
        description: "Claude 3.7 Sonnet is an advanced large language model with improv...",
        tokens: "28.6B",
        tokenValue: 28.6,
        growth: "+3%",
        growthValue: 3,
        path: "anthropic/claude-3-7-sonnet",
      },
      {
        id: "gemini-2-5-flash",
        name: "Gemini 2.5 Flash Preview",
        provider: "Google",
        description: "Gemini 2.5 Flash is Google's state-of-the-art workhorse model, spe...",
        tokens: "23.9B",
        tokenValue: 23.9,
        growth: "+19%",
        growthValue: 19,
        path: "google/gemini-2-5-flash-preview",
      },
      {
        id: "gemini-2-5-pro",
        name: "Gemini 2.5 Pro Experimental",
        provider: "Google",
        description: "Gemini 2.5 Pro is Google's state-of-the-art AI model designed for ad...",
        tokens: "14B",
        tokenValue: 14,
        growth: "+5%",
        growthValue: 5,
        path: "google/gemini-2-5-pro-experimental",
      },
      {
        id: "deepseek-v3",
        name: "DeepSeek V3 0324 (free)",
        provider: "DeepSeek",
        description: "DeepSeek V3, a 68B-parameter, mixture-of-experts model, is the l...",
        tokens: "13.2B",
        tokenValue: 13.2,
        growth: "+5%",
        growthValue: 5,
        path: "deepseek/deepseek-v3-0324-free",
      },
    ]

    setChartData(generateChartData())
    setRankingData(mockRankingData)
    setIsLoading(false)
  }, [])

  // Filter ranking data based on selected category
  const filteredRankingData = rankingData
  // In a real app, we would filter based on the selected category
  // For now, we'll just use all the data

  // Generate colors for the chart
  const generateColors = () => {
    return [
      "#FF6B6B", // Red
      "#4ECDC4", // Teal
      "#FFD166", // Yellow
      "#6A0572", // Purple
      "#1A936F", // Green
      "#3D5A80", // Blue
      "#F18F01", // Orange
      "#C5CBE3", // Light Blue
    ]
  }

  const colors = generateColors()

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">LLM Rankings</h1>
        <p className="text-center text-muted-foreground flex items-center justify-center gap-1">
          Compare models for all prompts
          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="mb-12 border p-4 rounded-lg bg-card">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis
                    tickFormatter={(value) => {
                      if (value === 0) return "0"
                      if (value < 1000) return `${value}B`
                      if (value < 2000) return `${(value / 1000).toFixed(2)}T`
                      return `${(value / 1000).toFixed(1)}T`
                    }}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value}B tokens`, name]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  {Object.keys(chartData[0] || {})
                    .filter((key) => key !== "date")
                    .map((key, index) => (
                      <Bar key={key} dataKey={key} stackId="a" fill={colors[index % colors.length]} name={key} />
                    ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Leaderboard</h2>
                <span className="text-sm text-muted-foreground">Token usage across models</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    {timeRange}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {timeRanges.map((range) => (
                    <DropdownMenuItem key={range} onClick={() => setTimeRange(range)}>
                      {range}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-4">
              {filteredRankingData.map((model, index) => (
                <div key={model.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-lg font-semibold text-muted-foreground">{index + 1}.</div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{model.provider}:</span>
                          <span className="font-semibold">{model.name}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{model.tokens} tokens</div>
                      <div className={`text-sm ${model.growthValue > 0 ? "text-green-500" : "text-red-500"}`}>
                        {model.growth}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
