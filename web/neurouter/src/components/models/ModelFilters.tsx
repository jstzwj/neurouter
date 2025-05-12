"use client"

import { useState } from "react"
import { ChevronDown, SlidersHorizontal, Zap } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { Slider } from "../ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import type { InputModality, ModelCategory, ModelFilters, ModelSeries } from "../../types/model"
import { useTranslation } from "react-i18next"

interface ModelFiltersProps {
    filters: ModelFilters
    onFiltersChange: (filters: ModelFilters) => void
}

export default function ModelFiltersPanel({ filters, onFiltersChange }: ModelFiltersProps) {
    const { t } = useTranslation()
    const [openSections, setOpenSections] = useState({
        inputModalities: true,
        contextLength: true,
        pricing: true,
        series: true,
        categories: true,
    })

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const handleInputModalityChange = (modality: InputModality, checked: boolean) => {
        const newModalities = checked
            ? [...filters.inputModalities, modality]
            : filters.inputModalities.filter((m) => m !== modality)

        onFiltersChange({
            ...filters,
            inputModalities: newModalities,
        })
    }

    const handleSeriesChange = (series: ModelSeries, checked: boolean) => {
        const newSeries = checked ? [...filters.series, series] : filters.series.filter((s) => s !== series)

        onFiltersChange({
            ...filters,
            series: newSeries,
        })
    }

    const handleCategoryChange = (category: ModelCategory, checked: boolean) => {
        const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)

        onFiltersChange({
            ...filters,
            categories: newCategories,
        })
    }

    const handleContextLengthChange = (value: number[]) => {
        onFiltersChange({
            ...filters,
            contextLength: value[0],
        })
    }

    const handleMaxPriceChange = (value: number[]) => {
        onFiltersChange({
            ...filters,
            maxPrice: value[0],
        })
    }

    const formatContextLength = (value: number) => {
        if (value >= 1000000) return `${value / 1000000}M`
        if (value >= 1000) return `${value / 1000}K`
        return value.toString()
    }

    const formatPrice = (value: number) => {
        if (value === 0) return "FREE"
        if (value >= 10) return "$10+"
        return `$${value.toFixed(1)}`
    }

    return (
        <div className="w-60 pr-6 border-r">
            <div className="space-y-6">
                {/* Input Modalities */}
                <Collapsible open={openSections.inputModalities}>
                    <CollapsibleTrigger asChild onClick={() => toggleSection("inputModalities")}>
                        <div className="flex items-center justify-between cursor-pointer mb-2">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="h-4 w-4" />
                                <h3 className="text-sm font-medium">{t("models.filters.inputModalities")}</h3>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${openSections.inputModalities ? "transform rotate-180" : ""}`}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2">
                        {["Text", "Image", "File"].map((modality) => (
                            <div key={modality} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`modality-${modality}`}
                                    checked={filters.inputModalities.includes(modality as InputModality)}
                                    onCheckedChange={(checked) =>
                                        handleInputModalityChange(modality as InputModality, checked as boolean)
                                    }
                                />
                                <label
                                    htmlFor={`modality-${modality}`}
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {modality}
                                </label>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>

                {/* Context Length */}
                <Collapsible open={openSections.contextLength}>
                    <CollapsibleTrigger asChild onClick={() => toggleSection("contextLength")}>
                        <div className="flex items-center justify-between cursor-pointer mb-2">
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                <h3 className="text-sm font-medium">{t("models.filters.contextLength")}</h3>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${openSections.contextLength ? "transform rotate-180" : ""}`}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="pt-4 pb-2">
                            <Slider
                                defaultValue={[filters.contextLength]}
                                max={1000000}
                                min={4000}
                                step={1000}
                                onValueChange={handleContextLengthChange}
                            />
                            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                <span>4K</span>
                                <span>64K</span>
                                <span>1M</span>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                {/* Prompt Pricing */}
                <Collapsible open={openSections.pricing}>
                    <CollapsibleTrigger asChild onClick={() => toggleSection("pricing")}>
                        <div className="flex items-center justify-between cursor-pointer mb-2">
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                <h3 className="text-sm font-medium">{t("models.filters.promptPricing")}</h3>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${openSections.pricing ? "transform rotate-180" : ""}`}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="pt-4 pb-2">
                            <Slider
                                defaultValue={[filters.maxPrice]}
                                max={10}
                                min={0}
                                step={0.5}
                                onValueChange={handleMaxPriceChange}
                            />
                            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                <span>FREE</span>
                                <span>$0.5</span>
                                <span>$10+</span>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                {/* Series */}
                <Collapsible open={openSections.series}>
                    <CollapsibleTrigger asChild onClick={() => toggleSection("series")}>
                        <div className="flex items-center justify-between cursor-pointer mb-2">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="h-4 w-4" />
                                <h3 className="text-sm font-medium">{t("models.filters.series")}</h3>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${openSections.series ? "transform rotate-180" : ""}`}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2">
                        {["GPT", "Claude", "Gemini", "Mistral", "Other"].map((series) => (
                            <div key={series} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`series-${series}`}
                                    checked={filters.series.includes(series as ModelSeries)}
                                    onCheckedChange={(checked) => handleSeriesChange(series as ModelSeries, checked as boolean)}
                                />
                                <label
                                    htmlFor={`series-${series}`}
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {series}
                                </label>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>

                {/* Categories */}
                <Collapsible open={openSections.categories}>
                    <CollapsibleTrigger asChild onClick={() => toggleSection("categories")}>
                        <div className="flex items-center justify-between cursor-pointer mb-2">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="h-4 w-4" />
                                <h3 className="text-sm font-medium">{t("models.filters.categories")}</h3>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${openSections.categories ? "transform rotate-180" : ""}`}
                            />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2">
                        {["Roleplay", "Programming", "Marketing", "Technology", "Academia", "Legal", "Other"].map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`category-${category}`}
                                    checked={filters.categories.includes(category as ModelCategory)}
                                    onCheckedChange={(checked) => handleCategoryChange(category as ModelCategory, checked as boolean)}
                                />
                                <label
                                    htmlFor={`category-${category}`}
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {category}
                                </label>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    )
}
