import { Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      w="full"
      bg="blackAlpha.50"
      minHeight="20vh"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
    >
      <Text mb="3">
        Provided by{" "}
        <Link href="https://kvn.netlify.app/" isExternal color="blue.500">
          Kevin
        </Link>
      </Text>
      <Text opacity="0.5">Laravel + NextJs CRUD</Text>
    </Flex>
  );
};

export default Footer;
