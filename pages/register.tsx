import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link as Linker,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  VStack,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import Router from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Nav from "../components/Nav";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function register() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      //redirect page dashboard
      Router.push("/admin");
    }
  }, []);

  //define state
  const toast = useToast();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [show, setShow] = useState(false);
  const handleClickPass = () => setShow(!show);

  //define state validation
  const [validation, setValidation] = useState<any>([]);

  //function "registerHanlder"
  const registerHandler = async (e: any) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("password_confirm", passwordConfirm);

    //send data to server
    await axios
      .post("http://localhost:8000/api/register", formData)
      .then(() => {
        //redirect to logi page
        Router.push("/login");
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
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
      <VStack
        p={4}
        minH="100vh"
        pt={10}
        pb={5}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool{" "}
              <Linker color={"blue.400"}>features</Linker> ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={registerHandler}>
              <Stack spacing={4}>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan Nama Lengkap"
                  />
                  {validation.name && (
                    <Alert status="error">
                      <AlertIcon />
                      {validation.name}
                    </Alert>
                  )}
                </FormControl>
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
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
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
                <FormControl id="password_confirm">
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      placeholder="Masukkan Konfirmasi Password"
                    />
                    <InputRightElement>
                      <Button variant="link" onClick={handleClickPass}>
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {validation.password_confirm && (
                    <Alert status="error">
                      <AlertIcon />
                      {validation.password_confirm}
                    </Alert>
                  )}
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                  >
                    <Text>Sudah punya akun?</Text>
                    <Text
                      color={"blue.400"}
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      <Link href="/login">login</Link>
                    </Text>
                  </Stack>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </VStack>
    </>
  );
}