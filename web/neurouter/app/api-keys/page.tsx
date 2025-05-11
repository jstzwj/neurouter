"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, MoreVertical, Copy, RefreshCw, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string | null
  usageAmount: number
  limit: string
}

export default function ApiKeysPage() {
  const { toast } = useToast()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "3090_api",
      key: "sk-or-v1-0c9...963",
      created: "2023-04-15",
      lastUsed: "2023-05-10",
      usageAmount: 0.002,
      limit: "Unlimited",
    },
    {
      id: "2",
      name: "development",
      key: "sk-or-v1-a7b...421",
      created: "2023-04-20",
      lastUsed: "2023-05-09",
      usageAmount: 0.015,
      limit: "$10.00",
    },
  ])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyLimit, setNewKeyLimit] = useState("unlimited")
  const [customLimit, setCustomLimit] = useState("")
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [showFullKey, setShowFullKey] = useState<Record<string, boolean>>({})

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your API key",
        variant: "destructive",
      })
      return
    }

    const limit = customLimit.trim() ? `$${customLimit}` : "Unlimited"

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk-or-v1-${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 5)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: null,
      usageAmount: 0,
      limit,
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    setCustomLimit("")
    setIsCreateDialogOpen(false)

    toast({
      title: "API key created",
      description: "Your new API key has been created successfully.",
    })
  }

  const handleDeleteKey = () => {
    if (keyToDelete) {
      setApiKeys(apiKeys.filter((key) => key.id !== keyToDelete))
      setKeyToDelete(null)
      setIsDeleteDialogOpen(false)

      toast({
        title: "API key deleted",
        description: "Your API key has been deleted successfully.",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to clipboard.",
    })
  }

  const toggleShowFullKey = (id: string) => {
    setShowFullKey((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">API Keys</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">Create API Key</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create a Key</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="key-name">Name</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                          <Info className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Give your API key a memorable name to help you identify it later.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="key-name"
                  placeholder="e.g. 'Chatbot Key'"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="credit-limit">Credit limit (optional)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                          <Info className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Set a spending limit for this API key. Leave blank for unlimited.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="credit-limit"
                  placeholder="Leave blank for unlimited"
                  value={customLimit}
                  onChange={(e) => {
                    setCustomLimit(e.target.value)
                    setNewKeyLimit("custom")
                  }}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button onClick={handleCreateKey}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center mb-6">
        <p className="text-muted-foreground">Manage your API keys to access all models from NeuroRouter</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                API keys are used to authenticate requests to the NeuroRouter API. Keep your API keys secure and do not
                share them in publicly accessible areas.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{apiKey.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${apiKey.usageAmount.toFixed(3)} used • {apiKey.limit}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-mono text-sm">
                    {showFullKey[apiKey.id] ? (
                      <span className="text-muted-foreground">
                        sk-or-v1-0c9b3d5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u
                      </span>
                    ) : (
                      apiKey.key
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => copyToClipboard(apiKey.key)}>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleShowFullKey(apiKey.id)}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        <span>{showFullKey[apiKey.id] ? "Hide" : "Show"} full key</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 focus:text-red-500"
                        onClick={() => {
                          setKeyToDelete(apiKey.id)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {apiKeys.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">You don't have any API keys yet.</p>
            <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              Create your first API key
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your API key and revoke access for any
              applications using it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setKeyToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteKey} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
