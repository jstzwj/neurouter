import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { I18nextProvider } from "react-i18next"
import i18n from "./i18n"
import { ThemeProvider } from "./components/theme-provider"
import { Theme } from "@radix-ui/themes"

import "./index.css"
import "@radix-ui/themes/styles.css"



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider defaultTheme="light" storageKey="neurouter-theme">
          <Theme>
            <App />
          </Theme>
        </ThemeProvider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
