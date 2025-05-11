export interface ModelCategory {
  name: string
  count: number
}

export interface ProviderDataPolicy {
  promptTraining: string
  promptLogging: string
  moderation: string
}

export interface Provider {
  name: string
  context: string
  maxOutput: string
  inputPrice: string
  inputPriceRange: string
  outputPrice: string
  outputPriceRange: string
  latency: string
  throughput: string
  uptime: number
  details: {
    dataPolicy: ProviderDataPolicy
    supportedParameters: string[]
  }
}

export interface ChartDataPoint {
  date: string
  [key: string]: string | number
}

export interface ModelData {
  id: string
  name: string
  path: string
  created: string
  context: string
  inputPrice: string
  outputPrice: string
  imagePrice?: string
  categories: ModelCategory[]
  description: string
  providers: Provider[]
  throughputData: ChartDataPoint[]
  latencyData: ChartDataPoint[]
}
