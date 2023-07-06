import { Configuration, OpenAIApi } from "openai"
import { useEffect, useState } from "react"
import useFlow from "./useFlow";

class CustomFormData extends FormData {
  getHeaders() {
    return {}
  }
}

const configuration = new Configuration({
  basePath: import.meta.env.VITE_OPENAPI_WHISPER_BASE_PATH as string,
  apiKey: import.meta.env.VITE_OPENAPI_WHISPER_API_KEY as string,
  formDataCtor: CustomFormData // https://github.com/openai/openai-node/issues/75
});
const openai = new OpenAIApi(configuration);

type UseWhisperReturnType = {
  transcript: string
  setFileToTranscribe: (file: File) => void
}

const useWhisper = (): UseWhisperReturnType => {
  const setState = useFlow(state => state.setState)
  const [transcript, setTranscript] = useState<string>("")
  const [fileToTranscribe, setFileToTranscribe] = useState<File>()

  useEffect(() => {
    if (fileToTranscribe) {
      void (async (): Promise<void> => {
        setState("transcribing")
        const { data: { text } } = await openai.createTranscription(fileToTranscribe, "whisper-1")
        setTranscript(text)
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileToTranscribe])

  return {
    transcript,
    setFileToTranscribe
  }
}

export default useWhisper