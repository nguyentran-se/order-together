import { Button } from "@chakra-ui/react";
import { Status } from "@types";
import { createAuthRequest } from "services/slack";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthStatus, selectIsLoggedIn } from "selectors";
import { login } from "slices/auth/authSaga";

const Home: NextPage = () => {
  const status = useSelector(selectAuthStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  function handleLogin() {
    dispatch(login({ username: "test", password: "test" }));
  }
  const renderButton = () => {
    return (
      <Button
        colorScheme="blue"
        variant="solid"
        isLoading={status === Status.PENDING}
        onClick={handleLogin}>
        {status === Status.RESOLVED ? "Log out" : "Sign in"}
      </Button>
    );
  };

  return <div>Home</div>;
};

export default Home;
