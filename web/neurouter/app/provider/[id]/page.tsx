"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowUp, ExternalLink, Copy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { providersData } from "./data"
import type { ProviderData } from "./types"

export default function ProviderDetailPage() {
  const { id } = useParams()
  const [provider, setProvider] = useState<ProviderData | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from an API
    if (typeof id === "string" && providersData[id]) {
      setProvider(providersData[id])
    }
  }, [id])

  if (!provider) {
    return (
      <div className="container py-8 flex items-center justify-center">
        <p>Provider not found</p>
      </div>
    )
  }

  const formatYAxis = (value: number) => {
    if (value === 0) return "0"
    if (value < 1) return `${value * 1000}M`
    return `${value}B`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <div className="space-y-1 mt-2">
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-sm flex items-center">
                <span className="w-3 h-3 inline-block mr-2" style={{ backgroundColor: entry.color }}></span>
                {entry.name}: {entry.value.toFixed(2)}B
              </p>
            ))}
            {payload[0]?.payload?.total && (
              <div className="border-t pt-1 mt-1">
                <p className="text-sm font-medium">Total: {payload[0].payload.total.toFixed(2)}B</p>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="container py-8">
      <div className="flex items-start gap-2 mb-2">
        <ArrowUp className="h-5 w-5 text-green-500" />
        <h1 className="text-3xl font-bold">{provider.name}</h1>
      </div>

      <p className="mb-6 text-muted-foreground">
        Browse models provided by {provider.name} (
        <Link href={provider.termsOfServiceUrl} className="text-primary hover:underline" target="_blank">
          Terms of Service
        </Link>
        )<span className="float-right font-medium">{provider.modelCount} models</span>
      </p>

      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2">Tokens processed</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={provider.tokenUsage}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              stackOffset="normal"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="embedding" stackId="a" fill="#8884d8" name="Embedding" />
              <Bar dataKey="prompt" stackId="a" fill="#ff7eb9" name="Prompt" />
              <Bar dataKey="input" stackId="a" fill="#ffa600" name="Input" />
              <Bar dataKey="completion" stackId="a" fill="#7fc97f" name="Completion" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
        {provider.models.map((model) => (
          <Card key={model.id} className="overflow-hidden hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Link href={`/model/${model.id}`} className="group">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{model.name}</h3>
                </Link>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-2">{model.description}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span className="text-foreground font-medium mr-1">by</span>
                  <Link href={`/provider/${provider.id}`} className="hover:text-primary">
                    {provider.name.toLowerCase()}
                  </Link>
                </div>
                <div>{model.context} context</div>
                <div>{model.inputTokens} input tokens</div>
                <div>{model.outputTokens} output tokens</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
