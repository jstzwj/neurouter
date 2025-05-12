import { useTranslation } from "react-i18next"

export default function RankingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("nav.rankings")}</h1>
      <p>Rankings page content will go here.</p>
    </div>
  )
}
