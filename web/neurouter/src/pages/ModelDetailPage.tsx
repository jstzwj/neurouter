"use client"

import React from "react"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Copy, MessageSquare, Scale, ChevronDown, ChevronUp, ExternalLink, Clock } from "lucide-react"
import type { Model } from "../types/model"
import { generateUptimeHistory, calculateUptimePercentage, type UptimeStatus } from "../utils/mockData"
import UptimeHistory from "../components/UptimeHistory"

interface ProviderMetrics {
    id: string
    name: string
    context: string
    maxOutput: string
    inputCost: string
    outputCost: string
    latency: string
    throughput: string
    uptime: string
    dataPolicy?: string
    promptTraining?: string
    promptLogging?: string
    moderation?: string
    supportedParameters?: string[]
    lastUpdated?: string
    uptimePercentage?: string
    uptimeHistory?: UptimeStatus[]
}

export default function ModelDetailPage() {
    const { t } = useTranslation()
    const { modelId } = useParams<{ modelId: string }>()
    const [model, setModel] = useState<Model | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    const [providers, setProviders] = useState<ProviderMetrics[]>([])
    const [expandedProvider, setExpandedProvider] = useState<string | null>(null)

    useEffect(() => {
        // 在实际应用中，这里会调用API获取模型详情
        // 这里使用模拟数据
        setTimeout(() => {
            if (modelId) {
                const mockModel: Model = {
                    id: modelId,
                    name: "DeepSeek: DeepSeek V3 0324",
                    description:
                        "DeepSeek V3, a 68B-parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team. It succeeds the DeepSeek V2 model and performs really well on a variety of tasks.",
                    provider: { id: "deepseek", name: "deepseek" },
                    contextLength: 163840,
                    inputTokenPrice: 0.3,
                    outputTokenPrice: 0.88,
                    totalTokens: "163,840",
                    path: "deepseek/deepseek-chat-v3-0324",
                    createdAt: "Mar 24, 2025",
                    tags: [
                        { id: "1", name: "Finance (#1)", color: "bg-blue-100 text-blue-800 border-blue-200" },
                        { id: "2", name: "Roleplay (#2)", color: "bg-red-100 text-red-800 border-red-200" },
                        { id: "3", name: "Trivia (#5)", color: "bg-purple-100 text-purple-800 border-purple-200" },
                        { id: "4", name: "Science (#10)", color: "bg-green-100 text-green-800 border-green-200" },
                    ],
                }

                // 生成模拟的运行时间历史数据
                const deepInfraHistory = generateUptimeHistory(99.5)
                const novitaAIHistory = generateUptimeHistory(98.5)
                const klusterHistory = generateUptimeHistory(97)

                const mockProviders: ProviderMetrics[] = [
                    {
                        id: "deepinfra",
                        name: "DeepInfra",
                        context: "164K",
                        maxOutput: "164K",
                        inputCost: "$0.30",
                        outputCost: "$0.88",
                        latency: "0.81s",
                        throughput: "38.07tps",
                        uptime: "99.9%",
                        dataPolicy: "Data Policy",
                        promptTraining: "false",
                        promptLogging: "Zero retention",
                        moderation: "Responsibility of developer",
                        supportedParameters: [
                            "Max Tokens",
                            "Temperature",
                            "Top P",
                            "Stop",
                            "Frequency Penalty",
                            "Presence Penalty",
                            "Response Format",
                            "Top K",
                            "Seed",
                            "Min P",
                        ],
                        lastUpdated: "May 12, 2025 - 12 PM",
                        uptimePercentage: calculateUptimePercentage(deepInfraHistory),
                        uptimeHistory: deepInfraHistory,
                    },
                    {
                        id: "novitaai",
                        name: "NovitaAI",
                        context: "128K",
                        maxOutput: "16K",
                        inputCost: "$0.33",
                        outputCost: "$1.30",
                        latency: "1.18s",
                        throughput: "21.89tps",
                        uptime: "99.8%",
                        dataPolicy: "Data Policy",
                        promptTraining: "true",
                        promptLogging: "7 days retention",
                        moderation: "Automated filtering",
                        supportedParameters: ["Max Tokens", "Temperature", "Top P", "Stop"],
                        lastUpdated: "May 11, 2025 - 3 PM",
                        uptimePercentage: calculateUptimePercentage(novitaAIHistory),
                        uptimeHistory: novitaAIHistory,
                    },
                    {
                        id: "kluster",
                        name: "kluster.ai",
                        context: "164K",
                        maxOutput: "164K",
                        inputCost: "$0.33",
                        outputCost: "$1.40",
                        latency: "1.11s",
                        throughput: "18.25tps",
                        uptime: "99.7%",
                        dataPolicy: "Data Policy",
                        promptTraining: "opt-in",
                        promptLogging: "30 days retention",
                        moderation: "AI-based content filtering",
                        supportedParameters: [
                            "Max Tokens",
                            "Temperature",
                            "Top P",
                            "Stop",
                            "Frequency Penalty",
                            "Presence Penalty",
                        ],
                        lastUpdated: "May 10, 2025 - 9 AM",
                        uptimePercentage: calculateUptimePercentage(klusterHistory),
                        uptimeHistory: klusterHistory,
                    },
                ]

                setModel(mockModel)
                setProviders(mockProviders)
            }
            setIsLoading(false)
        }, 500)
    }, [modelId])

    const toggleProviderExpand = (providerId: string) => {
        if (expandedProvider === providerId) {
            setExpandedProvider(null)
        } else {
            setExpandedProvider(providerId)
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!model) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">{t("models.notFound")}</h1>
                    <p className="mb-6">{t("models.modelNotFoundDescription")}</p>
                    <Button asChild>
                        <Link to="/models">{t("models.backToModels")}</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{model.name}</h1>
                <div className="text-sm text-muted-foreground mb-4">
                    {model.path}{" "}
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <div>Created {model.createdAt}</div>
                    <div>{model.contextLength.toLocaleString()} context</div>
                    <div>${(model.inputTokenPrice / 1000).toFixed(2)}/M input tokens</div>
                    <div>${(model.outputTokenPrice / 1000).toFixed(2)}/M output tokens</div>
                </div>

                {model.tags && model.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {model.tags.map((tag) => (
                            <Badge key={tag.id} variant="outline" className={`${tag.color} text-xs`}>
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                )}

                <div className="mb-6">
                    <div className={`relative ${!isDescriptionExpanded ? "max-h-24 overflow-hidden" : ""}`}>
                        <p className="text-foreground">{model.description}</p>
                        {!isDescriptionExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent"></div>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 flex items-center gap-1"
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    >
                        {isDescriptionExpanded ? (
                            <>
                                <ChevronUp className="h-4 w-4" /> Show less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4" /> Show more
                            </>
                        )}
                    </Button>
                </div>

                <div className="flex gap-4 mb-8">
                    <Button className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> Chat
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Scale className="h-4 w-4" /> Compare
                    </Button>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Standard</span>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                        Model weights <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="border-b w-full justify-start rounded-none bg-transparent mb-6">
                        <TabsTrigger
                            value="overview"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="providers"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                        >
                            Providers
                        </TabsTrigger>
                        <TabsTrigger
                            value="versions"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                        >
                            Versions
                        </TabsTrigger>
                        <TabsTrigger
                            value="apps"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                        >
                            Apps
                        </TabsTrigger>
                        <TabsTrigger
                            value="activity"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                        >
                            Activity
                        </TabsTrigger>
                        <TabsTrigger
                            value="uptime"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                        >
                            Uptime
                        </TabsTrigger>
                        <TabsTrigger
                            value="api"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                        >
                            API
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="prose max-w-none">
                            <h2>About {model.name}</h2>
                            <p>
                                This is a detailed overview of the model, including its capabilities, training data, and use cases. In a
                                real application, this would contain comprehensive information about the model.
                            </p>
                            <h3>Key Features</h3>
                            <ul>
                                <li>Advanced reasoning capabilities</li>
                                <li>Strong performance on benchmarks</li>
                                <li>Efficient token usage</li>
                                <li>Specialized for various domains</li>
                            </ul>
                            <h3>Use Cases</h3>
                            <p>
                                This model excels at a variety of tasks including content generation, summarization, code assistance,
                                and creative writing.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="providers">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Providers for {model.name}</h2>
                            <p className="mb-6">
                                NeuRouter routes requests to the best providers that are able to handle your prompt size and parameters,
                                with fallbacks to maximize{" "}
                                <Link to="/uptime" className="text-primary hover:underline">
                                    uptime
                                </Link>
                                .
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="py-3 px-4 font-medium">Provider</th>
                                            <th className="py-3 px-4 font-medium">Context</th>
                                            <th className="py-3 px-4 font-medium">Max Output</th>
                                            <th className="py-3 px-4 font-medium">Input</th>
                                            <th className="py-3 px-4 font-medium">Output</th>
                                            <th className="py-3 px-4 font-medium">Latency</th>
                                            <th className="py-3 px-4 font-medium">Throughput</th>
                                            <th className="py-3 px-4 font-medium">Uptime</th>
                                            <th className="py-3 px-4 font-medium"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {providers.map((provider) => (
                                            <React.Fragment key={provider.id}>
                                                <tr className={`border-b ${expandedProvider === provider.id ? "bg-muted/30" : ""}`}>
                                                    <td className="py-4 px-4 font-medium">{provider.name}</td>
                                                    <td className="py-4 px-4">{provider.context}</td>
                                                    <td className="py-4 px-4">{provider.maxOutput}</td>
                                                    <td className="py-4 px-4">{provider.inputCost}</td>
                                                    <td className="py-4 px-4">{provider.outputCost}</td>
                                                    <td className="py-4 px-4">{provider.latency}</td>
                                                    <td className="py-4 px-4">{provider.throughput}</td>
                                                    <td className="py-4 px-4">
                                                        {provider.uptimeHistory && (
                                                            <UptimeHistory history={provider.uptimeHistory.slice(0, 6)} height={2} />
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => toggleProviderExpand(provider.id)}
                                                            aria-expanded={expandedProvider === provider.id}
                                                            aria-label={
                                                                expandedProvider === provider.id
                                                                    ? `Collapse ${provider.name} details`
                                                                    : `Expand ${provider.name} details`
                                                            }
                                                        >
                                                            {expandedProvider === provider.id ? (
                                                                <ChevronUp className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronDown className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                    </td>
                                                </tr>
                                                {expandedProvider === provider.id && (
                                                    <tr className="bg-muted/30">
                                                        <td colSpan={9} className="p-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <h4 className="font-medium mb-1">Data Policy</h4>
                                                                        <p className="text-sm">{provider.dataPolicy}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-medium mb-1">Prompt Training</h4>
                                                                        <p className="text-sm">{provider.promptTraining}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-medium mb-1">Prompt Logging</h4>
                                                                        <p className="text-sm">{provider.promptLogging}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-medium mb-1">Moderation</h4>
                                                                        <p className="text-sm">{provider.moderation}</p>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <h4 className="font-medium mb-3">Supported parameters</h4>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {provider.supportedParameters?.map((param) => (
                                                                            <Badge
                                                                                key={param}
                                                                                variant="outline"
                                                                                className="bg-muted text-foreground border-border"
                                                                            >
                                                                                {param}
                                                                            </Badge>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                                                            <span className="text-sm text-muted-foreground">{provider.lastUpdated}</span>
                                                                        </div>
                                                                        <span className="text-sm font-medium">{provider.uptimePercentage}</span>
                                                                    </div>
                                                                    {provider.uptimeHistory && (
                                                                        <UptimeHistory history={provider.uptimeHistory} height={6} showLabels={true} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="versions">
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium">Version history will be displayed here</h3>
                            <p className="text-muted-foreground mt-2">This section is under development</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="apps">
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium">Apps using this model will be displayed here</h3>
                            <p className="text-muted-foreground mt-2">This section is under development</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="activity">
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium">Model activity metrics will be displayed here</h3>
                            <p className="text-muted-foreground mt-2">This section is under development</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="uptime">
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium">Uptime statistics will be displayed here</h3>
                            <p className="text-muted-foreground mt-2">This section is under development</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="api">
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium">API documentation will be displayed here</h3>
                            <p className="text-muted-foreground mt-2">This section is under development</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
