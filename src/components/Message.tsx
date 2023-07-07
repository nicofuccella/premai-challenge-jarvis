import { FunctionComponent } from "react"
import { ChatCompletionRequestMessageRoleEnum } from "openai"
import { Avatar, Card, Center, Flex, Text, SkeletonText, SkeletonCircle, CardProps, Spinner } from "@chakra-ui/react"
import useTypewriter from "../hooks/useTypewriter"
import useFlow from "../hooks/useFlow"

interface Props extends CardProps {
  role?: ChatCompletionRequestMessageRoleEnum,
  content?: string
  isProcessing?: boolean
  isLast?: boolean
}

const Message: FunctionComponent<Props> = ({
  role,
  content,
  isProcessing,
  isLast,
  ...props
}) => {
  const isUser = role === "user"
  const { result: text, isAnimationFinished } = useTypewriter(content ?? "", (!!isLast && role === "assistant"))
  const state = useFlow(state => state.state)

  return (
    <Card p={4} mb={4} {...props}>
      {
        !isProcessing ?
          <Flex gap={2} flexDirection={isUser ? "row-reverse" : "row"} align={"center"}>
            <Avatar
              src={isUser ? undefined : "./assets/ai.webp"}
              mr={isUser ? 0 : 4}
              ml={isUser ? 4 : 0}
            />
            <Flex align={"center"} justify={isUser ? "flex-end" : "flex-start"} style={{
              flex: 1
            }}>
              <Text align={isUser ? "right" : "left"}>
                {text}
              </Text>
            </Flex>
            {(!!isLast && isAnimationFinished && state === "waitingForAudio") && <Spinner ml={4} />}
          </Flex> :
          <Flex gap={2} flexDirection={isUser ? "row-reverse" : "row"}>
            <SkeletonCircle
              size="12"
              mr={4}
            />
            <Center width={"100%"} style={{
              flex: 1
            }} >
              <SkeletonText noOfLines={2} spacing={2} skeletonHeight={4} width={"100%"} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isUser ? "flex-end" : "flex-start",
              }} />
            </Center>
          </Flex>
      }
    </Card>
  )
}
export default Message