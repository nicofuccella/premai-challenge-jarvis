import { FunctionComponent } from "react"
import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

const Header: FunctionComponent = () => {
  return (
    <Box>
      <Flex mb={4} alignItems={"center"} justifyContent={"center"}>
        <Avatar
          size={"2xl"}
          src={"./assets/tiero.jpeg"}
        />
      </Flex>
      <Flex mb={4} alignItems={"center"} justifyContent={"center"}>
        <Text fontSize={"2xl"} align={"center"} wordBreak={"keep-all"} fontWeight={700}>
          Tiero.AI
        </Text>
      </Flex>
    </Box>
  )
}
export default Header