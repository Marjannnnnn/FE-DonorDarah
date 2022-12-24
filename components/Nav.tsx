import { useState } from "react";
import {
  Text,
  Flex,
  Spacer,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  Button,
  Stack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";

const Nav = () => {
  const [scroll, setScroll] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const navBg = useColorModeValue("white", "blackAlpha.200");

  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeScroll);
  }

  return (
    <Flex
      h="10vh"
      alignItems="center"
      p="6"
      boxShadow={scroll ? "base" : "none"}
      position="sticky"
      top="0"
      zIndex="banner"
      w="full"
      bg={navBg}
    >
      <Text fontSize="xl" fontWeight="bold">
        <Link href="/">Donor Darah</Link>
      </Text>

      <Spacer />

      <Button w={6} h={6} p={5} onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default Nav;
