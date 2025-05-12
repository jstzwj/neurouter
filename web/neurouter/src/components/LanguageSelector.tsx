"use client"

import { useTranslation } from "react-i18next"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Globe } from "lucide-react"

export default function LanguageSelector() {
    const { i18n } = useTranslation()

    const languages = [
        { code: "en", name: "English" },
        { code: "zh", name: "中文" },
        { code: "ja", name: "日本語" },
    ]

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    // 获取当前语言的显示名称
    const getCurrentLanguageName = () => {
        const currentLang = languages.find((lang) => lang.code === i18n.language)
        return currentLang ? currentLang.name : "English"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                    <Globe size={18} />
                    <span className="sr-only">切换语言</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={i18n.language === language.code ? "bg-accent text-accent-foreground" : ""}
                    >
                        {language.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
