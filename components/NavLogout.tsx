import { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Spacer,
  useColorMode,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";

const NavLogout = () => {
  const [scroll, setScroll] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const navBg = useColorModeValue("white", "blackAlpha.200");
  // const [user, setUser] = useState({});
  let token: any;

  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeScroll);
    //token
    token = localStorage.getItem("token");
  }

  //function "fetchData"
  // const fetchData = async () => {
  //   //set axios header dengan type Authorization + Bearer token
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   //fetch user from Rest API
  //   await axios.get("http://localhost:8000/api/user").then((response) => {
  //     //set response user to state
  //     setUser(response.data);
  //   });
  // };

  useEffect(() => {
    // fetchData();
  }, []);

  //function logout
  const logoutHandler = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch Rest API
    await axios.post("http://localhost:8000/api/logout").then(() => {
      //remove token from localStorage
      localStorage.removeItem("token");

      //redirect halaman login
      Router.push("/login");
    });
  };

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
      <Flex alignItems="center" gap={8}>
        <Text fontSize="xl" fontWeight="bold">
          <Link href="/">Donor Darah</Link>
        </Text>
        <Button onClick={logoutHandler} colorScheme="red" variant="link">
          Logout
        </Button>
      </Flex>

      <Spacer />

      <Button w={6} h={6} p={5} onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default NavLogout;
