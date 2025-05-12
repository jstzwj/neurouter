import { useTranslation } from "react-i18next"

export default function AdminPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("nav.admin")}</h1>
      <p>Admin page content will go here.</p>
    </div>
  )
}
