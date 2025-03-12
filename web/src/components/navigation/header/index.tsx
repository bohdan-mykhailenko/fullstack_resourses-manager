import {
  Box,
  BoxProps,
  Button,
  Flex,
  For,
  HStack,
  Heading,
  IconButton,
  List,
  Separator,
  VStack,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { AuthButton } from "@/components/features";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
  Icon,
} from "@/components/ui";

interface HeaderProps extends BoxProps {
  routes: {
    path: string;
    label: string;
  }[];
  appName: string;
}

export const Header = ({ routes, appName, ...props }: HeaderProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box as="header" width="100%" {...props}>
      <Flex align="center" justify="space-between">
        <Heading
          as="h1"
          size={{
            base: "lg",
            md: "2xl",
          }}
          fontWeight="bold"
          letterSpacing="wide"
          textShadow="2px 2px 0 #333, -2px -2px 0 #333, 2px -2px 0 #333, -2px 2px 0 #333"
        >
          <Link to="/">{appName}</Link>
        </Heading>

        <HStack hideBelow="md" as="nav" justify="space-between">
          <List.Root display="flex" flexDirection="row" listStyle="none">
            <For each={routes}>
              {({ path, label }) => (
                <List.Item
                  h={10}
                  key={path}
                  fontWeight="semibold"
                  css={{
                    a: {
                      textDecoration: "none",
                    },
                  }}
                >
                  <Button
                    border="none"
                    colorPalette="orange"
                    variant="ghost"
                    color="white"
                  >
                    <Link to={path}>{label}</Link>
                  </Button>
                </List.Item>
              )}
            </For>
          </List.Root>

          <AuthButton />
        </HStack>

        <Box hideFrom="md" as="nav">
          <DrawerRoot
            open={open}
            placement="top"
            onOpenChange={({ open }) => setOpen(open)}
          >
            <DrawerBackdrop />

            <DrawerTrigger asChild>
              <IconButton
                aria-label="Open menu"
                variant="ghost"
                colorPalette="black"
              >
                <Icon name="Menu" />
              </IconButton>
            </DrawerTrigger>

            <DrawerContent bg="gray.900" h="100%">
              <DrawerCloseTrigger />

              <DrawerBody pt={12}>
                <VStack spaceY={10} align="center" w="full">
                  <VStack spaceY={2} align="stretch">
                    <For each={routes}>
                      {({ path, label }) => (
                        <DrawerActionTrigger asChild key={path}>
                          <Button
                            border="none"
                            w="full"
                            colorPalette="orange"
                            variant="ghost"
                            color="white"
                          >
                            <Link to={path}>{label}</Link>
                          </Button>
                        </DrawerActionTrigger>
                      )}
                    </For>
                  </VStack>

                  <Separator w="full" />

                  <AuthButton />
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerRoot>
        </Box>
      </Flex>
    </Box>
  );
};
