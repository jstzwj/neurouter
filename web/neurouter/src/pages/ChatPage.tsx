import { useTranslation } from "react-i18next"

export default function ChatPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("nav.chat")}</h1>
      <p>Chat page content will go here.</p>
    </div>
  )
}
