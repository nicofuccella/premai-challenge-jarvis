import OpenAI from "openai"
import { useState } from "react"
import useFlow from "./useFlow";

const configuration = {
  baseURL: import.meta.env.VITE_OPENAPI_CHAT_BASE_PATH as string,
  apiKey: import.meta.env.VITE_OPENAPI_CHAT_API_KEY as string,
  dangerouslyAllowBrowser: true
};
const openai = new OpenAI(configuration);

const useChat = () => {
  const setState = useFlow(state => state.setState)
  const [chat, setChat] = useState<OpenAI.Chat.Completions.ChatCompletionMessageParam[]>([])
  const [newMessage, setNewMessage] = useState<string>()

  const answer = async (question: string) => {
    setState("processing")
    const newChat = chat.concat({ role: 'user', content: question })
    
    const stream = await openai.chat.completions.create({
      model: "",
      messages: newChat,
      stream: true
    })
    for await (const part of stream) {
      const content = part.choices[0]?.delta.content || ''
      setNewMessage(content)
      setChat(newChat.concat({ role: 'assistant', content }))
    }
  }

  return {
    chat,
    answer,
    newMessage
  }
}

export default useChat