"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import AdminSidebar from "../components/admin/AdminSidebar"
import GeneralSettingsPanel from "../components/admin/GeneralSettingsPanel"
import TeamManagementPanel from "../components/admin/TeamManagementPanel"
import CurrencyManagementPanel from "../components/admin/CurrencyManagementPanel"
import CredentialManagementPanel from "../components/admin/CredentialManagementPanel"
import ProviderManagementPanel from "../components/admin/ProviderManagementPanel"
import GenericPanel from "../components/admin/GenericPanel"

export default function AdminPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("general")

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "general":
        return <GeneralSettingsPanel />
      case "team":
        return <TeamManagementPanel />
      case "currency":
        return <CurrencyManagementPanel />
      case "credentials":
        return <CredentialManagementPanel />
      case "providers":
        return <ProviderManagementPanel />
      case "instances":
        return <GenericPanel title="Instance Management" description="Manage server instances and deployments." />
      case "models":
        return <GenericPanel title="Model Management" description="Manage AI models and their configurations." />
      case "users":
        return <GenericPanel title="User Management" description="Manage users and their permissions." />
      case "roles":
        return <GenericPanel title="Role Management" description="Manage user roles and permissions." />
      case "forwarding":
        return <GenericPanel title="Forwarding Settings" description="Configure request forwarding and routing." />
      case "site":
        return <GenericPanel title="Site Settings" description="Configure website appearance and behavior." />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <div className="flex gap-8">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <div className="flex-1 space-y-4">{renderTabContent(activeTab)}</div>
      </div>
    </div>
  )
}
