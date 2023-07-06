import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai"
import { useState } from "react"
import useFlow from "./useFlow";

const configuration = new Configuration({
  basePath: import.meta.env.VITE_OPENAPI_CHAT_BASE_PATH as string,
  apiKey: import.meta.env.VITE_OPENAPI_CHAT_API_KEY as string
});
const openai = new OpenAIApi(configuration);

const useChat = () => {
  const setState = useFlow(state => state.setState)
  const [chat, setChat] = useState<ChatCompletionRequestMessage[]>([])
  const [newMessage, setNewMessage] = useState<string>()

  const answer = async (question: string) => {
    setState("processing")
    const newChat = chat.concat({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: question
    })

    setChat(newChat)
    const { data: { choices } } = await openai.createChatCompletion({
      model: "",
      messages: newChat
    })

    setChat(newChat.concat({
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: choices[0].message?.content
    }))

    setNewMessage(choices[0].message?.content)
  }

  return {
    chat,
    answer,
    newMessage
  }
}

export default useChat