"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Edit, Trash2, Plus } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

interface Credential {
    id: string
    name: string
    provider: string
    description: string
    owner: string
    createdAt: string
    updatedAt: string
}

export default function CredentialManagementPanel() {
    const { toast } = useToast()
    const [isAddCredentialOpen, setIsAddCredentialOpen] = useState(false)
    const [isEditCredentialOpen, setIsEditCredentialOpen] = useState(false)
    const [editingCredential, setEditingCredential] = useState<Credential | null>(null)
    const [newCredential, setNewCredential] = useState<Partial<Credential>>({
        name: "",
        provider: "",
        description: "",
        owner: "",
    })

    const [credentials, setCredentials] = useState<Credential[]>([
        {
            id: "1",
            name: "DeepSeek",
            provider: "Deepseek",
            description: "-",
            owner: "Admin User",
            createdAt: "2023-10-15",
            updatedAt: "2023-10-15",
        },
        {
            id: "2",
            name: "siliconflow",
            provider: "OpenAI_Compatible",
            description: "-",
            owner: "John Doe",
            createdAt: "2023-11-20",
            updatedAt: "2023-11-20",
        },
        {
            id: "3",
            name: "OpenRouter",
            provider: "Openrouter",
            description: "-",
            owner: "Admin User",
            createdAt: "2023-12-05",
            updatedAt: "2023-12-05",
        },
        {
            id: "4",
            name: "Aliyun",
            provider: "OpenAI_Compatible",
            description: "-",
            owner: "Jane Smith",
            createdAt: "2024-01-10",
            updatedAt: "2024-01-10",
        },
        {
            id: "5",
            name: "AzureSwendenCentral-gpt-3.5-turbo-1106",
            provider: "Azure_AI_Studio",
            description: "-",
            owner: "Admin User",
            createdAt: "2024-02-15",
            updatedAt: "2024-02-15",
        },
        {
            id: "6",
            name: "AzureSwendenCentral-gpt-4o-2024-05-13",
            provider: "Azure_AI_Studio",
            description: "-",
            owner: "Mike Johnson",
            createdAt: "2024-03-20",
            updatedAt: "2024-03-20",
        },
        {
            id: "7",
            name: "AzureSwendenCentral",
            provider: "Azure",
            description: "-",
            owner: "Admin User",
            createdAt: "2024-04-25",
            updatedAt: "2024-04-25",
        },
    ])

    const providers = [
        { value: "Deepseek", label: "Deepseek" },
        { value: "OpenAI_Compatible", label: "OpenAI Compatible" },
        { value: "Openrouter", label: "Openrouter" },
        { value: "Azure_AI_Studio", label: "Azure AI Studio" },
        { value: "Azure", label: "Azure" },
        { value: "Anthropic", label: "Anthropic" },
        { value: "Google", label: "Google" },
        { value: "Cohere", label: "Cohere" },
    ]

    const users = [
        { value: "Admin User", label: "Admin User" },
        { value: "John Doe", label: "John Doe" },
        { value: "Jane Smith", label: "Jane Smith" },
        { value: "Mike Johnson", label: "Mike Johnson" },
    ]

    const handleAddCredential = () => {
        if (!newCredential.name || !newCredential.provider || !newCredential.owner) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            })
            return
        }

        const newId = (credentials.length + 1).toString()
        const now = new Date().toISOString().split("T")[0]

        const credentialToAdd: Credential = {
            id: newId,
            name: newCredential.name,
            provider: newCredential.provider,
            description: newCredential.description || "-",
            owner: newCredential.owner,
            createdAt: now,
            updatedAt: now,
        }

        setCredentials([...credentials, credentialToAdd])
        setNewCredential({
            name: "",
            provider: "",
            description: "",
            owner: "",
        })
        setIsAddCredentialOpen(false)

        toast({
            title: "Credential added",
            description: `${credentialToAdd.name} has been added successfully.`,
        })
    }

    const handleEditCredential = () => {
        if (!editingCredential) return

        if (!editingCredential.name || !editingCredential.provider || !editingCredential.owner) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            })
            return
        }

        const now = new Date().toISOString().split("T")[0]
        const updatedCredential = {
            ...editingCredential,
            updatedAt: now,
        }

        const updatedCredentials = credentials.map((credential) => {
            if (credential.id === editingCredential.id) {
                return updatedCredential
            }
            return credential
        })

        setCredentials(updatedCredentials)
        setEditingCredential(null)
        setIsEditCredentialOpen(false)

        toast({
            title: "Credential updated",
            description: `${updatedCredential.name} has been updated successfully.`,
        })
    }

    const handleDeleteCredential = (id: string) => {
        const credentialToDelete = credentials.find((c) => c.id === id)
        if (!credentialToDelete) return

        setCredentials(credentials.filter((credential) => credential.id !== id))

        toast({
            title: "Credential deleted",
            description: `${credentialToDelete.name} has been deleted successfully.`,
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>凭证管理</CardTitle>
                <CardDescription>管理API凭证和密钥</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-medium">Credential Name</th>
                                    <th className="text-left py-3 px-4 font-medium">Provider</th>
                                    <th className="text-left py-3 px-4 font-medium">Owner</th>
                                    <th className="text-left py-3 px-4 font-medium">Description</th>
                                    <th className="text-right py-3 px-4 font-medium"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {credentials.map((credential) => (
                                    <tr key={credential.id} className="border-b hover:bg-muted/50">
                                        <td className="py-3 px-4">{credential.name}</td>
                                        <td className="py-3 px-4">
                                            <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-sm font-medium">
                                                {credential.provider}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">{credential.owner}</td>
                                        <td className="py-3 px-4">{credential.description}</td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => {
                                                        setEditingCredential(credential)
                                                        setIsEditCredentialOpen(true)
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                    onClick={() => handleDeleteCredential(credential.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <Dialog open={isAddCredentialOpen} onOpenChange={setIsAddCredentialOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-indigo-600 hover:bg-indigo-700">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Credential
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Credential</DialogTitle>
                                    <DialogDescription>Add a new API credential to the system.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="credential-name">Credential Name</Label>
                                        <Input
                                            id="credential-name"
                                            value={newCredential.name}
                                            onChange={(e) => setNewCredential({ ...newCredential, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="provider">Provider</Label>
                                        <Select
                                            value={newCredential.provider}
                                            onValueChange={(value) => setNewCredential({ ...newCredential, provider: value })}
                                        >
                                            <SelectTrigger id="provider">
                                                <SelectValue placeholder="Select provider" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {providers.map((provider) => (
                                                    <SelectItem key={provider.value} value={provider.value}>
                                                        {provider.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="owner">Owner</Label>
                                        <Select
                                            value={newCredential.owner}
                                            onValueChange={(value) => setNewCredential({ ...newCredential, owner: value })}
                                        >
                                            <SelectTrigger id="owner">
                                                <SelectValue placeholder="Select owner" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map((user) => (
                                                    <SelectItem key={user.value} value={user.value}>
                                                        {user.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description (Optional)</Label>
                                        <Textarea
                                            id="description"
                                            value={newCredential.description}
                                            onChange={(e) => setNewCredential({ ...newCredential, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="api-key">API Key</Label>
                                        <Input id="api-key" type="password" placeholder="Enter API key" />
                                        <p className="text-sm text-muted-foreground">
                                            API keys are encrypted before storing and cannot be viewed again.
                                        </p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsAddCredentialOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleAddCredential}>Add</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isEditCredentialOpen} onOpenChange={setIsEditCredentialOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Credential</DialogTitle>
                                    <DialogDescription>Update credential information.</DialogDescription>
                                </DialogHeader>
                                {editingCredential && (
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-credential-name">Credential Name</Label>
                                            <Input
                                                id="edit-credential-name"
                                                value={editingCredential.name}
                                                onChange={(e) => setEditingCredential({ ...editingCredential, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-provider">Provider</Label>
                                            <Select
                                                value={editingCredential.provider}
                                                onValueChange={(value) => setEditingCredential({ ...editingCredential, provider: value })}
                                            >
                                                <SelectTrigger id="edit-provider">
                                                    <SelectValue placeholder="Select provider" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {providers.map((provider) => (
                                                        <SelectItem key={provider.value} value={provider.value}>
                                                            {provider.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-owner">Owner</Label>
                                            <Select
                                                value={editingCredential.owner}
                                                onValueChange={(value) => setEditingCredential({ ...editingCredential, owner: value })}
                                            >
                                                <SelectTrigger id="edit-owner">
                                                    <SelectValue placeholder="Select owner" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {users.map((user) => (
                                                        <SelectItem key={user.value} value={user.value}>
                                                            {user.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-description">Description</Label>
                                            <Textarea
                                                id="edit-description"
                                                value={editingCredential.description}
                                                onChange={(e) => setEditingCredential({ ...editingCredential, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-api-key">New API Key (Optional)</Label>
                                            <Input id="edit-api-key" type="password" placeholder="Enter new API key to update" />
                                            <p className="text-sm text-muted-foreground">Leave blank to keep the current API key.</p>
                                        </div>
                                    </div>
                                )}
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsEditCredentialOpen(false)
                                            setEditingCredential(null)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={handleEditCredential}>Save Changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
