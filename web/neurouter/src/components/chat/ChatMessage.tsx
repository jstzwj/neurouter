import { Avatar, AvatarFallback } from "../ui/avatar"

interface ChatMessageProps {
    content: string
    sender: "user" | "assistant"
    timestamp: Date
    model?: string
}

export default function ChatMessage({ content, sender, timestamp, model }: ChatMessageProps) {
    const isUser = sender === "user"

    return (
        <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
            {!isUser && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback>AI</AvatarFallback>
                </Avatar>
            )}

            <div className="flex flex-col">
                {model && !isUser && <span className="text-xs text-muted-foreground mb-1">{model}</span>}

                <div
                    className={`rounded-lg p-3 max-w-[80%] ${isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"}`}
                >
                    {content}
                </div>

                <span className="text-xs text-muted-foreground mt-1">
                    {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
            </div>

            {isUser && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            )}
        </div>
    )
}
