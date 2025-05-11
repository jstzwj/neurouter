"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { ModelData } from "../types"

interface ApiTabProps {
  model: ModelData
}

export function ApiTab({ model }: ApiTabProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("openai-python")

  const codeExamples = {
    "openai-python": `from openai import OpenAI

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key="OPENROUTER_API_KEY",
)

completion = client.chat.completions.create(
  extra_headers={
    "HTTP-Referer": "YOUR_SITE_URL", # Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "YOUR_SITE_NAME", # Optional. Site title for rankings on openrouter.ai.
  },
  extra_body={},
  model="${model.path}",
  messages=[
    {
      "role": "user",
      "content": "what is the meaning of life?"
    }
  ]
)
print(completion.choices[0].message.content)`,
    python: `import requests

response = requests.post(
  url="https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": "Bearer OPENROUTER_API_KEY",
    "HTTP-Referer": "YOUR_SITE_URL", # Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "YOUR_SITE_NAME", # Optional. Site title for rankings on openrouter.ai.
  },
  json={
    "model": "${model.path}",
    "messages": [
      {
        "role": "user",
        "content": "what is the meaning of life?"
      }
    ]
  }
)
print(response.json()["choices"][0]["message"]["content"])`,
    typescript: `import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "OPENROUTER_API_KEY",
  defaultHeaders: {
    "HTTP-Referer": "YOUR_SITE_URL", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "YOUR_SITE_NAME", // Optional. Site title for rankings on openrouter.ai.
  },
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "${model.path}",
    messages: [
      {
        role: "user",
        content: "what is the meaning of life?",
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}

main();`,
    "openai-typescript": `import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "OPENROUTER_API_KEY",
  defaultHeaders: {
    "HTTP-Referer": "YOUR_SITE_URL", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "YOUR_SITE_NAME", // Optional. Site title for rankings on openrouter.ai.
  },
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "${model.path}",
    messages: [
      {
        role: "user",
        content: "what is the meaning of life?",
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}

main();`,
    curl: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer OPENROUTER_API_KEY" \\
  -H "HTTP-Referer: YOUR_SITE_URL" \\
  -H "X-Title: YOUR_SITE_NAME" \\
  -d '{
    "model": "${model.path}",
    "messages": [
      {
        "role": "user",
        "content": "what is the meaning of life?"
      }
    ]
  }'`,
  }

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <p>
          NeuroRouter provides an OpenAI-compatible completion API to 300+ models & providers that you can call
          directly, or using the OpenAI SDK.
          <span className="text-primary"> Additionally, some third-party SDKs are available.</span>
        </p>
        <p className="mt-4">
          In the examples below, the <span className="text-primary">NeuroRouter-specific headers</span> are optional.
          Setting them allows your app to appear on the NeuroRouter leaderboards.
        </p>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {Object.keys(codeExamples).map((lang) => (
            <Button
              key={lang}
              variant={selectedLanguage === lang ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedLanguage(lang)}
              className="whitespace-nowrap"
            >
              {lang}
            </Button>
          ))}
          <div className="ml-auto">
            <Button variant="outline" size="sm">
              Copy
            </Button>
          </div>
        </div>
        <pre className="overflow-x-auto p-4 bg-background rounded-md text-sm">
          <code className="text-foreground">{codeExamples[selectedLanguage as keyof typeof codeExamples]}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Using third-party SDKs</h3>
        <p className="text-muted-foreground">
          For information about using third-party SDKs and frameworks with NeuroRouter, please see our{" "}
          <a href="#" className="text-primary hover:underline">
            frameworks documentation
          </a>
          .
        </p>
        <p className="text-muted-foreground">
          See the{" "}
          <a href="#" className="text-primary hover:underline">
            Request docs
          </a>{" "}
          for all possible fields, and{" "}
          <a href="#" className="text-primary hover:underline">
            Parameters
          </a>{" "}
          for explanations of specific sampling parameters.
        </p>
      </div>
    </div>
  )
}
