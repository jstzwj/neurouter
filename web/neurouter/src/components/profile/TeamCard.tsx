import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Users } from "lucide-react"

interface TeamCardProps {
    team: {
        id: string
        name: string
        avatar?: string
        role: string
        memberCount: number
    }
}

export default function TeamCard({ team }: TeamCardProps) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
            <Avatar className="h-10 w-10">
                {team.avatar ? (
                    <AvatarImage src={team.avatar || "/placeholder.svg"} alt={team.name} />
                ) : (
                    <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                )}
            </Avatar>
            <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                    <a href={`/teams/${team.id}`} className="hover:text-primary transition-colors">
                        {team.name}
                    </a>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-2">{team.role}</span>
                    <Users className="h-3 w-3 mr-1" />
                    <span>{team.memberCount}</span>
                </div>
            </div>
        </div>
    )
}
