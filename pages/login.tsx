import Router from "next/router";
import Head from "next/head";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  VStack,
  Heading,
  Flex,
  Link as Linker,
  Checkbox,
  Image,
  InputRightElement,
  InputGroup,
  Icon,
  IconButton,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Nav from "../components/Nav";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function login() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      //redirect page dashboard
      Router.push("/admin");
    }
  }, []);

  //define state
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClickPass = () => setShow(!show);

  //define state validation
  const [validation, setValidation] = useState<any>([]);

  //function "loginHanlder"
  const loginHandler = async (e: any) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append("username", username);
    formData.append("password", password);

    //send data to server
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, formData)
      .then((response) => {
        //set token on localStorage
        localStorage.setItem("token", response.data.token);
        //redirect to dashboard
        Router.push("/admin");
        toast({
          title: "Login Successful.",
          description: "Welcome To Admin Page !",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack w={"full"} maxW={"md"}>
            <form onSubmit={loginHandler}>
              <Stack spacing={4}>
                <Heading fontSize={"2xl"}>Sign in to your account</Heading>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan Username"
                  />
                  {validation.username && (
                    <Alert status="error">
                      <AlertIcon />
                      {validation.username}
                    </Alert>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup id="password">
                    <Input
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan Password"
                    />
                    <InputRightElement>
                      <Button variant="link" onClick={handleClickPass}>
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {validation.password && (
                    <Alert status="error">
                      <AlertIcon />
                      {validation.password}
                    </Alert>
                  )}
                </FormControl>
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                  >
                    <Text>Belum punya akun?</Text>
                    <Text
                      color={"blue.400"}
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      <Link href="/register">register</Link>
                    </Text>
                  </Stack>
                  <Button type="submit" colorScheme={"blue"} variant={"solid"}>
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            objectPosition={"left"}
            src={
              "https://asset-a.grid.id/crop/0x0:0x0/x/photo/2021/09/18/donor-darah-kecantikanjpg-20210918102602.jpg"
            }
          />
        </Flex>
      </Stack>
    </>
  );
}
