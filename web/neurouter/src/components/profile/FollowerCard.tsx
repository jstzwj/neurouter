"use client"

import { useState } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { UserPlus, UserMinus } from "lucide-react"

interface FollowerCardProps {
    user: {
        id: string
        name: string
        username: string
        avatar?: string
        bio: string
        isFollowing: boolean
    }
}

export default function FollowerCard({ user }: FollowerCardProps) {
    const [isFollowing, setIsFollowing] = useState(user.isFollowing)

    const handleToggleFollow = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <Avatar className="h-16 w-16">
                        {user.avatar ? (
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        ) : (
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        )}
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold">
                                    <a href={`/profile/${user.username}`} className="hover:text-primary transition-colors">
                                        {user.name}
                                    </a>
                                </h3>
                                <div className="text-sm text-muted-foreground">@{user.username}</div>
                            </div>

                            <Button
                                variant={isFollowing ? "outline" : "default"}
                                size="sm"
                                onClick={handleToggleFollow}
                                className="ml-2"
                            >
                                {isFollowing ? (
                                    <>
                                        <UserMinus className="h-4 w-4 mr-1" />
                                        Unfollow
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="h-4 w-4 mr-1" />
                                        Follow
                                    </>
                                )}
                            </Button>
                        </div>

                        <p className="text-sm mt-2 line-clamp-2">{user.bio}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
