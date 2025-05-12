"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { useToast } from "../../hooks/use-toast"
import {
    Edit,
    Trash2,
    Plus,
    ExternalLink,
    RefreshCw,
    MoreHorizontal,
    Server,
    Brain,
    Bot,
    Cpu,
    Cloud,
    Database,
    Code,
    Layers,
    Sparkles,
    Zap,
} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Badge } from "../ui/badge"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

interface Provider {
    id: string
    name: string
    slug: string
    description: string
    website: string
    documentationUrl: string
    apiEndpoint: string
    status: "active" | "inactive" | "maintenance" | "deprecated"
    supportedFeatures: string[]
    icon: keyof typeof providerIcons
    modelsCount: number
    credentialsCount: number
    addedDate: string
    lastUpdated: string
}

// Map of provider slugs to Lucide icons
const providerIcons = {
    openai: Brain,
    anthropic: Sparkles,
    google: Cloud,
    azure: Server,
    cohere: Zap,
    huggingface: Bot,
    replicate: Layers,
    stability: Cpu,
    mistral: Database,
    ai21: Code,
    default: Server,
}

export default function ProviderManagementPanel() {
    const { toast } = useToast()
    const [isAddProviderOpen, setIsAddProviderOpen] = useState(false)
    const [isEditProviderOpen, setIsEditProviderOpen] = useState(false)
    const [editingProvider, setEditingProvider] = useState<Provider | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("all")

    const [providers, setProviders] = useState<Provider[]>([
        {
            id: "1",
            name: "OpenAI",
            slug: "openai",
            description:
                "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.",
            website: "https://openai.com",
            documentationUrl: "https://platform.openai.com/docs",
            apiEndpoint: "https://api.openai.com/v1",
            status: "active",
            supportedFeatures: ["chat", "completions", "embeddings", "images", "audio"],
            icon: "openai",
            modelsCount: 12,
            credentialsCount: 5,
            addedDate: "2023-01-15",
            lastUpdated: "2023-12-10",
        },
        {
            id: "2",
            name: "Anthropic",
            slug: "anthropic",
            description: "Anthropic is an AI safety company building reliable, interpretable, and steerable AI systems.",
            website: "https://anthropic.com",
            documentationUrl: "https://docs.anthropic.com",
            apiEndpoint: "https://api.anthropic.com",
            status: "active",
            supportedFeatures: ["chat", "completions"],
            icon: "anthropic",
            modelsCount: 4,
            credentialsCount: 3,
            addedDate: "2023-03-20",
            lastUpdated: "2023-11-05",
        },
        {
            id: "3",
            name: "Google AI",
            slug: "google-ai",
            description: "Google AI is committed to bringing the benefits of AI to everyone.",
            website: "https://ai.google",
            documentationUrl: "https://ai.google/docs",
            apiEndpoint: "https://generativelanguage.googleapis.com",
            status: "active",
            supportedFeatures: ["chat", "completions", "embeddings", "images"],
            icon: "google",
            modelsCount: 8,
            credentialsCount: 2,
            addedDate: "2023-05-10",
            lastUpdated: "2023-12-15",
        },
        {
            id: "4",
            name: "Azure OpenAI",
            slug: "azure-openai",
            description:
                "Azure OpenAI Service provides REST API access to OpenAI's powerful language models including GPT-4, GPT-3.5-Turbo, and Embeddings model series.",
            website: "https://azure.microsoft.com/en-us/products/cognitive-services/openai-service",
            documentationUrl: "https://learn.microsoft.com/en-us/azure/cognitive-services/openai",
            apiEndpoint: "https://{resource-name}.openai.azure.com",
            status: "active",
            supportedFeatures: ["chat", "completions", "embeddings", "images"],
            icon: "azure",
            modelsCount: 10,
            credentialsCount: 4,
            addedDate: "2023-02-28",
            lastUpdated: "2023-11-20",
        },
        {
            id: "5",
            name: "Cohere",
            slug: "cohere",
            description: "Cohere provides access to advanced Large Language Models and NLP tools through a simple API.",
            website: "https://cohere.ai",
            documentationUrl: "https://docs.cohere.ai",
            apiEndpoint: "https://api.cohere.ai/v1",
            status: "active",
            supportedFeatures: ["completions", "embeddings", "classification"],
            icon: "cohere",
            modelsCount: 6,
            credentialsCount: 2,
            addedDate: "2023-04-15",
            lastUpdated: "2023-10-30",
        },
        {
            id: "6",
            name: "Hugging Face",
            slug: "huggingface",
            description: "Hugging Face is democratizing artificial intelligence through open source and open science.",
            website: "https://huggingface.co",
            documentationUrl: "https://huggingface.co/docs",
            apiEndpoint: "https://api-inference.huggingface.co/models",
            status: "active",
            supportedFeatures: ["chat", "completions", "embeddings", "images", "audio"],
            icon: "huggingface",
            modelsCount: 25,
            credentialsCount: 1,
            addedDate: "2023-03-05",
            lastUpdated: "2023-12-01",
        },
        {
            id: "7",
            name: "Replicate",
            slug: "replicate",
            description:
                "Replicate lets you run machine learning models with a cloud API, without having to set up any infrastructure.",
            website: "https://replicate.com",
            documentationUrl: "https://replicate.com/docs",
            apiEndpoint: "https://api.replicate.com/v1",
            status: "active",
            supportedFeatures: ["chat", "completions", "images", "audio", "video"],
            icon: "replicate",
            modelsCount: 18,
            credentialsCount: 2,
            addedDate: "2023-06-20",
            lastUpdated: "2023-11-15",
        },
        {
            id: "8",
            name: "Stability AI",
            slug: "stability-ai",
            description: "Stability AI is the world's leading open-source generative artificial intelligence company.",
            website: "https://stability.ai",
            documentationUrl: "https://platform.stability.ai/docs/api-reference",
            apiEndpoint: "https://api.stability.ai/v1",
            status: "active",
            supportedFeatures: ["images", "video"],
            icon: "stability",
            modelsCount: 5,
            credentialsCount: 3,
            addedDate: "2023-07-10",
            lastUpdated: "2023-12-05",
        },
        {
            id: "9",
            name: "Mistral AI",
            slug: "mistral-ai",
            description: "Mistral AI is a European company specializing in generative artificial intelligence.",
            website: "https://mistral.ai",
            documentationUrl: "https://docs.mistral.ai",
            apiEndpoint: "https://api.mistral.ai/v1",
            status: "active",
            supportedFeatures: ["chat", "completions", "embeddings"],
            icon: "mistral",
            modelsCount: 4,
            credentialsCount: 1,
            addedDate: "2023-09-15",
            lastUpdated: "2023-12-20",
        },
        {
            id: "10",
            name: "AI21 Labs",
            slug: "ai21-labs",
            description:
                "AI21 Labs is an AI lab and product company with the mission of building AI systems with an unprecedented capacity to understand and generate natural language.",
            website: "https://www.ai21.com",
            documentationUrl: "https://docs.ai21.com",
            apiEndpoint: "https://api.ai21.com/studio/v1",
            status: "maintenance",
            supportedFeatures: ["completions", "embeddings"],
            icon: "ai21",
            modelsCount: 3,
            credentialsCount: 1,
            addedDate: "2023-08-05",
            lastUpdated: "2023-11-25",
        },
    ])

    const [newProvider, setNewProvider] = useState<Partial<Provider>>({
        name: "",
        slug: "",
        description: "",
        website: "",
        documentationUrl: "",
        apiEndpoint: "",
        status: "active",
        supportedFeatures: [],
        icon: "default",
    })

    const handleAddProvider = () => {
        if (!newProvider.name || !newProvider.slug || !newProvider.apiEndpoint) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            })
            return
        }

        const newId = (providers.length + 1).toString()
        const providerToAdd: Provider = {
            id: newId,
            name: newProvider.name || "",
            slug: newProvider.slug || "",
            description: newProvider.description || "",
            website: newProvider.website || "",
            documentationUrl: newProvider.documentationUrl || "",
            apiEndpoint: newProvider.apiEndpoint || "",
            status: (newProvider.status as "active" | "inactive" | "maintenance" | "deprecated") || "active",
            supportedFeatures: newProvider.supportedFeatures || [],
            icon: newProvider.icon || "default",
            modelsCount: 0,
            credentialsCount: 0,
            addedDate: new Date().toISOString().split("T")[0],
            lastUpdated: new Date().toISOString().split("T")[0],
        }

        setProviders([...providers, providerToAdd])
        setNewProvider({
            name: "",
            slug: "",
            description: "",
            website: "",
            documentationUrl: "",
            apiEndpoint: "",
            status: "active",
            supportedFeatures: [],
            icon: "default",
        })
        setIsAddProviderOpen(false)

        toast({
            title: "Provider added",
            description: `${providerToAdd.name} has been added successfully.`,
        })
    }

    const handleEditProvider = () => {
        if (!editingProvider) return

        const updatedProviders = providers.map((provider) => {
            if (provider.id === editingProvider.id) {
                return {
                    ...editingProvider,
                    lastUpdated: new Date().toISOString().split("T")[0],
                }
            }
            return provider
        })

        setProviders(updatedProviders)
        setEditingProvider(null)
        setIsEditProviderOpen(false)

        toast({
            title: "Provider updated",
            description: `${editingProvider.name} has been updated successfully.`,
        })
    }

    const handleDeleteProvider = (id: string) => {
        const providerToDelete = providers.find((p) => p.id === id)
        if (!providerToDelete) return

        setProviders(providers.filter((provider) => provider.id !== id))

        toast({
            title: "Provider deleted",
            description: `${providerToDelete.name} has been deleted successfully.`,
        })
    }

    const handleCheckConnection = (id: string) => {
        const provider = providers.find((p) => p.id === id)
        if (!provider) return

        // Simulate API check
        setTimeout(() => {
            toast({
                title: "Connection successful",
                description: `Successfully connected to ${provider.name} API.`,
            })
        }, 1500)
    }

    const filteredProviders = providers.filter((provider) => {
        // Filter by search query
        const matchesSearch =
            provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.slug.toLowerCase().includes(searchQuery.toLowerCase())

        // Filter by tab
        if (activeTab === "all") return matchesSearch
        if (activeTab === "active") return matchesSearch && provider.status === "active"
        if (activeTab === "inactive") return matchesSearch && provider.status === "inactive"
        if (activeTab === "maintenance") return matchesSearch && provider.status === "maintenance"
        if (activeTab === "deprecated") return matchesSearch && provider.status === "deprecated"

        return matchesSearch
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return (
                    <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
                    >
                        Active
                    </Badge>
                )
            case "inactive":
                return (
                    <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300"
                    >
                        Inactive
                    </Badge>
                )
            case "maintenance":
                return (
                    <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
                    >
                        Maintenance
                    </Badge>
                )
            case "deprecated":
                return (
                    <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                    >
                        Deprecated
                    </Badge>
                )
            default:
                return <Badge variant="outline">Unknown</Badge>
        }
    }

    // Get the appropriate icon component for a provider
    const getProviderIcon = (iconKey: keyof typeof providerIcons) => {
        const IconComponent = providerIcons[iconKey] || providerIcons.default
        return <IconComponent className="h-5 w-5" />
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Provider Management</CardTitle>
                <CardDescription>Manage AI model providers and their configurations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Search and filters */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="w-full sm:w-auto">
                            <Input
                                type="search"
                                placeholder="Search providers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-80"
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="w-full sm:w-auto">
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                    <TabsList className="w-full sm:w-auto grid grid-cols-5">
                                        <TabsTrigger value="all" className="w-full">
                                            All
                                        </TabsTrigger>
                                        <TabsTrigger value="active" className="w-full">
                                            Active
                                        </TabsTrigger>
                                        <TabsTrigger value="maintenance" className="w-full">
                                            Maintenance
                                        </TabsTrigger>
                                        <TabsTrigger value="inactive" className="w-full">
                                            Inactive
                                        </TabsTrigger>
                                        <TabsTrigger value="deprecated" className="w-full">
                                            Deprecated
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            <Dialog open={isAddProviderOpen} onOpenChange={setIsAddProviderOpen}>
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2 whitespace-nowrap">
                                        <Plus className="h-4 w-4" />
                                        Add Provider
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Add New Provider</DialogTitle>
                                        <DialogDescription>Add a new AI model provider to the system.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="provider-name" className="required">
                                                Provider Name
                                            </Label>
                                            <Input
                                                id="provider-name"
                                                value={newProvider.name}
                                                onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                                                placeholder="e.g. OpenAI"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="provider-slug" className="required">
                                                Slug
                                            </Label>
                                            <Input
                                                id="provider-slug"
                                                value={newProvider.slug}
                                                onChange={(e) =>
                                                    setNewProvider({ ...newProvider, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                                                }
                                                placeholder="e.g. openai"
                                            />
                                            <p className="text-xs text-muted-foreground">Used for API routes and identification</p>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="provider-description">Description</Label>
                                            <Textarea
                                                id="provider-description"
                                                value={newProvider.description}
                                                onChange={(e) => setNewProvider({ ...newProvider, description: e.target.value })}
                                                placeholder="Brief description of the provider"
                                                rows={3}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="provider-website">Website URL</Label>
                                            <Input
                                                id="provider-website"
                                                type="url"
                                                value={newProvider.website}
                                                onChange={(e) => setNewProvider({ ...newProvider, website: e.target.value })}
                                                placeholder="https://example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="provider-docs">Documentation URL</Label>
                                            <Input
                                                id="provider-docs"
                                                type="url"
                                                value={newProvider.documentationUrl}
                                                onChange={(e) => setNewProvider({ ...newProvider, documentationUrl: e.target.value })}
                                                placeholder="https://docs.example.com"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="provider-api-endpoint" className="required">
                                                API Endpoint
                                            </Label>
                                            <Input
                                                id="provider-api-endpoint"
                                                value={newProvider.apiEndpoint}
                                                onChange={(e) => setNewProvider({ ...newProvider, apiEndpoint: e.target.value })}
                                                placeholder="https://api.example.com/v1"
                                            />
                                            <p className="text-xs text-muted-foreground">Base URL for API requests</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Status</Label>
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="provider-status"
                                                    checked={newProvider.status === "active"}
                                                    onCheckedChange={(checked) =>
                                                        setNewProvider({ ...newProvider, status: checked ? "active" : "inactive" })
                                                    }
                                                />
                                                <Label htmlFor="provider-status">Active</Label>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Supported Features</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {["chat", "completions", "embeddings", "images", "audio", "video"].map((feature) => (
                                                    <Badge
                                                        key={feature}
                                                        variant={newProvider.supportedFeatures?.includes(feature) ? "default" : "outline"}
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            const features = newProvider.supportedFeatures || []
                                                            if (features.includes(feature)) {
                                                                setNewProvider({
                                                                    ...newProvider,
                                                                    supportedFeatures: features.filter((f) => f !== feature),
                                                                })
                                                            } else {
                                                                setNewProvider({
                                                                    ...newProvider,
                                                                    supportedFeatures: [...features, feature],
                                                                })
                                                            }
                                                        }}
                                                    >
                                                        {feature}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsAddProviderOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleAddProvider}>Add Provider</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Providers list */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-medium">Provider</th>
                                    <th className="text-left py-3 px-4 font-medium">Status</th>
                                    <th className="text-left py-3 px-4 font-medium">API Endpoint</th>
                                    <th className="text-left py-3 px-4 font-medium">Models</th>
                                    <th className="text-left py-3 px-4 font-medium">Last Updated</th>
                                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProviders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-6 text-center text-muted-foreground">
                                            No providers found. Add a new provider to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProviders.map((provider) => (
                                        <tr key={provider.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden text-primary">
                                                        {getProviderIcon(provider.icon)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{provider.name}</div>
                                                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                            {provider.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">{getStatusBadge(provider.status)}</td>
                                            <td className="py-3 px-4">
                                                <div className="font-mono text-sm truncate max-w-xs">{provider.apiEndpoint}</div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1">
                                                    <span>{provider.modelsCount}</span>
                                                    <span className="text-muted-foreground">models</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <span>{provider.credentialsCount}</span>
                                                    <span>credentials</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>{new Date(provider.lastUpdated).toLocaleDateString()}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    Added: {new Date(provider.addedDate).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Dialog
                                                        open={isEditProviderOpen && editingProvider?.id === provider.id}
                                                        onOpenChange={(open) => {
                                                            setIsEditProviderOpen(open)
                                                            if (!open) setEditingProvider(null)
                                                        }}
                                                    >
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => {
                                                                    setEditingProvider(provider)
                                                                    setIsEditProviderOpen(true)
                                                                }}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-2xl">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Provider</DialogTitle>
                                                                <DialogDescription>Update provider information and settings.</DialogDescription>
                                                            </DialogHeader>
                                                            {editingProvider && (
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="edit-provider-name" className="required">
                                                                            Provider Name
                                                                        </Label>
                                                                        <Input
                                                                            id="edit-provider-name"
                                                                            value={editingProvider.name}
                                                                            onChange={(e) => setEditingProvider({ ...editingProvider, name: e.target.value })}
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="edit-provider-slug" className="required">
                                                                            Slug
                                                                        </Label>
                                                                        <Input
                                                                            id="edit-provider-slug"
                                                                            value={editingProvider.slug}
                                                                            onChange={(e) =>
                                                                                setEditingProvider({
                                                                                    ...editingProvider,
                                                                                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                                                                                })
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2 md:col-span-2">
                                                                        <Label htmlFor="edit-provider-description">Description</Label>
                                                                        <Textarea
                                                                            id="edit-provider-description"
                                                                            value={editingProvider.description}
                                                                            onChange={(e) =>
                                                                                setEditingProvider({ ...editingProvider, description: e.target.value })
                                                                            }
                                                                            rows={3}
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="edit-provider-website">Website URL</Label>
                                                                        <Input
                                                                            id="edit-provider-website"
                                                                            type="url"
                                                                            value={editingProvider.website}
                                                                            onChange={(e) =>
                                                                                setEditingProvider({ ...editingProvider, website: e.target.value })
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="edit-provider-docs">Documentation URL</Label>
                                                                        <Input
                                                                            id="edit-provider-docs"
                                                                            type="url"
                                                                            value={editingProvider.documentationUrl}
                                                                            onChange={(e) =>
                                                                                setEditingProvider({ ...editingProvider, documentationUrl: e.target.value })
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2 md:col-span-2">
                                                                        <Label htmlFor="edit-provider-api-endpoint" className="required">
                                                                            API Endpoint
                                                                        </Label>
                                                                        <Input
                                                                            id="edit-provider-api-endpoint"
                                                                            value={editingProvider.apiEndpoint}
                                                                            onChange={(e) =>
                                                                                setEditingProvider({ ...editingProvider, apiEndpoint: e.target.value })
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label>Status</Label>
                                                                        <select
                                                                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                                                                            value={editingProvider.status}
                                                                            onChange={(e) =>
                                                                                setEditingProvider({
                                                                                    ...editingProvider,
                                                                                    status: e.target.value as
                                                                                        | "active"
                                                                                        | "inactive"
                                                                                        | "maintenance"
                                                                                        | "deprecated",
                                                                                })
                                                                            }
                                                                        >
                                                                            <option value="active">Active</option>
                                                                            <option value="inactive">Inactive</option>
                                                                            <option value="maintenance">Maintenance</option>
                                                                            <option value="deprecated">Deprecated</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label>Supported Features</Label>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {["chat", "completions", "embeddings", "images", "audio", "video"].map(
                                                                                (feature) => (
                                                                                    <Badge
                                                                                        key={feature}
                                                                                        variant={
                                                                                            editingProvider.supportedFeatures.includes(feature)
                                                                                                ? "default"
                                                                                                : "outline"
                                                                                        }
                                                                                        className="cursor-pointer"
                                                                                        onClick={() => {
                                                                                            if (editingProvider.supportedFeatures.includes(feature)) {
                                                                                                setEditingProvider({
                                                                                                    ...editingProvider,
                                                                                                    supportedFeatures: editingProvider.supportedFeatures.filter(
                                                                                                        (f) => f !== feature,
                                                                                                    ),
                                                                                                })
                                                                                            } else {
                                                                                                setEditingProvider({
                                                                                                    ...editingProvider,
                                                                                                    supportedFeatures: [...editingProvider.supportedFeatures, feature],
                                                                                                })
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        {feature}
                                                                                    </Badge>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <DialogFooter>
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => {
                                                                        setIsEditProviderOpen(false)
                                                                        setEditingProvider(null)
                                                                    }}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                <Button onClick={handleEditProvider}>Save Changes</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem
                                                                onClick={() => window.open(provider.website, "_blank")}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                                Visit Website
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => window.open(provider.documentationUrl, "_blank")}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                                View Documentation
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleCheckConnection(provider.id)}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <RefreshCw className="h-4 w-4" />
                                                                Test Connection
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => handleDeleteProvider(provider.id)}
                                                                className="text-destructive flex items-center gap-2"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Delete Provider
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
