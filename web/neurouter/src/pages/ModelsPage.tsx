"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { LayoutGrid, List, Search } from "lucide-react"
import ModelCard from "../components/models/ModelCard"
import ModelFiltersPanel from "../components/models/ModelFilters"
import type { Model, ModelFilters } from "../types/model"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export default function ModelsPage() {
  const { t } = useTranslation()
  const [models, setModels] = useState<Model[]>([])
  const [filteredModels, setFilteredModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<string>("popularity")
  const [filters, setFilters] = useState<ModelFilters>({
    inputModalities: [],
    contextLength: 4000,
    maxPrice: 0,
    series: [],
    categories: [],
    searchQuery: "",
  })

  // 模拟获取模型数据
  useEffect(() => {
    // 在实际应用中，这里会调用API
    setTimeout(() => {
      const mockModels: Model[] = [
        {
          id: "1",
          name: "Nous: DeepHermes 3 Mistral 24B Preview",
          description:
            "DeepHermes 3 (Mistral 24B Preview) is an instruction-tuned language model by Nous Research based on Mistral-Small-24B, designed for chat, function calling, and advanced multi-turn conversations.",
          provider: { id: "nous", name: "nousresearch" },
          contextLength: 33000,
          inputTokenPrice: 0.0,
          outputTokenPrice: 0.0,
          totalTokens: "106M",
          isFree: true,
          isPreview: true,
        },
        {
          id: "2",
          name: "Mistral: Mistral Medium 3",
          description:
            "Mistral Medium 3 is a high-performance enterprise-grade language model designed to deliver frontier-level capabilities at significantly reduced operational cost. It balances state-of-the-art performance with efficiency.",
          provider: { id: "mistral", name: "mistral" },
          contextLength: 131000,
          inputTokenPrice: 0.4,
          outputTokenPrice: 2.0,
          totalTokens: "1.4B",
        },
        {
          id: "3",
          name: "Google: Gemini 2.5 Pro Preview",
          description:
            'Gemini 2.5 Pro is Google\'s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs "thinking" capabilities, enabling it to reason through complex problems.',
          provider: { id: "google", name: "google" },
          contextLength: 1050000,
          inputTokenPrice: 1.25,
          outputTokenPrice: 10.0,
          totalTokens: "83.5B",
          isPreview: true,
          tags: [
            { id: "1", name: "Programming (#3)", color: "bg-blue-100 text-blue-800 border-blue-200" },
            { id: "2", name: "Technology (#7)", color: "bg-green-100 text-green-800 border-green-200" },
            { id: "3", name: "Marketing/Seo (#7)", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
            { id: "4", name: "Academia (#7)", color: "bg-purple-100 text-purple-800 border-purple-200" },
            { id: "5", name: "Legal (#7)", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
          ],
          inputImgPrice: 5.16,
        },
        {
          id: "4",
          name: "Arcee AI: Caller Large",
          description:
            "Arcee AI Caller Large is a specialized model for conversational AI applications, optimized for natural dialogue and voice interactions.",
          provider: { id: "arcee", name: "Arcee AI" },
          contextLength: 32000,
          inputTokenPrice: 0.5,
          outputTokenPrice: 1.5,
          totalTokens: "5.9M",
        },
      ]

      setModels(mockModels)
      setFilteredModels(mockModels)
      setIsLoading(false)
    }, 1000)
  }, [])

  // 处理过滤和搜索
  useEffect(() => {
    if (models.length === 0) return

    let result = [...models]

    // 应用搜索
    if (searchQuery) {
      result = result.filter(
        (model) =>
          model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          model.provider.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // 应用输入模式过滤
    if (filters.inputModalities.length > 0) {
      // 在实际应用中，这里会根据模型的输入模式进行过滤
      // 这里简单模拟一下
      if (filters.inputModalities.includes("Image")) {
        result = result.filter((model) => model.inputImgPrice !== undefined)
      }
    }

    // 应用上下文长度过滤
    if (filters.contextLength > 4000) {
      result = result.filter((model) => model.contextLength >= filters.contextLength)
    }

    // 应用价格过滤
    if (filters.maxPrice > 0) {
      result = result.filter(
        (model) => model.inputTokenPrice <= filters.maxPrice && model.outputTokenPrice <= filters.maxPrice,
      )
    }

    // 应用系列过滤
    if (filters.series.length > 0) {
      result = result.filter((model) => {
        const modelSeries = model.name.split(":")[0].trim()
        return filters.series.some((series) => modelSeries.toLowerCase().includes(series.toLowerCase()))
      })
    }

    // 应用类别过滤
    if (filters.categories.length > 0 && filters.categories.some((c) => c !== "Other")) {
      // 在实际应用中，这里会根据模型的类别进行过滤
      // 这里简单模拟一下
      if (filters.categories.includes("Programming")) {
        result = result.filter((model) => model.tags?.some((tag) => tag.name.includes("Programming")))
      }
    }

    // 应用排序
    switch (sortOption) {
      case "priceLowToHigh":
        result.sort((a, b) => a.inputTokenPrice - b.inputTokenPrice)
        break
      case "priceHighToLow":
        result.sort((a, b) => b.inputTokenPrice - a.inputTokenPrice)
        break
      case "contextLength":
        result.sort((a, b) => b.contextLength - a.contextLength)
        break
      // 默认按流行度排序（这里用totalTokens作为代理）
      default:
        // 保持原始顺序，假设已经按流行度排序
        break
    }

    setFilteredModels(result)
  }, [models, searchQuery, filters, sortOption])

  const handleFiltersChange = (newFilters: ModelFilters) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({
      inputModalities: [],
      contextLength: 4000,
      maxPrice: 0,
      series: [],
      categories: [],
      searchQuery: "",
    })
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t("models.title")}</h1>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{filteredModels.length} models</span>
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            {t("models.resetFilters")}
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* 侧边栏过滤器 */}
        <ModelFiltersPanel filters={filters} onFiltersChange={handleFiltersChange} />

        {/* 主内容区 */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("models.filterModels")}
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {t("models.sort")} <span className="ml-1">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOption("popularity")}>
                    {t("models.sortOptions.popularity")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("priceLowToHigh")}>
                    {t("models.sortOptions.priceLowToHigh")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("priceHighToLow")}>
                    {t("models.sortOptions.priceHighToLow")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("newest")}>
                    {t("models.sortOptions.newest")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("contextLength")}>
                    {t("models.sortOptions.contextLength")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredModels.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No models found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}>
              {filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
