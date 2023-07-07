import { FunctionComponent } from "react"
import { Avatar, Flex, Link, Text } from "@chakra-ui/react"

const Header: FunctionComponent = () => {
  return (
    <Flex mb={4} alignItems={"center"} justifyContent={"center"}>
      <Avatar
        src={"./assets/ai.webp"}
        mr={4}
      />
      <Text fontSize={"2xl"} align={"center"} wordBreak={"keep-all"} fontWeight={700}>
        <Text as="span" color={"cyan.500"}>Jarvis</Text> powered by <Link color='teal.500' href='https://premai.io' target="_blank">
          PremAI.io
        </Link>
      </Text>
    </Flex>
  )
}
export default Header