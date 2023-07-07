import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

export type State = "notStarted" | "recording" | "transcribing" | "processing" | "waitingForAudio" | "playing"

type FlowState = {
  state: State
  setState: (newState: State) => void
  hasStopped: boolean
  setHasStopped: (hasStopped: boolean) => void
}

const useFlow = create<FlowState>()(
  immer(
    (set) => ({
      state: "notStarted",
      setState: (newState): void => {
        set((state) => {
          state.state = newState
        })
      },
      hasStopped: false,
      setHasStopped: (hasStopped): void => {
        set((state) => {
          state.hasStopped = hasStopped
        })
      }
    })
  )
)

export default useFlow