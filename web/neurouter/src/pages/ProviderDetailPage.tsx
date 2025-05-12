"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { ExternalLink, Copy } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Model {
    id: string
    name: string
    description: string
    provider: string
    providerId: string
    contextLength: number
    inputTokenPrice: number
    outputTokenPrice: number
    parameters: string
}

interface ProviderData {
    id: string
    name: string
    logo?: string
    description: string
    modelCount: number
    tokensProcessed: string
    termsOfService: string
    models: Model[]
    usageData: { date: string; tokens: number;[key: string]: any }[]
}

export default function ProviderDetailPage() {
    const { t } = useTranslation()
    const { providerId } = useParams<{ providerId: string }>()
    const [provider, setProvider] = useState<ProviderData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // In a real app, we would fetch the provider data from an API
        // For demo purposes, we'll use mock data
        const fetchProviderData = async () => {
            setIsLoading(true)
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 500))

            // Generate usage data for the past 90 days
            const generateUsageData = () => {
                const today = new Date()
                const data = []
                const modelNames = ["GPT-4", "Claude 3", "Llama 3", "Mistral", "Gemini", "Phi-3"]

                for (let i = 90; i >= 0; i--) {
                    const date = new Date()
                    date.setDate(today.getDate() - i)
                    const formattedDate = date.toISOString().split("T")[0]

                    // Create random usage data
                    const baseTokens = Math.random() * 10 + 5 // Base between 5B and 15B

                    // Create entry with date and total tokens
                    const entry: Record<string, any> = {
                        date: formattedDate,
                        displayDate: `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`,
                        tokens: baseTokens,
                    }

                    // Add random values for each model
                    let remainingTokens = baseTokens
                    for (let j = 0; j < modelNames.length - 1; j++) {
                        const modelTokens = Math.random() * remainingTokens * 0.5
                        entry[modelNames[j]] = modelTokens
                        remainingTokens -= modelTokens
                    }
                    // Last model gets the remainder
                    entry[modelNames[modelNames.length - 1]] = remainingTokens

                    data.push(entry)
                }

                return { data, modelNames }
            }

            const { data: usageData, modelNames } = generateUsageData()

            // Create mock provider data
            const mockProvider: ProviderData = {
                id: "deepinfra",
                name: "DeepInfra",
                description: "DeepInfra provides access to high-performance AI models with low latency and high reliability.",
                modelCount: 46,
                tokensProcessed: "26B",
                termsOfService: "https://deepinfra.com/legal/terms",
                usageData,
                models: [
                    {
                        id: "phi-4-reasoning-plus",
                        name: "Microsoft: Phi 4 Reasoning Plus",
                        description:
                            "Phi-4-reasoning-plus is an enhanced 14B parameter model from Microsoft, fine-tuned from Phi-4 with additional reinforcement learning to boost accuracy on math, science, and code reasoning tasks.",
                        provider: "microsoft",
                        providerId: "microsoft",
                        contextLength: 33000,
                        inputTokenPrice: 0.07,
                        outputTokenPrice: 0.35,
                        parameters: "14B",
                    },
                    {
                        id: "deepseek-prover-v2",
                        name: "DeepSeek: DeepSeek Prover V2",
                        description:
                            "DeepSeek Prover V2 is a 671B parameter model, speculated to be geared towards logic and mathematics. Likely an upgrade from DeepSeek-Prover-V1.5 Not much is known about the model other than that it is named DeepSeek Prover V2 and the approximate parameter count of 671B.",
                        provider: "deepseek",
                        providerId: "deepseek",
                        contextLength: 164000,
                        inputTokenPrice: 0.7,
                        outputTokenPrice: 2.18,
                        parameters: "671B",
                    },
                    {
                        id: "llama3-70b",
                        name: "Meta: Llama 3 70B",
                        description:
                            "Llama 3 70B is Meta's latest flagship large language model, offering state-of-the-art performance across a wide range of tasks.",
                        provider: "meta",
                        providerId: "meta",
                        contextLength: 128000,
                        inputTokenPrice: 0.15,
                        outputTokenPrice: 0.45,
                        parameters: "70B",
                    },
                    {
                        id: "mistral-medium",
                        name: "Mistral: Mistral Medium",
                        description:
                            "Mistral Medium is a high-quality language model that balances performance and efficiency for enterprise applications.",
                        provider: "mistral",
                        providerId: "mistral",
                        contextLength: 32000,
                        inputTokenPrice: 0.08,
                        outputTokenPrice: 0.24,
                        parameters: "22B",
                    },
                ],
            }

            setProvider({ ...mockProvider, usageData })
            setIsLoading(false)
        }

        fetchProviderData()
    }, [providerId])

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!provider) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Provider not found</h1>
                    <p className="mb-6">The provider you are looking for does not exist or has been removed.</p>
                    <Button asChild>
                        <Link to="/providers">Back to Providers</Link>
                    </Button>
                </div>
            </div>
        )
    }

    // Extract model names for the chart
    const modelNames = Object.keys(provider.usageData[0]).filter(
        (key) => key !== "date" && key !== "displayDate" && key !== "tokens",
    )

    // Generate colors for the chart
    const colors = [
        "#4285F4", // blue
        "#EA4335", // red
        "#FBBC05", // yellow
        "#34A853", // green
        "#FF6D01", // orange
        "#46BDC6", // teal
        "#7B61FF", // purple
        "#F5B400", // gold
    ]

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-primary font-bold">
                        {provider.name.charAt(0)}
                    </div>
                    <h1 className="text-3xl font-bold">{provider.name}</h1>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p>
                            Browse models provided by {provider.name} (
                            <a
                                href={provider.termsOfService}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex-inline items-center"
                            >
                                Terms of Service
                            </a>
                            )
                        </p>
                    </div>
                    <div className="font-semibold">{provider.modelCount} models</div>
                </div>

                <div className="mb-10">
                    <h2 className="text-xl font-semibold mb-2">Tokens processed</h2>

                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={provider.usageData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                stackOffset="expand"
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="displayDate"
                                    tick={{ fontSize: 12 }}
                                    interval={Math.floor(provider.usageData.length / 10)}
                                />
                                <YAxis
                                    tickFormatter={(value) => `${value.toFixed(1)}B`}
                                    domain={[0, "dataMax"]}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip
                                    formatter={(value: number) => [`${value.toFixed(2)}B tokens`, ""]}
                                    labelFormatter={(label) => `Date: ${label}`}
                                />
                                <Legend />
                                {modelNames.map((model, index) => (
                                    <Bar key={model} dataKey={model} stackId="a" fill={colors[index % colors.length]} name={model} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-6">
                    {provider.models.map((model) => (
                        <div key={model.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                                <Link
                                    to={`/models/${model.id}`}
                                    className="text-xl font-semibold hover:text-primary transition-colors flex items-center"
                                >
                                    {model.name}
                                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Open
                                </Button>
                            </div>
                            <p className="text-muted-foreground mb-4">{model.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <span className="font-medium">
                                        by{" "}
                                        <Link to={`/providers/${model.providerId}`} className="hover:text-primary">
                                            {model.provider}
                                        </Link>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>{model.contextLength.toLocaleString()} context</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>${model.inputTokenPrice.toFixed(2)}/M input tokens</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>${model.outputTokenPrice.toFixed(2)}/M output tokens</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                                        {model.parameters}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
