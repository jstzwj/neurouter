"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Plus, Search } from "lucide-react"
import { Input } from "../ui/input"

interface ChatRoom {
    id: string
    name: string
    lastMessage?: string
    timestamp?: string
    isActive?: boolean
}

interface ChatSidebarProps {
    rooms: ChatRoom[]
    onRoomSelect: (roomId: string) => void
    onNewRoom: () => void
}

export default function ChatSidebar({ rooms, onRoomSelect, onNewRoom }: ChatSidebarProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredRooms = searchQuery
        ? rooms.filter(
            (room) =>
                room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (room.lastMessage && room.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        : rooms

    return (
        <div className="w-64 border-r flex flex-col h-full">
            <div className="p-3 border-b">
                <Button onClick={onNewRoom} variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        New Room
                    </div>
                    <Badge variant="outline" className="ml-2">
                        ⌘ 0
                    </Badge>
                </Button>
            </div>

            <div className="p-3 border-b">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search chats"
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredRooms.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">No chats found</div>
                ) : (
                    filteredRooms.map((room) => (
                        <div
                            key={room.id}
                            className={`p-3 cursor-pointer hover:bg-muted/50 ${room.isActive ? "bg-muted" : ""}`}
                            onClick={() => onRoomSelect(room.id)}
                        >
                            <div className="font-medium">{room.name}</div>
                            {room.lastMessage && <div className="text-sm text-muted-foreground truncate">{room.lastMessage}</div>}
                            {room.timestamp && <div className="text-xs text-muted-foreground mt-1">{room.timestamp}</div>}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
