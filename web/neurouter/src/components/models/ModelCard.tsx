import { Link } from "react-router-dom"
import type { Model, ModelTag } from "../../types/model"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Bookmark, Copy } from "lucide-react"
import { Button } from "../ui/button"

interface ModelCardProps {
    model: Model
}

export default function ModelCard({ model }: ModelCardProps) {
    const formatTokenPrice = (price: number) => {
        if (price === 0) return "Free"
        return `$${price.toFixed(price < 0.01 ? 4 : 2)}/M`
    }

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
        return num.toString()
    }

    const getTagColor = (tag: ModelTag) => {
        return `bg-${tag.color}-100 text-${tag.color}-800 border-${tag.color}-200`
    }

    return (
        <Card className="mb-6 overflow-hidden">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Link to={`/models/${model.id}`} className="hover:text-primary transition-colors">
                                <h3 className="text-xl font-semibold">{model.name}</h3>
                            </Link>
                            {model.isPreview && (
                                <Badge variant="outline" className="border-blue-200 text-blue-800 bg-blue-50">
                                    Preview
                                </Badge>
                            )}
                            {model.isFree && (
                                <Badge variant="outline" className="border-green-200 text-green-800 bg-green-50">
                                    Free
                                </Badge>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
                                <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Bookmark className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-muted-foreground line-clamp-2 mb-4">{model.description}</p>

                        {model.tags && model.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {model.tags.map((tag) => (
                                    <Badge key={tag.id} variant="outline" className={`${tag.color} text-xs`}>
                                        {tag.name}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-center gap-1">
                                    <span className="font-medium">
                                        by{" "}
                                        <Link to={`/providers/${model.provider.id}`} className="hover:text-primary">
                                            {model.provider.name}
                                        </Link>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>{formatNumber(model.contextLength)} context</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>{formatTokenPrice(model.inputTokenPrice)} input tokens</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>{formatTokenPrice(model.outputTokenPrice)} output tokens</span>
                                </div>
                                {model.inputImgPrice && (
                                    <div className="flex items-center gap-1">
                                        <span>${model.inputImgPrice.toFixed(2)}/M input imgs</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="text-right ml-4">
                        <div className="text-lg font-medium">{model.totalTokens} tokens</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
