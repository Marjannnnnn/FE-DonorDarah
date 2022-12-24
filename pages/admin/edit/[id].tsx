//import hook useState
import { useState, useEffect } from "react";

//import router
import Router from "next/router";

//import axios
import axios from "axios";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import NavLogout from "../../../components/NavLogout";

export async function getServerSideProps({ params }: { params: any }) {
  //http request
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/donatur/${params.id}`
  );
  const res = await req.data.data;

  return {
    props: {
      donatur: res, // <-- assign response
    },
  };
}

export default function DonaturEdit(props: any) {
  if (typeof window !== "undefined") {
    var token = localStorage.getItem("token");
  }

  useEffect(() => {
    //check token empty
    if (!token) {
      Router.push("/login");
    }
  }, []);

  //destruct
  const { donatur } = props;

  //state
  const toast = useToast();
  const [name, setName] = useState(donatur.name);
  const [age, setAge] = useState(donatur.age);
  const [address, setAddress] = useState(donatur.address);
  const [nik, setNik] = useState(donatur.nik);
  const [darah, setDarah] = useState(donatur.darah);
  const [total, setTotal] = useState(donatur.total);

  //state validation
  const [validation, setValidation] = useState<any>({});

  //method "updatePost"
  const updateDonatur = async (e: any) => {
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
    formData.append("_method", "PUT");

    //send data to server
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/api/donatur/${donatur.id}`,
        formData
      )
      .then(() => {
        //redirect
        Router.push("/admin");
        toast({
          title: "Edit Successful.",
          description: "Successfuly Edit Donatur.",
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
        <title>Admin Page - Edit</title>
      </Head>
      <NavLogout />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={updateDonatur}>
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
              <FormControl id="darah">
                <FormLabel>Golongan darah</FormLabel>
                <Select
                  value={darah}
                  variant="outline"
                  placeholder="Pilih Golongan darah"
                  onChange={(e) => setDarah(e.target.value)}
                >
                  <option value="O">O</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                </Select>
                {validation.darah && (
                  <Alert status="error">
                    <AlertIcon />
                    {validation.darah}
                  </Alert>
                )}
              </FormControl>
              <FormControl id="total">
                <FormLabel>Total Kantung Darah</FormLabel>
                <Input
                  type="text"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="Masukan Total Kantung Darah"
                />
                {validation.total && (
                  <Alert status="error">
                    <AlertIcon />
                    {validation.total}
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
