import {
  VStack,
  Button,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Heading,
  Flex,
  Text,
  Stack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Router from "next/router";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import NavLogout from "../../components/NavLogout";
import {
  ArrowForwardIcon,
  DeleteIcon,
  EditIcon,
  MinusIcon,
} from "@chakra-ui/icons";

//fetch with "getServerSideProps"
export async function getServerSideProps() {
  //http request
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/donatur`
  );
  const res = await req.data.data.data;

  return {
    props: {
      donaturs: res, // <-- assign response
    },
  };
}

export default function AdminIndex(props: any) {
  if (typeof window !== "undefined") {
    var token = localStorage.getItem("token");
  }

  useEffect(() => {
    //check token empty
    if (!token) {
      Router.push("/login");
    }
  }, []);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //state user
  const [user, setUser] = useState<any>({});
  const cancelRef = useRef<any>();
  //token

  // const userFetchData = async () => {
  //   //set axios header dengan type Authorization + Bearer token
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   //fetch user from Rest API
  //   await axios
  //     .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/user`)
  //     .then((response) => {
  //       //set response user to state
  //       setUser(response.data);
  //     });
  // };

  //destruct
  const { donaturs }: { donaturs: any } = props;

  //router
  const router = useRouter();

  //refresh data
  const refreshData = () => {
    router.replace(router.asPath);
  };

  //function "deletePost"
  const deletePost = async (id: number) => {
    //sending
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/api/donatur/${id}`
    );

    onClose();

    toast({
      title: "Delete Successfully.",
      description: "Successfully Deleted Donatur.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });

    //refresh data
    refreshData();
  };

  // if (Router.isFallback) {
  //   return <Spinner color="red.500" />;
  // }

  return (
    <>
      <Head>
        <title>Admin Page</title>
      </Head>
      <NavLogout />
      <VStack>
        <Heading py={5}>Golongan Darah</Heading>
        <Flex gap={5}>
          <Stack textAlign="center">
            <Text fontSize="lg" color="blue.200" fontWeight="bold">
              A
            </Text>
            <Text>
              {
                donaturs.filter(({ darah }: { darah: any }) => darah === "A")
                  .length
              }
            </Text>
          </Stack>
          <Stack textAlign="center">
            <Text fontSize="lg" color="blue.200" fontWeight="bold">
              B
            </Text>
            <Text>
              {
                donaturs.filter(({ darah }: { darah: any }) => darah === "B")
                  .length
              }
            </Text>
          </Stack>
          <Stack textAlign="center">
            <Text fontSize="lg" color="blue.200" fontWeight="bold">
              O
            </Text>
            <Text>
              {
                donaturs.filter(({ darah }: { darah: any }) => darah === "O")
                  .length
              }
            </Text>
          </Stack>
          <Stack textAlign="center">
            <Text fontSize="lg" color="blue.200" fontWeight="bold">
              AB
            </Text>
            <Text>
              {
                donaturs.filter(({ darah }: { darah: any }) => darah === "AB")
                  .length
              }
            </Text>
          </Stack>
        </Flex>
        <TableContainer py={8}>
          <Link href="/admin/create">
            <Button
              m={5}
              colorScheme="blue"
              variant="outline"
              rightIcon={<ArrowForwardIcon />}
            >
              Tambah
            </Button>
          </Link>
          <Table variant="simple">
            <TableCaption>
              Disimpan di bank darah sebagai stok darah untuk kemudian digunakan
              untuk transfusi darah.
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Nama</Th>
                <Th>Umur</Th>
                <Th>Alamat</Th>
                <Th>NIK</Th>
                <Th>Golongan Darah</Th>
                <Th>Total</Th>
                <Th textAlign="center">Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {donaturs.length > 0 ? (
                donaturs.map((donatur: any) => (
                  <Tr key={donatur.id}>
                    <Td>{donatur.name}</Td>
                    <Td>{donatur.age}</Td>
                    <Td>{donatur.address}</Td>
                    <Td>{donatur.nik}</Td>
                    <Td textAlign="center" color="blue.200" fontWeight="bold">
                      {donatur.darah ? donatur.darah : "Empty"}
                    </Td>
                    <Td>
                      {donatur.total ? (
                        <>
                          {donatur.total * 350} <span>ml</span>
                        </>
                      ) : (
                        "Empty"
                      )}
                    </Td>
                    <Td>
                      <Link href={`/admin/edit/${donatur.id}`}>
                        <Button variant="ghost" colorScheme="blue">
                          <EditIcon />
                        </Button>
                      </Link>
                      <Button
                        onClick={onOpen}
                        variant="ghost"
                        colorScheme="red"
                      >
                        <DeleteIcon />
                      </Button>

                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete Donatur
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button
                                ref={cancelRef}
                                onClick={onClose}
                                variant="outline"
                              >
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => deletePost(donatur.id)}
                                ml={3}
                                variant="outline"
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td textAlign="center">Empty</Td>
                  <Td textAlign="center">Empty</Td>
                  <Td textAlign="center">Empty</Td>
                  <Td textAlign="center">Empty</Td>
                  <Td textAlign="center">Empty</Td>
                  <Td textAlign="center">Empty</Td>
                  <Td textAlign="center">Empty</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  );
}
