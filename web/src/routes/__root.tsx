import { Box, VStack } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { Header } from "@/components/navigation";

export const Route = createRootRoute({
  component: RootComponent,
});

const routes = [
  {
    path: "/",
    component: RootComponent,
    label: "Home",
  },
];

const APP_NAME = "Tanks";

function RootComponent() {
  return (
    <VStack minHeight="100vh" width="100vw" bg="black" py={6}>
      <Header
        routes={routes}
        appName={APP_NAME}
        borderBottom="1px solid"
        borderColor="gray.800"
        py={4}
        px={10}
      />
      <Box px={10} py={4}>
        <Outlet />
      </Box>

      <TanStackRouterDevtools position="bottom-right" />
    </VStack>
  );
}
