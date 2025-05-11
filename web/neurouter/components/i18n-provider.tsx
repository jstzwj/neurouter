"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import zhCN from "@/locales/zh-CN"
import enUS from "@/locales/en-US"
import jaJP from "@/locales/ja-JP"

export type Locale = "zh-CN" | "en-US" | "ja-JP"
type Translations = Record<string, any>

const translations: Record<Locale, Translations> = {
  "zh-CN": zhCN,
  "en-US": enUS,
  "ja-JP": jaJP,
}

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh-CN")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale && (savedLocale === "zh-CN" || savedLocale === "en-US" || savedLocale === "ja-JP")) {
      setLocale(savedLocale)
    }
  }, [])

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split(".")
    let value = translations[locale]

    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }

    if (typeof value !== "string") return key

    if (params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{${paramKey}}`, "g"), String(paramValue))
      }, value)
    }

    return value || key
  }

  return <I18nContext.Provider value={{ locale, setLocale: changeLocale, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
