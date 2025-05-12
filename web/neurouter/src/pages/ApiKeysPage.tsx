"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { MoreVertical, Info, Copy, Eye, EyeOff, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useToast } from "../hooks/use-toast"

interface ApiKey {
    id: string
    name: string
    key: string
    maskedKey: string
    usage: string
    limit: string
    createdAt: Date
}

export default function ApiKeysPage() {
    const { t } = useTranslation()
    const { toast } = useToast()
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([
        {
            id: "1",
            name: "3090_api",
            key: "sk-or-v1-0c9a8f7e6d5c4b3a2f1e0d9c8b7a6543210",
            maskedKey: "sk-or-v1-0c9...963",
            usage: "$0.002 used",
            limit: "Unlimited",
            createdAt: new Date(),
        },
    ])
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [newKeyName, setNewKeyName] = useState("")
    const [showKey, setShowKey] = useState<string | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [keyToDelete, setKeyToDelete] = useState<string | null>(null)

    const handleCreateKey = () => {
        if (!newKeyName.trim()) {
            toast({
                title: "Error",
                description: "Please enter a name for your API key",
                variant: "destructive",
            })
            return
        }

        // In a real app, we would call an API to create a new key
        const newKey = {
            id: Date.now().toString(),
            name: newKeyName,
            key: `sk-or-v1-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
            maskedKey: `sk-or-v1-${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 5)}`,
            usage: "$0.000 used",
            limit: "Unlimited",
            createdAt: new Date(),
        }

        setApiKeys((prev) => [...prev, newKey])
        setNewKeyName("")
        setIsCreateDialogOpen(false)

        toast({
            title: "Success",
            description: "API key created successfully",
        })
    }

    const toggleShowKey = (keyId: string) => {
        if (showKey === keyId) {
            setShowKey(null)
        } else {
            setShowKey(keyId)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast({
            title: "Copied",
            description: "API key copied to clipboard",
        })
    }

    const confirmDeleteKey = (keyId: string) => {
        setKeyToDelete(keyId)
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteKey = () => {
        if (!keyToDelete) return

        setApiKeys((prev) => prev.filter((key) => key.id !== keyToDelete))
        setKeyToDelete(null)
        setIsDeleteDialogOpen(false)

        toast({
            title: "Deleted",
            description: "API key deleted successfully",
        })
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex gap-8">
                {/* Left Sidebar */}
                <div className="w-48 shrink-0">
                    <nav className="space-y-1">
                        <div className="text-lg font-medium mb-4">Settings</div>
                        <div className="space-y-1">
                            <a href="/settings/credits" className="block py-2 text-muted-foreground hover:text-foreground">
                                Credits
                            </a>
                            <a href="/settings/api-keys" className="block py-2 text-primary font-medium">
                                API Keys
                            </a>
                            <a href="/settings/provisioning-keys" className="block py-2 text-muted-foreground hover:text-foreground">
                                Provisioning Keys
                            </a>
                            <a href="/settings/integrations" className="block py-2 text-muted-foreground hover:text-foreground">
                                Integrations
                            </a>
                            <a href="/settings/privacy" className="block py-2 text-muted-foreground hover:text-foreground">
                                Privacy
                            </a>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">API Keys</h1>
                        <Button onClick={() => setIsCreateDialogOpen(true)}>Create API Key</Button>
                    </div>

                    <div className="mb-6 flex items-center gap-2">
                        <p className="text-muted-foreground">Manage your API keys to access all models from OpenRouter</p>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Info className="h-4 w-4" />
                        </Button>
                    </div>

                    {apiKeys.length === 0 ? (
                        <Card className="p-6 text-center">
                            <p className="text-muted-foreground">You don't have any API keys yet.</p>
                            <Button onClick={() => setIsCreateDialogOpen(true)} className="mt-4">
                                Create your first API key
                            </Button>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {apiKeys.map((key) => (
                                <Card key={key.id} className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{key.name}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="bg-muted px-2 py-1 rounded text-sm">
                                                    {showKey === key.id ? key.key : key.maskedKey}
                                                </code>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => toggleShowKey(key.id)}
                                                    title={showKey === key.id ? "Hide API key" : "Show API key"}
                                                >
                                                    {showKey === key.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => copyToClipboard(key.key)}
                                                    title="Copy API key"
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-2">
                                                {key.usage} • {key.limit}
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => copyToClipboard(key.key)}>
                                                    <Copy className="h-4 w-4 mr-2" />
                                                    Copy
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toggleShowKey(key.id)}>
                                                    {showKey === key.id ? (
                                                        <>
                                                            <EyeOff className="h-4 w-4 mr-2" />
                                                            Hide
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            Show
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => confirmDeleteKey(key.id)} className="text-destructive">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create API Key Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create API Key</DialogTitle>
                        <DialogDescription>
                            Create a new API key to access OpenRouter models. You will only be able to view the key once.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="key-name">API Key Name</Label>
                            <Input
                                id="key-name"
                                placeholder="e.g. Production, Development, etc."
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateKey}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete API Key Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete API Key</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this API key? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteKey}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
