"use client"

import { useTranslation } from "react-i18next"
import { ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { useEffect, useState } from "react"

interface Model {
  id: string
  name: string
  provider: string
  tokens_per_week: number
  latency: number
  growth: number
  isNew?: boolean
}

interface Stats {
  monthlyTokens: string
  globalUsers: string
  activeProviders: number
  models: number
}

export default function HomePage() {
  const { t } = useTranslation()
  const [featuredModels, setFeaturedModels] = useState<Model[]>([])
  const [stats, setStats] = useState<Stats>({
    monthlyTokens: "7.9T",
    globalUsers: "2M",
    activeProviders: 50,
    models: 300,
  })
  const [message, setMessage] = useState("")

  // Simulate API call to get featured models
  useEffect(() => {
    // In a real app, we would call the API
    // modelsAPI.getFeaturedModels().then(response => setFeaturedModels(response.data))

    // For demo purposes, we'll use mock data
    setFeaturedModels([
      {
        id: "1",
        name: "Qwen3 235B A22B",
        provider: "qwen",
        tokens_per_week: 14.1,
        latency: 979,
        growth: 53.78,
        isNew: true,
      },
      {
        id: "2",
        name: "GPT-4.1",
        provider: "openai",
        tokens_per_week: 33.2,
        latency: 603,
        growth: -2.69,
      },
      {
        id: "3",
        name: "Claude 3.7 Sonnet",
        provider: "anthropic",
        tokens_per_week: 274.6,
        latency: 1.7,
        growth: -4.61,
      },
    ])
  }, [])

  const handleSendMessage = () => {
    if (!message.trim()) return
    // In a real app, we would call the API
    // chatAPI.sendMessage(message, selectedModel).then(...)
    console.log("Sending message:", message)
    setMessage("")
  }

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{t("app.tagline")}</h1>
          <p className="text-xl text-muted-foreground">{t("app.subtitle")}</p>
          <div className="flex items-center gap-2 mt-8">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("home.startMessage")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button onClick={handleSendMessage}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t("home.featuredModels")}</h2>
            <Button variant="link" className="text-sm">
              {t("home.viewTrending")}
            </Button>
          </div>

          <div className="space-y-4">
            {featuredModels.map((model) => (
              <Card key={model.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{model.name}</h3>
                        {model.isNew && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {t("models.new")}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">by {model.provider}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {model.provider.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("models.tokens")}</p>
                      <p className="font-medium">{model.tokens_per_week}B</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("models.latency")}</p>
                      <p className="font-medium">{model.latency}ms</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("models.growth")}</p>
                      <p className={`font-medium ${model.growth > 0 ? "text-green-500" : "text-red-500"}`}>
                        {model.growth > 0 ? "+" : ""}
                        {model.growth.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b">
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold">{stats.monthlyTokens}</p>
          <p className="text-sm text-muted-foreground">{t("home.stats.monthlyTokens")}</p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold">{stats.globalUsers}</p>
          <p className="text-sm text-muted-foreground">{t("home.stats.globalUsers")}</p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold">{stats.activeProviders}+</p>
          <p className="text-sm text-muted-foreground">{t("home.stats.activeProviders")}</p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-primary">{stats.models}+</p>
          <p className="text-sm text-muted-foreground">{t("home.stats.models")}</p>
        </div>
      </section>
    </div>
  )
}
