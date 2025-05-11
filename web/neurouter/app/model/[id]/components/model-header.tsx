import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, BarChart2 } from "lucide-react"
import type { ModelData } from "../types"

interface ModelHeaderProps {
  model: ModelData
}

export function ModelHeader({ model }: ModelHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold">{model.name}</h1>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Compare
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        <code>{model.path}</code>
        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 text-sm mb-4">
        <span>Created {model.created}</span>
        <span>•</span>
        <span>{model.context} context</span>
        <span>•</span>
        <span>Starting at {model.inputPrice} input tokens</span>
        <span>•</span>
        <span>Starting at {model.outputPrice} output tokens</span>
        {model.imagePrice && (
          <>
            <span>•</span>
            <span>{model.imagePrice} input imgs</span>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {model.categories.map((category, index) => (
          <Badge key={index} variant="outline" className="rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary mr-1.5"></span>
            {category.name} ({category.count})
          </Badge>
        ))}
        {model.categories.length > 4 && (
          <Badge variant="outline" className="rounded-full">
            +{model.categories.length - 4} categories
          </Badge>
        )}
      </div>

      <div className="text-muted-foreground">{model.description}</div>
    </div>
  )
}
