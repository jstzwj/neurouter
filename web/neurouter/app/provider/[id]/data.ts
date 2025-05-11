import type { ProviderData } from "./types"

export const providersData: Record<string, ProviderData> = {
  novitaai: {
    id: "novitaai",
    name: "NovitaAI",
    description: "NovitaAI provides high-performance AI models with competitive pricing and excellent uptime.",
    modelCount: 49,
    termsOfServiceUrl: "https://novitaai.com/terms",
    tokenUsage: [
      { date: "Feb 10", completion: 0.5, prompt: 0.3, input: 0.7, embedding: 0.2, total: 1.7 },
      { date: "Feb 11", completion: 0.2, prompt: 0.1, input: 0.3, embedding: 0.1, total: 0.7 },
      { date: "Feb 12", completion: 0.1, prompt: 0.1, input: 0.2, embedding: 0.1, total: 0.5 },
      { date: "Feb 21", completion: 0.1, prompt: 0.1, input: 0.1, embedding: 0.1, total: 0.4 },
      { date: "Mar 4", completion: 0.3, prompt: 0.2, input: 0.4, embedding: 0.1, total: 1.0 },
      { date: "Mar 15", completion: 1.2, prompt: 0.8, input: 1.5, embedding: 0.5, total: 4.0 },
      { date: "Mar 26", completion: 1.5, prompt: 1.0, input: 2.0, embedding: 0.5, total: 5.0 },
      { date: "Apr 5", completion: 2.0, prompt: 1.2, input: 2.5, embedding: 0.8, total: 6.5 },
      { date: "Apr 17", completion: 1.8, prompt: 1.0, input: 2.2, embedding: 0.5, total: 5.5 },
      { date: "Apr 28", completion: 2.2, prompt: 1.5, input: 3.0, embedding: 1.0, total: 7.7 },
      { date: "May 9", completion: 2.5, prompt: 1.8, input: 3.5, embedding: 1.2, total: 9.0 },
    ],
    models: [
      {
        id: "qwen3-0.6b",
        name: "Qwen: Qwen3 0.6B",
        description:
          "Qwen3-0.6B is a lightweight, 0.6 billion parameter language model in the Qwen3 series, offering support for both general-purpose dialogue and structured reasoning through a dual-mode architecture. It provides a good balance of performance and efficiency for applications with limited computational resources.",
        parameters: "0.6 billion",
        context: "32K",
        inputTokens: "$0/M",
        outputTokens: "$0/M",
      },
      {
        id: "qwen3-1.7b",
        name: "Qwen: Qwen3 1.7B",
        description:
          "Qwen3-1.7B is a compact, 1.7 billion parameter dense language model from the Qwen3 series, featuring dual-mode operation for both efficient dialogue (non-thinking) and advanced reasoning (thinking). It offers improved performance over the 0.6B variant while maintaining reasonable computational requirements.",
        parameters: "1.7 billion",
        context: "32K",
        inputTokens: "$0/M",
        outputTokens: "$0/M",
      },
      {
        id: "qwen3-4b",
        name: "Qwen: Qwen3 4B",
        description:
          "Qwen3-4B is a 4 billion parameter dense language model from the Qwen3 series, designed to support both general-purpose and reasoning-intensive tasks. It introduces a dual-mode architecture that allows for efficient dialogue processing and more complex reasoning capabilities when needed.",
        parameters: "4 billion",
        context: "128K",
        inputTokens: "$0/M",
        outputTokens: "$0/M",
      },
      {
        id: "qwen3-7b",
        name: "Qwen: Qwen3 7B",
        description:
          "Qwen3-7B is a 7 billion parameter language model from the Qwen3 series, offering enhanced capabilities for complex reasoning, code generation, and multilingual support. It provides a good balance between performance and computational efficiency for a wide range of applications.",
        parameters: "7 billion",
        context: "128K",
        inputTokens: "$0.15/M",
        outputTokens: "$0.15/M",
      },
      {
        id: "qwen3-14b",
        name: "Qwen: Qwen3 14B",
        description:
          "Qwen3-14B is a 14 billion parameter language model from the Qwen3 series, featuring advanced reasoning capabilities, improved factual accuracy, and strong performance across a wide range of tasks. It offers near-SOTA performance while being more computationally efficient than larger models.",
        parameters: "14 billion",
        context: "128K",
        inputTokens: "$0.2/M",
        outputTokens: "$0.2/M",
      },
    ],
  },
  anthropic: {
    id: "anthropic",
    name: "Anthropic",
    description: "Anthropic is an AI safety company building reliable, interpretable, and steerable AI systems.",
    modelCount: 6,
    termsOfServiceUrl: "https://anthropic.com/terms",
    tokenUsage: [
      { date: "Apr 1", completion: 1.5, prompt: 1.0, input: 2.0, embedding: 0.5, total: 5.0 },
      { date: "Apr 10", completion: 2.0, prompt: 1.2, input: 2.5, embedding: 0.8, total: 6.5 },
      { date: "Apr 20", completion: 2.5, prompt: 1.5, input: 3.0, embedding: 1.0, total: 8.0 },
      { date: "May 1", completion: 3.0, prompt: 1.8, input: 3.5, embedding: 1.2, total: 9.5 },
      { date: "May 10", completion: 3.5, prompt: 2.0, input: 4.0, embedding: 1.5, total: 11.0 },
    ],
    models: [
      {
        id: "claude-3-opus",
        name: "Claude 3 Opus",
        description:
          "Claude 3 Opus is Anthropic's most powerful model, designed for highly complex tasks requiring careful analysis and nuanced understanding.",
        parameters: "~200 billion",
        context: "200K",
        inputTokens: "$15/M",
        outputTokens: "$75/M",
      },
      {
        id: "claude-3-sonnet",
        name: "Claude 3 Sonnet",
        description:
          "Claude 3 Sonnet balances intelligence and speed, making it ideal for enterprise deployments requiring both high-quality outputs and good throughput.",
        parameters: "~100 billion",
        context: "200K",
        inputTokens: "$3/M",
        outputTokens: "$15/M",
      },
      {
        id: "claude-3-haiku",
        name: "Claude 3 Haiku",
        description:
          "Claude 3 Haiku is Anthropic's fastest and most compact model, optimized for high-throughput applications where speed and cost-efficiency are priorities.",
        parameters: "~20 billion",
        context: "200K",
        inputTokens: "$0.25/M",
        outputTokens: "$1.25/M",
      },
    ],
  },
}
