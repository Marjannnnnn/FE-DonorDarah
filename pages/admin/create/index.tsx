//import hook useState
import { useEffect, useState } from "react";

//import router
import Router from "next/router";

//import axios
import axios from "axios";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import NavLogout from "../../../components/NavLogout";
import Head from "next/head";

export default function DonaturCreate() {
  if (typeof window !== "undefined") {
    var token = localStorage.getItem("token");
  }

  useEffect(() => {
    //check token empty
    if (!token) {
      Router.push("/login");
    }
  }, []);

  //state
  const toast = useToast();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [nik, setNik] = useState("");
  const [darah, setDarah] = useState("");
  const [total, setTotal] = useState("");

  //state validation
  const [validation, setValidation] = useState<any>({});

  //method "storePost"
  const storeDonatur = async (e: any) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("name", name);
    formData.append("age", age);
    formData.append("address", address);
    formData.append("nik", nik);
    formData.append("darah", darah);
    formData.append("total", total);

    //send data to server
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/donatur`, formData)
      .then(() => {
        //redirect
        Router.push("/admin");
        toast({
          title: "Create Successful.",
          description: "Successfuly Create Donatur.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        //assign validation on state
        setValidation(error.response.data);
      });
  };

  return (
    <>
      <Head>
        <title>Admin Page - Create</title>
      </Head>
      <NavLogout />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={storeDonatur}>
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Nama</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan Name"
                />
                {validation.name && (
                  <Alert status="error">
                    <AlertIcon />
                    {validation.name}
                  </Alert>
                )}
              </FormControl>
              <FormControl id="age">
                <FormLabel>Umur</FormLabel>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Masukkan Umur"
                />
                {validation.age && (
                  <Alert status="error">
                    <AlertIcon />
                    {validation.age}
                  </Alert>
                )}
              </FormControl>
              <FormControl id="address">
                <FormLabel>Alamat Rumah</FormLabel>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Masukkan Alamat"
                />
                {validation.address && (
                  <Alert status="error">
                    <AlertIcon />
                    {validation.address}
                  </Alert>
                )}
              </FormControl>
              <FormControl id="nik">
                <FormLabel>NIK</FormLabel>
                <Input
                  type="text"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  placeholder="Masukkan NIK"
                />
                {validation.nik && (
                  <Alert status="error">
                    <AlertIcon />
                    {validation.nik}
                  </Alert>
                )}
              </FormControl>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Kirim
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </>
  );
}
