import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Link,
  useToast,
} from "@chakra-ui/react";
import { FaInstagram, FaTiktok, FaPinterest, FaShoppingBag } from "react-icons/fa";

export default function ComingSoon() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    try {
      // const response = await fetch("http://localhost:5001/subscribe", {
        const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSubmitted(true);
        toast({
          title: "Subscription Successful!",
          description: "You've been added to the list.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Subscription Failed",
        description: "Failed to subscribe. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg="pink.100"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      {/* Main Content */}
      <Box
        bg="transparent"
        p={{ base: 6, md: 8 }}
        borderRadius="2xl"
        shadow="lg"
        textAlign="center"
        maxWidth={{ base: "90%", md: "500px" }}
        width="100%"
      >
        <Heading
        color="pink.800"
        fontSize={{ base: "3xl", md: "4xl" }}
        mb={4}
        fontWeight="extrabold"
        textAlign="center"
        whiteSpace="normal"
        >
          CoderWhoClothes Coming Soon
        </Heading>
        <Text color="pink.700" fontSize="lg" mb={6}>
          Sign up to be the first to know when we're live.
        </Text>
        <form onSubmit={handleSubmit}>
          {!emailSubmitted ? (
            <VStack spacing={4}>
              <Input
                placeholder="Enter your email"
                size="lg"
                borderColor="pink.400"
                focusBorderColor="pink.500"
                bg="white"
              />
              <Button
                type="submit"
                bg="pink.600"
                color="white"
                _hover={{ bg: "pink.700" }}
                size="lg"
              >
                Notify Me
              </Button>
            </VStack>
          ) : (
            <Text color="pink.600" fontWeight="medium">
              You're in. I can't wait to share my new project with you!
            </Text>
          )}
        </form>
        <Heading color="pink.700" fontSize="2xl" mt={8} fontWeight="bold">
          Love, Rebecca Grace
        </Heading>
      </Box>

      {/* Links Section */}
      <Box mt={10} textAlign="center">
        <Heading color="pink.700" fontSize="xl" mb={4}>
          For Now...
        </Heading>
        <HStack spacing={4} justify="center" wrap="wrap" py={2}>
          <Link
            href="https://shopmy.us/rebeccagrace"
            bg="pink.500"
            color="white"
            py={2}
            px={4}
            borderRadius="full"
            _hover={{ bg: "pink.600" }}
            textAlign="center"
          >
            <HStack>
              <FaShoppingBag />
              <Text>Shop My Closet</Text>
            </HStack>
          </Link>
          <Link
            href="https://pin.it/5pzSdeDdZ"
            bg="pink.500"
            color="white"
            py={2}
            px={4}
            borderRadius="full"
            _hover={{ bg: "pink.600" }}
            textAlign="center"
          >
            <HStack>
              <FaPinterest />
              <Text>Get Inspo</Text>
            </HStack>
          </Link>
          <Link
            href="https://instagram.com/loverebeccagrace"
            bg="pink.500"
            color="white"
            py={2}
            px={4}
            borderRadius="full"
            _hover={{ bg: "pink.600" }}
            textAlign="center"
          >
            <HStack>
              <FaInstagram />
              <Text>Instagram</Text>
            </HStack>
          </Link>
          <Link
            href="https://www.tiktok.com/@rebeccaagerber?_t=ZP-8tdp0clroQ3&_r=1"
            bg="pink.500"
            color="white"
            py={2}
            px={4}
            borderRadius="full"
            _hover={{ bg: "pink.600" }}
            textAlign="center"
          >
            <HStack>
              <FaTiktok />
              <Text>TikTok</Text>
            </HStack>
          </Link>
        </HStack>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        mt={6}
        textAlign="center"
        borderTop="1px solid"
        borderColor="pink.300"
        pt={4}
        px={2}
        color="pink.600"
        fontSize="sm"
      >
        <Text>
          Contact: <Link href="mailto:hello@coderwhoclothes.com" textDecoration="underline" _hover={{ color: "pink.500" }}>hello@coderwhoclothes.com</Link>
        </Text>
        <Text mt={2}>© 2025 CoderWhoClothes. All Rights Reserved.</Text>
      </Box>
    </Box>
  );
}
