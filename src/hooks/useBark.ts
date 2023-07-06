import axios from "axios"
import { AudioGenerationResponse } from "../types/Bark"

type UseBarkReturnType = {
  say: (prompt: string) => Promise<HTMLAudioElement | void>
}

const useBark = (): UseBarkReturnType => {
  const say = async (prompt: string): Promise<HTMLAudioElement | void> => {
    const { data: { url } } = await axios.post<AudioGenerationResponse>(`${import.meta.env.VITE_BARK_BASE_PATH as string}/audio/generation`, {
      prompt
    })
    const audio = new Audio(`${import.meta.env.VITE_BARK_FILES_BASE_PATH as string}/files/${url}`)
    await audio.play();
    return audio
  }

  return {
    say
  }
}

export default useBark