import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Star, GitFork, Lock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface AppCardProps {
    app: {
        id: string
        name: string
        description: string
        isPrivate: boolean
        stars: number
        forks: number
        lastUpdated: string
        language?: string
    }
}

export default function AppCard({ app }: AppCardProps) {
    // Function to get language color
    const getLanguageColor = (language?: string) => {
        const colors: Record<string, string> = {
            TypeScript: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300",
            JavaScript: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
            Python: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300",
            Go: "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-300",
            Rust: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300",
        }

        return language
            ? colors[language] || "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300"
            : ""
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                                <a href={`/apps/${app.id}`}>{app.name}</a>
                            </h3>
                            {app.isPrivate && (
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Lock className="h-3 w-3" />
                                    Private
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground mt-1">{app.description}</p>

                        <div className="flex items-center gap-4 mt-3">
                            {app.language && (
                                <Badge variant="outline" className={getLanguageColor(app.language)}>
                                    {app.language}
                                </Badge>
                            )}

                            {app.stars > 0 && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Star className="h-4 w-4" />
                                    <span>{app.stars}</span>
                                </div>
                            )}

                            {app.forks > 0 && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <GitFork className="h-4 w-4" />
                                    <span>{app.forks}</span>
                                </div>
                            )}

                            <div className="text-sm text-muted-foreground">
                                Updated {formatDistanceToNow(new Date(app.lastUpdated), { addSuffix: true })}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Star className="h-5 w-5 text-muted-foreground hover:text-yellow-500 cursor-pointer" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
