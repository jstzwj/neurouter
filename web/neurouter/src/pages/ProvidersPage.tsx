import { useTranslation } from "react-i18next"

export default function ProvidersPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("nav.providers")}</h1>
      <p>Providers page content will go here.</p>
    </div>
  )
}
