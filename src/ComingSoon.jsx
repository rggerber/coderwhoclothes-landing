import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  Link,
  useToast,
} from "@chakra-ui/react";

const BG = "#F4EFE8";
const TEXT = "#2C201C";
const BORDER = "#EAE4DA";

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
      bg={BG}
      minH="100vh"
      py={{ base: 12, md: 16 }}
      px={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box maxW="720px" w="100%" as="main">
        <VStack align="center" spacing={{ base: 8, md: 12 }}>
          {/* 1. Large heading */}
          <Heading
            as="h1"
            color={TEXT}
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="bold"
            lineHeight="1.1"
          >
            Rebecca Gerber
          </Heading>

          {/* 2. Subheading */}
          <Text color={TEXT} fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
            Software engineer. Fashion thinker.
          </Text>

          {/* 3. Serif philosophy */}
          <Text
            color={TEXT}
            fontFamily="Georgia, serif"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight="1.4"
          >
            Style is cultivated. Attention refines it.
          </Text>

          {/* 4. Hero image */}
          <Box
            as="img"
            src="/hero.jpg"
            alt=""
            w="100%"
            h={{ base: "420px", md: "520px" }}
            objectFit="cover"
            display="block"
          />

          {/* 5. Email signup card */}
          <Box
            border="1px solid"
            borderColor={BORDER}
            bg="white"
            p={{ base: 8, md: 10 }}
          >
            <Text
              color={TEXT}
              fontSize="lg"
              mb={6}
            >
              Building something new. Join early access.
            </Text>
            <form onSubmit={handleSubmit}>
              {!emailSubmitted ? (
                <VStack align="stretch" spacing={5}>
                  <Input
                    placeholder="Enter your email"
                    size="md"
                    borderColor={BORDER}
                    _focus={{ borderColor: TEXT, boxShadow: "none" }}
                    color={TEXT}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    borderColor={TEXT}
                    color={TEXT}
                    _hover={{ bg: "white", borderColor: TEXT, color: TEXT }}
                    size="md"
                  >
                    Join Early Access
                  </Button>
                </VStack>
              ) : (
                <Text color={TEXT} fontWeight="medium">
                  You're in.
                </Text>
              )}
            </form>
          </Box>

          {/* 6. Find Me section */}
          <Box pt={{ base: 8, md: 12 }}>
            <Text
              color={TEXT}
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              mb={6}
            >
              Find Me
            </Text>
            <VStack align="stretch" spacing={5}>
              <Link
                href="https://shopmy.us/coderwhoclothes"
                color={TEXT}
                textDecoration="underline"
                _hover={{ color: TEXT, textDecoration: "underline" }}
                fontSize="lg"
                opacity={0.7}
              >
                Shop My Closet
              </Link>
              <Link
                href="https://pin.it/5pzSdeDdZ"
                color={TEXT}
                textDecoration="underline"
                _hover={{ color: TEXT, textDecoration: "underline" }}
                fontSize="lg"
              >
                Get Inspo
              </Link>
              <Link
                href="https://instagram.com/coderwhoclothes"
                color={TEXT}
                textDecoration="underline"
                _hover={{ color: TEXT, textDecoration: "underline" }}
                fontSize="lg"
              >
                Instagram
              </Link>
              <Link
                href="https://www.tiktok.com/@rebeccaagerber?_t=ZP-8tdp0clroQ3&_r=1"
                color={TEXT}
                textDecoration="underline"
                _hover={{ color: TEXT, textDecoration: "underline" }}
                fontSize="lg"
              >
                TikTok
              </Link>
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        maxW="720px"
        w="100%"
        mt={{ base: 16, md: 20 }}
        pt={8}
        borderTop="1px solid"
        borderColor={BORDER}
        color={TEXT}
        fontSize="sm"
      >
        <Text>
          Contact:{" "}
          <Link
            href="mailto:hello@coderwhoclothes.com"
            textDecoration="underline"
            _hover={{ color: TEXT }}
          >
            hello@coderwhoclothes.com
          </Link>
          {" · "}
          <Link
            href="https://www.coderwhoclothes.com/privacy_policy.html"
            textDecoration="underline"
            _hover={{ color: TEXT }}
          >
            Privacy Policy
          </Link>
        </Text>
        <Text mt={3}>
          © {new Date().getFullYear()} CoderWhoClothes. All Rights Reserved.
        </Text>
      </Box>
    </Box>
  );
}
