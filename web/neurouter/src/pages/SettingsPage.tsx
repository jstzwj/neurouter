import { useTranslation } from "react-i18next"

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("nav.settings")}</h1>
      <p>Settings page content will go here.</p>
    </div>
  )
}
