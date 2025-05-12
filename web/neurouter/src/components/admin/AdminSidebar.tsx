"use client"

import type React from "react"

import {
    Settings,
    Users,
    CreditCard,
    Key,
    Server,
    Database,
    Globe,
    Shield,
    Layers,
    Repeat,
    UserCog,
} from "lucide-react"

interface AdminTab {
    id: string
    label: string
    icon: React.ReactNode
}

interface AdminSidebarProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

export const adminTabs: AdminTab[] = [
    { id: "general", label: "General Settings", icon: <Settings className="h-4 w-4 mr-2" /> },
    { id: "team", label: "Team Management", icon: <UserCog className="h-4 w-4 mr-2" /> },
    { id: "currency", label: "Currency Management", icon: <CreditCard className="h-4 w-4 mr-2" /> },
    { id: "credentials", label: "Credential Management", icon: <Key className="h-4 w-4 mr-2" /> },
    { id: "providers", label: "Provider Management", icon: <Database className="h-4 w-4 mr-2" /> },
    { id: "instances", label: "Instance Management", icon: <Server className="h-4 w-4 mr-2" /> },
    { id: "models", label: "Model Management", icon: <Layers className="h-4 w-4 mr-2" /> },
    { id: "users", label: "User Management", icon: <Users className="h-4 w-4 mr-2" /> },
    { id: "roles", label: "Role Management", icon: <Shield className="h-4 w-4 mr-2" /> },
    { id: "forwarding", label: "Forwarding Settings", icon: <Repeat className="h-4 w-4 mr-2" /> },
    { id: "site", label: "Site Settings", icon: <Globe className="h-4 w-4 mr-2" /> },
]

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
    return (
        <div className="w-64 shrink-0 border rounded-lg">
            <div className="p-4 border-b">
                <h2 className="font-medium">Admin Settings</h2>
            </div>
            <nav className="p-2">
                <ul className="space-y-1">
                    {adminTabs.map((tab) => (
                        <li key={tab.id}>
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
