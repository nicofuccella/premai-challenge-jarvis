import OpenAI from "openai"
import { useEffect, useState } from "react"
import useFlow from "./useFlow";

class CustomFormData extends FormData {
  getHeaders() {
    return {}
  }
}

const configuration = {
  baseURL: import.meta.env.VITE_OPENAPI_WHISPER_BASE_PATH as string,
  apiKey: import.meta.env.VITE_OPENAPI_WHISPER_API_KEY as string,
  dangerouslyAllowBrowser: true,
  formDataCtor: CustomFormData // https://github.com/openai/openai-node/issues/75
};

const openai = new OpenAI(configuration);

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
        const { text } = await openai.audio.transcriptions.create({
          file: fileToTranscribe,
          model: 'whisper-1',
        })
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