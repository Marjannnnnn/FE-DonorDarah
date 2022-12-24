import {
  Box,
  Button,
  Flex,
  Img,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");
  return (
    <Flex
      alignItems="center"
      w="full"
      px={isLargerThanLG ? "16" : "6"}
      py="16"
      minHeight="90vh"
      justifyContent="space-between"
      flexDirection={isLargerThanLG ? "row" : "column"}
    >
      <Box mr={isLargerThanLG ? "6" : "0"} w={isLargerThanLG ? "60%" : "full"}>
        <Text
          fontSize={isLargerThanLG ? "5xl" : "4xl"}
          fontWeight="bold"
          mb="4"
        >
          Donor Darah
        </Text>

        <Text mb="6" fontSize={isLargerThanLG ? "lg" : "base"} opacity={0.7}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
          dicta voluptatum minus corrupti nisi, rem odit quasi velit obcaecati
          labore, eveniet natus, quibusdam quam ea. Voluptatibus corrupti error
          consequuntur corporis!
        </Text>
        <Link href="/admin">
          <Button
            w="200px"
            colorScheme="blue"
            variant="solid"
            h="50px"
            size={isLargerThanLG ? "lg" : "md"}
            mb={isLargerThanLG ? "0" : "10"}
          >
            Read More
          </Button>
        </Link>
      </Box>
      <Spacer />
      <Flex
        w={isLargerThanLG ? "40%" : "full"}
        alignItems="center"
        justifyContent="center"
      >
        <Img src="assets/chakraHero.jpg" alt="Chakra UI" />
      </Flex>
    </Flex>
  );
};

export default Hero;
