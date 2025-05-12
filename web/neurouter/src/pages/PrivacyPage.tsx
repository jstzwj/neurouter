"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../components/ui/button"
import { Switch } from "../components/ui/switch"
import { Info } from "lucide-react"

export default function PrivacyPage() {
    const { t } = useTranslation()
    const [enableTrainingOnInputs, setEnableTrainingOnInputs] = useState(true)
    const [enableInputOutputLogging, setEnableInputOutputLogging] = useState(false)
    const [enableFreeModelTraining, setEnableFreeModelTraining] = useState(true)
    const [enableAnalyticsCookies, setEnableAnalyticsCookies] = useState(false)

    return (
        <div className="container mx-auto py-8">
            <div className="flex gap-8">
                {/* Left Sidebar */}
                <div className="w-48 shrink-0">
                    <nav className="space-y-1">
                        <div className="text-lg font-medium mb-4">Settings</div>
                        <div className="space-y-1">
                            <a href="/settings/credits" className="block py-2 text-muted-foreground hover:text-foreground">
                                Credits
                            </a>
                            <a href="/settings/api-keys" className="block py-2 text-muted-foreground hover:text-foreground">
                                API Keys
                            </a>
                            <a href="/settings/provisioning-keys" className="block py-2 text-muted-foreground hover:text-foreground">
                                Provisioning Keys
                            </a>
                            <a href="/settings/integrations" className="block py-2 text-muted-foreground hover:text-foreground">
                                Integrations
                            </a>
                            <a href="/settings/privacy" className="block py-2 text-primary font-medium">
                                Privacy
                            </a>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-8">Privacy</h1>

                    <div className="space-y-8">
                        {/* Paid Models Section */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Paid Models</h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="font-medium">Enable providers that may train on inputs</div>
                                        <div className="text-sm text-muted-foreground flex items-center">
                                            Control whether to enable paid providers that can anonymously use your data.
                                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                                <Info className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Switch checked={enableTrainingOnInputs} onCheckedChange={setEnableTrainingOnInputs} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="font-medium">Enable input/output logging</div>
                                        <div className="text-sm text-muted-foreground flex items-center">
                                            Store inputs & outputs with OpenRouter and get a 1% discount on all LLMs.
                                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                                <Info className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Switch checked={enableInputOutputLogging} onCheckedChange={setEnableInputOutputLogging} />
                                </div>
                            </div>
                        </section>

                        {/* Free Models Section */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Free Models</h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="font-medium">Enable training and logging (chatroom and API)</div>
                                        <div className="text-sm text-muted-foreground flex items-center">
                                            Free endpoints may log, retain, or train on your prompts. You remain anonymous.
                                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                                <Info className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Switch checked={enableFreeModelTraining} onCheckedChange={setEnableFreeModelTraining} />
                                </div>
                            </div>
                        </section>

                        {/* Chat History Section */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Chat History</h2>

                            <div className="space-y-2">
                                <p className="text-muted-foreground">
                                    Your chat history in the{" "}
                                    <a href="/chat" className="text-primary hover:underline">
                                        Chatroom
                                    </a>{" "}
                                    is stored locally on your device. If logging is enabled, only LLM inputs and outputs are saved.
                                </p>
                            </div>
                        </section>

                        {/* Analytics Cookies Section */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Analytics Cookies</h2>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="font-medium">
                                        Enable analytics cookies to help us improve the user experience and site performance.
                                    </div>
                                </div>
                                <Switch checked={enableAnalyticsCookies} onCheckedChange={setEnableAnalyticsCookies} />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
