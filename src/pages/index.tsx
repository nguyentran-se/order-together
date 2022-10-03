import { Button } from "@chakra-ui/react";
import { Status } from "@types";
import type { NextPage } from "next";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthStatus, selectIsLoggedIn } from "selectors";
import { login } from "slices/auth/authSaga";
const Home: NextPage = () => {
  const status = useSelector(selectAuthStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const renderButton = () => {
    return (
      <Button
        colorScheme="blue"
        variant="solid"
        isLoading={status === Status.PENDING}
        onClick={() => dispatch(login({ username: "test", password: "test" }))}>
        {status === Status.RESOLVED ? "Log out" : "Sign in"}
      </Button>
    );
  };

  return (
    <div>
      <Head>
        <title>Order Together | Home</title>
        <meta name="description" content="Order Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Home
      <h4>
        status: {status} - Login: {isLoggedIn.toString()}
      </h4>
      <div>{renderButton()}</div>
      <footer></footer>
    </div>
  );
};

export default Home;
