import { useTranslation } from "react-i18next"

export default function DocsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("nav.docs")}</h1>
      <p>Documentation page content will go here.</p>
    </div>
  )
}
