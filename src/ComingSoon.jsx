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
      py={{ base: 14, md: 20 }}
      px={{ base: 5, md: 8 }}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Box maxW="720px" w="100%" as="main" textAlign="left">
        {/* 1. Large heading */}
        <Heading
          as="h1"
          color={TEXT}
          fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
          fontWeight="bold"
          letterSpacing="-0.02em"
          lineHeight="1.05"
          mb={{ base: 3, md: 4 }}
        >
          Rebecca Gerber
        </Heading>

        {/* 2. Subheading */}
        <Text
          color={TEXT}
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="medium"
          opacity={0.9}
          mb={{ base: 10, md: 14 }}
        >
          Software engineer. Fashion thinker.
        </Text>

        {/* 3. Serif philosophy */}
        <Text
          color={TEXT}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={{ base: "xl", md: "2xl" }}
          fontStyle="italic"
          letterSpacing="0.01em"
          lineHeight="1.5"
          mb={{ base: 14, md: 20 }}
        >
          Style is cultivated. Attention refines it.
        </Text>

        {/* 4. Hero image */}
        <Box
          as="img"
          src="/hero.jpg"
          alt=""
          w="100%"
          maxH={{ base: "360px", md: "520px" }}
          objectFit="cover"
          display="block"
          my={{ base: 2, md: 0 }}
          mb={{ base: 16, md: 24 }}
        />

        {/* 5. Email signup card */}
        <Box
          border="1px solid"
          borderColor={BORDER}
          bg="#FCFBF8"
          p={{ base: 8, md: 12 }}
          mb={{ base: 20, md: 28 }}
        >
          <Text
            color={TEXT}
            fontSize="md"
            mb={6}
            opacity={0.9}
          >
            Building something new. Join early access.
          </Text>
          <form onSubmit={handleSubmit}>
            {!emailSubmitted ? (
              <VStack align="stretch" spacing={4} maxW="320px">
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
                  _hover={{ bg: "transparent", borderColor: TEXT, color: TEXT }}
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
        <Box>
          <Text
            color={TEXT}
            fontSize="xs"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="0.2em"
            mb={{ base: 6, md: 8 }}
          >
            Find Me
          </Text>
          <VStack align="stretch" spacing={{ base: 5, md: 6 }}>
              <Link
                href="https://www.tiktok.com/@rebeccaagerber"
                isExternal
                fontSize="md"
                color={TEXT}
                textDecoration="none"
                _hover={{ textDecoration: "underline" }}
              >
                TikTok
              </Link>

              <Link
                href="https://www.tiktok.com/@coderwhoclothess"
                isExternal
                fontSize="md"
                color={TEXT}
                textDecoration="none"
                _hover={{ textDecoration: "underline" }}
              >
                Style TikTok
              </Link>

              <Link
                href="https://instagram.com/coderwhoclothes"
                isExternal
                fontSize="md"
                color={TEXT}
                textDecoration="none"
                _hover={{ textDecoration: "underline" }}
              >
                Instagram
              </Link>

              <Link
                href="https://pin.it/5pzSdeDdZ"
                isExternal
                fontSize="md"
                color={TEXT}
                textDecoration="none"
                _hover={{ textDecoration: "underline" }}
              >
                Pinterest
              </Link>

              <Link
                href="https://depop.com/reb77"
                isExternal
                fontSize="md"
                color={TEXT}
                textDecoration="none"
                _hover={{ textDecoration: "underline" }}
              >
                Depop
              </Link>

              <Link
                href="https://shopmy.us/coderwhoclothes"
                isExternal
                fontSize="md"
                color={TEXT}
                textDecoration="none"
                _hover={{ textDecoration: "underline" }}
              >
                ShopMy
              </Link>

              <Link
                href="https://rvlv.me/yw6slx?navsrc=share_mylists"
                isExternal
                fontSize="md"
                color={TEXT}
                textDecoration="none"
                _hover={{ textDecoration: "underline" }}
              >
                Revolve
              </Link>
            </VStack>
          </Box>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        maxW="720px"
        w="100%"
        mt={{ base: 24, md: 32 }}
        pt={{ base: 8, md: 10 }}
        borderTop="1px solid"
        borderColor={BORDER}
        color={TEXT}
        fontSize="sm"
        textAlign="left"
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
