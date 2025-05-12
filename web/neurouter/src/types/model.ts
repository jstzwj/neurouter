export interface ModelProvider {
    id: string
    name: string
    logo?: string
}

export interface ModelTag {
    id: string
    name: string
    color: string
}

export interface Model {
    id: string
    name: string
    description: string
    provider: ModelProvider
    contextLength: number
    inputTokenPrice: number
    outputTokenPrice: number
    totalTokens: string
    isFree?: boolean
    isPreview?: boolean
    tags?: ModelTag[]
    inputImgPrice?: number
    path?: string
    createdAt?: string
}

export type InputModality = "Text" | "Image" | "File"

export type ModelSeries = "GPT" | "Claude" | "Gemini" | "Mistral" | "Other"

export type ModelCategory = "Roleplay" | "Programming" | "Marketing" | "Technology" | "Academia" | "Legal" | "Other"

export interface ModelFilters {
    inputModalities: InputModality[]
    contextLength: number
    maxPrice: number
    series: ModelSeries[]
    categories: ModelCategory[]
    searchQuery: string
}
