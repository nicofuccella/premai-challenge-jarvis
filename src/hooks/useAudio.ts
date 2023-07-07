import { useEffect, useState } from "react"
import useFlow from "./useFlow";

const recordAudio = (): Promise<{ start: () => void; stop: () => Promise<{ audioBlob: Blob; audioUrl: string; play: () => void }> }> => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
  return new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    const audioChunks: Blob[] = []

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data)
    })

    const start = () => mediaRecorder.start()

    const stop = () =>
      new Promise<{ audioBlob: Blob; audioUrl: string; play: () => void }>(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm;codecs=opus" })
          const audioUrl = URL.createObjectURL(audioBlob)
          const audio = new Audio(audioUrl)
          const play = () => audio.play()
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          resolve({ audioBlob, audioUrl, play })
        })

        mediaRecorder.stop()
      })

    resolve({ start, stop })
  })
}


type UseAudioReturnType = {
  audioBlob?: Blob
}

const useAudio = (): UseAudioReturnType => {
  const state = useFlow(state => state.state)
  const [audioBlob, setAudioBlob] = useState<Blob>()

  useEffect(() => {
    if (state === "recording") {
      void (async () => {
        const recorder = await recordAudio();
        recorder.start();
        setTimeout(async() => {
          await recorder
            .stop()
            .then(({ audioBlob }) => {
              setAudioBlob(audioBlob)
            })
        }, 5000);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return {
    audioBlob
  }
}

export default useAudio