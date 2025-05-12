"use client"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface Model {
    id: string
    name: string
    provider: string
}

interface ModelSelectorProps {
    selectedModel: string
    onModelSelect: (modelId: string) => void
}

export default function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
    // Mock models data
    const models: Model[] = [
        { id: "auto", name: "Auto Router", provider: "NeuRouter" },
        { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
        { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic" },
        { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
        { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta" },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 bg-muted/50 border-0 h-8">
                    <span>{selectedModel}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
                {models.map((model) => (
                    <DropdownMenuItem
                        key={model.id}
                        onClick={() => onModelSelect(model.name)}
                        className="flex flex-col items-start"
                    >
                        <span className="font-medium">{model.name}</span>
                        <span className="text-xs text-muted-foreground">{model.provider}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
