import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Layout from "./components/Layout"
import LoadingSpinner from "./components/LoadingSpinner"

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"))
const ModelsPage = lazy(() => import("./pages/ModelsPage"))
const ModelDetailPage = lazy(() => import("./pages/ModelDetailPage"))
const ChatPage = lazy(() => import("./pages/ChatPage"))
const RankingsPage = lazy(() => import("./pages/RankingsPage"))
const DocsPage = lazy(() => import("./pages/DocsPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const SettingsPage = lazy(() => import("./pages/SettingsPage"))
const AdminPage = lazy(() => import("./pages/AdminPage"))
const ProvidersPage = lazy(() => import("./pages/ProvidersPage"))
const DatasetsPage = lazy(() => import("./pages/DatasetsPage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))
const ProviderDetailPage = lazy(() => import("./pages/ProviderDetailPage"))
const CreditsPage = lazy(() => import("./pages/CreditsPage"))
const ApiKeysPage = lazy(() => import("./pages/ApiKeysPage"))
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"))
const StatisticsPage = lazy(() => import("./pages/StatisticsPage"))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="models" element={<ModelsPage />} />
          <Route path="models/:modelId" element={<ModelDetailPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="rankings" element={<RankingsPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="providers" element={<ProvidersPage />} />
          <Route path="providers/:providerId" element={<ProviderDetailPage />} />
          <Route path="datasets" element={<DatasetsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="settings/credits" element={<CreditsPage />} />
          <Route path="settings/api-keys" element={<ApiKeysPage />} />
          <Route path="settings/privacy" element={<PrivacyPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
