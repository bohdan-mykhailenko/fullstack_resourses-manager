import { Button } from "@chakra-ui/react";
import { Link, useLocation } from "@tanstack/react-router";

import { useAuthActions, useIsAuthenticated } from "@/store";

export const AuthButton = () => {
  const isAuthenticated = useIsAuthenticated();
  const { logoutUser } = useAuthActions();

  const location = useLocation();

  if (isAuthenticated) {
    return (
      <Button colorPalette="black" color="white" onClick={logoutUser}>
        Logout
      </Button>
    );
  }

  console.log("PATHNAME", { pathname: location.pathname });

  if (location.pathname === "/sign-up") {
    return (
      <Button colorPalette="blue" variant="subtle" color="white">
        <Link to="/sign-in">Sign In</Link>
      </Button>
    );
  }

  return (
    <Button colorPalette="blue" variant="subtle" color="white">
      <Link to="/sign-up">Sign Up</Link>
    </Button>
  );
};
