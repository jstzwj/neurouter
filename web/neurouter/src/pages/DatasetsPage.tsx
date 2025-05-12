import { useTranslation } from "react-i18next"

export default function DatasetsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("nav.datasets")}</h1>
      <p>Datasets page content will go here.</p>
    </div>
  )
}
