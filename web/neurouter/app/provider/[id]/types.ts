export interface ProviderModel {
  id: string
  name: string
  description: string
  parameters: string
  context: string
  inputTokens: string
  outputTokens: string
}

export interface TokenUsageData {
  date: string
  completion: number
  prompt: number
  input: number
  embedding: number
  total: number
}

export interface ProviderData {
  id: string
  name: string
  description: string
  modelCount: number
  termsOfServiceUrl: string
  tokenUsage: TokenUsageData[]
  models: ProviderModel[]
}
