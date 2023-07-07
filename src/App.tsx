import { useEffect, useRef } from "react"
import useAudio from "./hooks/useAudio.ts"
import useWhisper from "./hooks/useWhisper.ts"
import useChat from "./hooks/useChat.ts"
import useBark from "./hooks/useBark.ts"
import { Button, Center, Flex, Icon, Text } from "@chakra-ui/react"
import Message from "./components/Message.tsx"
import { BiMicrophoneOff } from "react-icons/bi"
import Header from "./components/Header.tsx"
import useFlow from "./hooks/useFlow.ts"
import { stateButtonIcon, stateButtonText } from "./constants/state.ts"

function App() {
  const state = useFlow(state => state.state)
  const setState = useFlow(state => state.setState)
  const hasStopped = useFlow(state => state.hasStopped)
  const setHasStopped = useFlow(state => state.setHasStopped)

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { audioBlob } = useAudio()
  const { transcript, setFileToTranscribe } = useWhisper()
  const { answer, chat, newMessage } = useChat()
  const { say } = useBark()

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (audioBlob) {
      setFileToTranscribe(new File([audioBlob], "audio.m4a", {
        type: audioBlob.type,
        lastModified: Date.now()
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob])

  useEffect(() => {
    if (transcript) {
      void (async (): Promise<void> => {
        await answer(transcript)
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript])

  useEffect(() => {
    void (async (): Promise<void> => {
      if (newMessage) {
        setState("waitingForAudio")
        const audio = await say(newMessage)
        setState("playing")
        if (audio) {
          audio.addEventListener("ended", () => {
            if (hasStopped) {
              setState("notStarted")
              setHasStopped(false)
              return
            }

            setState("recording")
          })
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage])

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [chat])

  return (
    <Flex
      pt={8}
      direction={"column"}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />

      <Center mb={4}>
        <Text fontSize={"2xl"}>
          {state === "notStarted" ? <br /> : stateButtonText[state]}
        </Text>
      </Center>

      <Flex justify={"center"} gap={2} flexWrap={"wrap"} mb={4}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        {
          state === "notStarted" ?
            <Button leftIcon={<Icon as={stateButtonIcon[state]} />}
              onClick={() => {
                setState("recording")
              }}
              loadingText={stateButtonText[state]}
            >
              {chat.length === 0 ? stateButtonText[state] : "Continue Conversation"}
            </Button> :
            /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
            <Button leftIcon={<Icon as={BiMicrophoneOff} />}
              onClick={() => {
                setHasStopped(true)
              }}
              isDisabled={hasStopped}
            >
              {!hasStopped ? "Stop Conversation" : "Conversation will stop after this message"}
            </Button>
        }
      </Flex>

      <Flex mx={"10%"} overflowY={"scroll"} flexDirection={"column"} style={{ flex: 1 }} ref={scrollRef}>
        {
          chat && chat.map(({ role, content }, index) => {
            return <Message role={role} content={content} key={index} isLast={index === chat.length - 1} />
          })
        }

        {state === "transcribing" && <Message isProcessing role="user" />}
        {state === "processing" && <Message isProcessing />}

      </Flex>
    </Flex>
  )
}

export default App
