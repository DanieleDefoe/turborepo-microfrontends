import type { IMessage } from "../types";

export const exampleTalks: IMessage[] = [
  {
    content: `Hello, I'm your smart assistant, how can I help you?`,
    role: "system",
  },
  {
    content: "Hi, who are you?",
    role: "user",
  },
  {
    content: `I can answer your questions, provide information, and help you solve your problems. You can ask me anything and I'll do my best to answer it.`,
    role: "system",
  },
];
