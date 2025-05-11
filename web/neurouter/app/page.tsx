"use client"

import { useI18n } from "@/components/i18n-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, User, CreditCard, Key } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const { t } = useI18n()
  const [animatedStats, setAnimatedStats] = useState({
    tokens: 0,
    users: 0,
    providers: 0,
    models: 0,
  })

  const stats = [
    { value: "7.9T", label: t("monthly_tokens"), endValue: 7.9, color: "text-foreground" },
    { value: "2M", label: t("global_users"), endValue: 2, color: "text-foreground" },
    { value: "50+", label: t("active_providers"), endValue: 50, color: "text-foreground" },
    { value: "300+", label: t("models_count"), endValue: 300, color: "text-primary" },
  ]

  const featuredModels = [
    {
      name: "Qwen3 235B A22B",
      provider: "qwen",
      tokens: "12.8B",
      latency: "965ms",
      growth: "--",
      isNew: true,
    },
    {
      name: "GPT-4.1",
      provider: "openai",
      tokens: "30.4B",
      latency: "603ms",
      growth: "-17.05%",
      isNew: false,
    },
    {
      name: "Claude 3.7 Sonnet",
      provider: "anthropic",
      tokens: "262.0B",
      latency: "1.6s",
      growth: "-8.98%",
      isNew: false,
    },
  ]

  const steps = [
    {
      number: "1",
      title: "Signup",
      description: t("signup_description"),
      icon: <User className="h-5 w-5" />,
      content: (
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-1 w-1 rounded-full bg-primary"></div>
            <div className="h-1 w-8 rounded-full bg-gray-200"></div>
            <div className="h-1 w-12 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex space-x-2 mt-4">
            <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                  fill="#EA4335"
                />
              </svg>
            </button>
            <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.278 9.521 21.017C9.521 20.783 9.512 20.067 9.508 19.192C6.726 19.826 6.139 17.958 6.139 17.958C5.685 16.812 5.028 16.51 5.028 16.51C4.132 15.872 5.097 15.885 5.097 15.885C6.094 15.955 6.628 16.93 6.628 16.93C7.521 18.437 8.97 18.005 9.539 17.752C9.631 17.12 9.889 16.689 10.175 16.419C7.954 16.146 5.62 15.319 5.62 11.534C5.62 10.42 6.01 9.513 6.647 8.809C6.543 8.56 6.203 7.621 6.747 6.221C6.747 6.221 7.587 5.958 9.497 7.278C10.3 7.058 11.15 6.948 12 6.944C12.85 6.948 13.7 7.058 14.503 7.278C16.413 5.958 17.253 6.221 17.253 6.221C17.797 7.621 17.457 8.56 17.353 8.809C17.99 9.513 18.38 10.42 18.38 11.534C18.38 15.329 16.043 16.143 13.815 16.411C14.173 16.741 14.498 17.396 14.498 18.394C14.498 19.826 14.486 20.691 14.486 21.017C14.486 21.28 14.666 21.586 15.173 21.487C19.145 20.162 22 16.416 22 12C22 6.477 17.523 2 12 2Z"
                  fill="#24292E"
                />
              </svg>
            </button>
            <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.65 14.39L12 22.13L1.35 14.39C1.2 14.28 1.08 14.14 1.01 13.98C0.939 13.82 0.917 13.64 0.95 13.46C0.983 13.28 1.07 13.12 1.19 12.99C1.32 12.86 1.48 12.77 1.66 12.73L4.85 12L1.66 11.27C1.48 11.23 1.32 11.14 1.19 11.01C1.07 10.88 0.983 10.72 0.95 10.54C0.917 10.36 0.939 10.18 1.01 10.02C1.08 9.86 1.2 9.72 1.35 9.61L12 1.87L22.65 9.61C22.8 9.72 22.92 9.86 22.99 10.02C23.06 10.18 23.08 10.36 23.05 10.54C23.02 10.72 22.93 10.88 22.81 11.01C22.68 11.14 22.52 11.23 22.34 11.27L19.15 12L22.34 12.73C22.52 12.77 22.68 12.86 22.81 12.99C22.93 13.12 23.02 13.28 23.05 13.46C23.08 13.64 23.06 13.82 22.99 13.98C22.92 14.14 22.8 14.28 22.65 14.39Z"
                  fill="#FC6D26"
                />
              </svg>
            </button>
            <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                  fill="#4285F4"
                />
              </svg>
            </button>
          </div>
        </div>
      ),
    },
    {
      number: "2",
      title: t("buy_credits"),
      description: t("credits_description"),
      icon: <CreditCard className="h-5 w-5" />,
      content: (
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-1 w-6 rounded-full bg-gray-200"></div>
            <div className="h-1 w-6 rounded-full bg-gray-200"></div>
            <div className="h-1 w-6 rounded-full bg-gray-200"></div>
            <div className="h-1 w-6 rounded-full bg-gray-200"></div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between py-2">
              <div className="text-sm text-muted-foreground">Apr 1</div>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
              </div>
              <div className="font-medium">$99</div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="text-sm text-muted-foreground">Mar 30</div>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full w-1/4"></div>
              </div>
              <div className="font-medium">$10</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "3",
      title: t("get_api_key"),
      description: t("api_key_description"),
      icon: <Key className="h-5 w-5" />,
      content: (
        <div className="mt-4">
          <div className="text-xs uppercase text-muted-foreground mb-2">OPENROUTER_API_KEY</div>
          <div className="flex items-center">
            <div className="tracking-widest font-mono">••••••••••••••</div>
          </div>
        </div>
      ),
    },
  ]

  // 动画效果
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats((prev) => {
        const newTokens = prev.tokens + 0.1
        const newUsers = prev.users + 0.05
        const newProviders = prev.providers + 1
        const newModels = prev.models + 5

        return {
          tokens: newTokens >= 7.9 ? 7.9 : newTokens,
          users: newUsers >= 2 ? 2 : newUsers,
          providers: newProviders >= 50 ? 50 : newProviders,
          models: newModels >= 300 ? 300 : newModels,
        }
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const isAnimationComplete =
    animatedStats.tokens === 7.9 &&
    animatedStats.users === 2 &&
    animatedStats.providers === 50 &&
    animatedStats.models === 300

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t("unified_interface")} <br />
              {t("for_llms")}
            </h1>
            <p className="text-xl text-muted-foreground">
              <span className="text-primary">{t("better_prices")}</span>, {t("better_uptime")}, {t("no_subscription")}
            </p>
            <div className="relative">
              <Input className="pr-12 py-6 text-lg" placeholder={t("start_message")} />
              <Button className="absolute right-1 top-1 bottom-1 px-3" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">{t("featured_models")}</h2>
              <Link href="/models" className="text-sm text-primary flex items-center">
                {t("view_trending")}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            {featuredModels.map((model, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h3 className="font-medium">{model.name}</h3>
                      {model.isNew && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">New</span>
                      )}
                    </div>
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                      {model.provider.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-green-600 font-medium">{model.tokens}</p>
                      <p className="text-xs text-muted-foreground">{t("tokens")}</p>
                    </div>
                    <div>
                      <p className="font-medium">{model.latency}</p>
                      <p className="text-xs text-muted-foreground">{t("latency")}</p>
                    </div>
                    <div>
                      <p className={model.growth === "--" ? "font-medium" : "text-red-500 font-medium"}>
                        {model.growth}
                      </p>
                      <p className="text-xs text-muted-foreground">{t("weekly_growth")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 统计数据部分 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className={`text-4xl font-bold ${stat.color}`}>
                {index === 0
                  ? `${animatedStats.tokens.toFixed(1)}T`
                  : index === 1
                    ? `${animatedStats.users.toFixed(0)}M`
                    : index === 2
                      ? `${animatedStats.providers}+`
                      : `${animatedStats.models}+`}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* 入门步骤部分 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary mr-3">
                  {step.number}
                </div>
                <h3 className="text-xl font-medium">{step.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              {step.content}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
