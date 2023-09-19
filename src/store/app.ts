// Utilities
interface Message {
  id: number;
  title: string;
  message: string;
}
interface GptMessage {
  created: Date;
  choices: [
    {
      index: number,
      message: {
        role: string,
        context: string
      }
    }
  ]
}
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    messages: Message[]
  }),
})
