"use client"

import { useState } from "react"
import { useI18n } from "@/components/i18n-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown, Copy, Grid, List, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ModelsPage() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [expandedModels, setExpandedModels] = useState<Record<string, boolean>>({})
  const [contextLength, setContextLength] = useState([4, 1000])
  const [pricingRange, setPricingRange] = useState([0, 10])

  // 筛选器状态
  const [filters, setFilters] = useState({
    modalities: {
      text: true,
      image: false,
      file: false,
    },
    series: {
      gpt: false,
      claude: false,
      gemini: false,
    },
    categories: {
      programming: false,
      health: false,
      academia: false,
      legal: false,
      marketing: false,
    },
  })

  const toggleFilter = (section: keyof typeof filters, key: string) => {
    setFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key as keyof (typeof prev)[section]],
      },
    }))
  }

  const resetFilters = () => {
    setFilters({
      modalities: {
        text: true,
        image: false,
        file: false,
      },
      series: {
        gpt: false,
        claude: false,
        gemini: false,
      },
      categories: {
        programming: false,
        health: false,
        academia: false,
        legal: false,
        marketing: false,
      },
    })
    setContextLength([4, 1000])
    setPricingRange([0, 10])
  }

  const toggleModelExpand = (modelId: string) => {
    setExpandedModels((prev) => ({
      ...prev,
      [modelId]: !prev[modelId],
    }))
  }

  // 模型数据
  const models = [
    {
      id: "gemini-2-5-pro-preview",
      name: "Google: Gemini 2.5 Pro Preview",
      provider: "google",
      description:
        'Gemini 2.5 Pro is Google\'s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs "thinking" capabilities, enabling it to reason through complex problems.',
      tokens: "77.6B",
      context: "1.05M",
      inputPrice: "$1.25/M",
      outputPrice: "$10/M",
      imgPrice: "$5.16/K",
      categories: ["programming", "health", "academia", "legal", "marketing"],
    },
    {
      id: "claude-3-7-sonnet",
      name: "Anthropic: Claude 3.7 Sonnet",
      provider: "anthropic",
      description:
        "Claude 3.7 Sonnet is an advanced large language model with improved reasoning capabilities, enhanced factual accuracy, and better instruction following.",
      tokens: "38.3B",
      context: "200K",
      inputPrice: "$0.8/M",
      outputPrice: "$8/M",
      categories: ["programming", "health", "academia", "legal"],
    },
    {
      id: "mistral-medium-3",
      name: "Mistral: Mistral Medium 3",
      provider: "mistral",
      description:
        "Mistral Medium 3 is a high-performance enterprise-grade language model designed to deliver frontier-level capabilities at significantly reduced operational cost. It balances state-of-the-art performance with efficiency.",
      tokens: "658M",
      context: "131K",
      inputPrice: "$0.40/M",
      outputPrice: "$2/M",
      categories: [],
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧筛选器 */}
        <div className="w-full lg:w-64 space-y-6">
          {/* 输入模态 */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="font-medium">{t("input_modalities")}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="text"
                  checked={filters.modalities.text}
                  onCheckedChange={() => toggleFilter("modalities", "text")}
                />
                <label htmlFor="text" className="text-sm cursor-pointer">
                  {t("text")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="image"
                  checked={filters.modalities.image}
                  onCheckedChange={() => toggleFilter("modalities", "image")}
                />
                <label htmlFor="image" className="text-sm cursor-pointer">
                  {t("image")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="file"
                  checked={filters.modalities.file}
                  onCheckedChange={() => toggleFilter("modalities", "file")}
                />
                <label htmlFor="file" className="text-sm cursor-pointer">
                  {t("file")}
                </label>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* 上下文长度 */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="font-medium">{t("context_length")}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 pb-2">
              <div className="px-1">
                <Slider
                  value={contextLength}
                  min={4}
                  max={1000}
                  step={1}
                  onValueChange={setContextLength}
                  className="mb-6"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>4K</span>
                  <span>64K</span>
                  <span>1M</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* 提示定价 */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="font-medium">{t("prompt_pricing")}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 pb-2">
              <div className="px-1">
                <Slider
                  value={pricingRange}
                  min={0}
                  max={10}
                  step={0.1}
                  onValueChange={setPricingRange}
                  className="mb-6"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t("free")}</span>
                  <span>$0.5</span>
                  <span>$10+</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* 系列 */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="font-medium">{t("series")}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="gpt" checked={filters.series.gpt} onCheckedChange={() => toggleFilter("series", "gpt")} />
                <label htmlFor="gpt" className="text-sm cursor-pointer">
                  GPT
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="claude"
                  checked={filters.series.claude}
                  onCheckedChange={() => toggleFilter("series", "claude")}
                />
                <label htmlFor="claude" className="text-sm cursor-pointer">
                  Claude
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gemini"
                  checked={filters.series.gemini}
                  onCheckedChange={() => toggleFilter("series", "gemini")}
                />
                <label htmlFor="gemini" className="text-sm cursor-pointer">
                  Gemini
                </label>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* 类别 */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="font-medium">{t("categories")}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="programming"
                  checked={filters.categories.programming}
                  onCheckedChange={() => toggleFilter("categories", "programming")}
                />
                <label htmlFor="programming" className="text-sm cursor-pointer">
                  {t("programming")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="health"
                  checked={filters.categories.health}
                  onCheckedChange={() => toggleFilter("categories", "health")}
                />
                <label htmlFor="health" className="text-sm cursor-pointer">
                  {t("health")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="academia"
                  checked={filters.categories.academia}
                  onCheckedChange={() => toggleFilter("categories", "academia")}
                />
                <label htmlFor="academia" className="text-sm cursor-pointer">
                  {t("academia")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="legal"
                  checked={filters.categories.legal}
                  onCheckedChange={() => toggleFilter("categories", "legal")}
                />
                <label htmlFor="legal" className="text-sm cursor-pointer">
                  {t("legal")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={filters.categories.marketing}
                  onCheckedChange={() => toggleFilter("categories", "marketing")}
                />
                <label htmlFor="marketing" className="text-sm cursor-pointer">
                  {t("marketing")}
                </label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* 右侧内容 */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{t("models")}</h1>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">{t("models_count_display", { count: models.length })}</p>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                {t("reset_filters")}
              </Button>
            </div>
          </div>

          {/* 搜索和排序 */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("filter_models")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-muted" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-muted" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 模型列表 */}
          <div className="space-y-4">
            {models.map((model) => (
              <Link href={`/model/${model.id}`} key={model.id}>
                <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{model.name}</h3>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {t("tokens")}: {model.tokens}
                          </p>
                        </div>
                      </div>

                      {/* 模型描述 */}
                      <p className="text-sm">{model.description}</p>

                      {/* 类别标签 */}
                      {model.categories && model.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {model.categories.slice(0, 5).map((category) => (
                            <span key={category} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {t(category)} ({Math.floor(Math.random() * 10) + 1})
                            </span>
                          ))}
                          {model.categories.length > 5 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                              {t("more_categories", { count: model.categories.length - 5 })}
                            </span>
                          )}
                        </div>
                      )}

                      {/* 提供商和价格信息 */}
                      <div className="text-sm text-muted-foreground mt-2">
                        <span>
                          {t("by")} {model.provider}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          {model.context} {t("context")}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          {model.inputPrice} {t("input_tokens")}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          {model.outputPrice} {t("output_tokens")}
                        </span>
                        {model.imgPrice && (
                          <>
                            <span className="mx-2">•</span>
                            <span>
                              {model.imgPrice} {t("image")}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
