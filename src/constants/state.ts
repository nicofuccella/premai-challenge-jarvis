/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { State } from "../hooks/useFlow"
import { IconType } from "react-icons"
import { BiMicrophone, BiBot, BiPencil, BiVolumeFull } from "react-icons/bi"

export const stateButtonText: {
  [key in State]: string
} = {
  notStarted: "Start conversation",
  recording: "Listening...",
  processing: "Processing...",
  waitingForAudio: "Audio generation in progress...",
  transcribing: "Transcribing...",
  playing: "Playing..."
}

export const stateButtonIcon: {
  [key in State]: IconType
} = {
  notStarted: BiMicrophone,
  recording: BiMicrophone,
  processing: BiBot,
  waitingForAudio: BiBot,
  transcribing: BiPencil,
  playing: BiVolumeFull
}