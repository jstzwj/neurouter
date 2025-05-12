export interface Currency {
    id: string
    name: string
    code: string
    symbol: string
    exchangeRate: number
    isDefault: boolean
}

export interface TeamMember {
    id: string
    name: string
    email: string
    role: string
    avatar?: string
    status: "active" | "inactive" | "pending"
    joinedDate: string
}
