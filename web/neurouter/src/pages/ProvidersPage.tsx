"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ExternalLink } from "lucide-react"

interface Provider {
  id: string
  name: string
  modelCount: number
  description: string
}

export default function ProvidersPage() {
  const { t } = useTranslation()
  const [providers, setProviders] = useState<Provider[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch the providers from an API
    // For demo purposes, we'll use mock data
    const fetchProviders = async () => {
      setIsLoading(true)
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockProviders: Provider[] = [
        {
          id: "deepinfra",
          name: "DeepInfra",
          modelCount: 46,
          description: "DeepInfra provides access to high-performance AI models with low latency and high reliability.",
        },
        {
          id: "openai",
          name: "OpenAI",
          modelCount: 12,
          description: "OpenAI offers cutting-edge language models and AI tools with a focus on safety and alignment.",
        },
        {
          id: "anthropic",
          name: "Anthropic",
          modelCount: 8,
          description:
            "Anthropic builds reliable, interpretable, and steerable AI systems through their Claude model family.",
        },
        {
          id: "meta",
          name: "Meta AI",
          modelCount: 15,
          description:
            "Meta AI offers the Llama family of open models, designed for responsible development of AI applications.",
        },
        {
          id: "mistral",
          name: "Mistral AI",
          modelCount: 11,
          description:
            "Mistral AI builds state-of-the-art language models with an emphasis on efficiency and performance.",
        },
      ]

      setProviders(mockProviders)
      setIsLoading(false)
    }

    fetchProviders()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t("nav.providers")}</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {providers.map((provider) => (
            <Card key={provider.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-primary font-bold">
                      {provider.name.charAt(0)}
                    </div>
                    <div>
                      <Link
                        to={`/providers/${provider.id}`}
                        className="text-xl font-semibold hover:text-primary transition-colors"
                      >
                        {provider.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{provider.modelCount} models</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/providers/${provider.id}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                    </Link>
                  </Button>
                </div>
                <p className="mt-4 text-muted-foreground">{provider.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
