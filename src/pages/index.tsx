import { Button } from "@chakra-ui/react";
import { Status } from "@types";
import { createAuthRequest } from "config";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthStatus, selectIsLoggedIn } from "selectors";
import { login, loginWithSlack } from "slices/auth/authSaga";
import styles from '../assets/styles/home.module.scss';

const Home: NextPage = () => {
  // const status = useSelector(selectAuthStatus);
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const dispatch = useDispatch();

  // const renderButton = () => {
  //   return (
  //     <Button
  //       colorScheme="blue"
  //       variant="solid"
  //       isLoading={status === Status.PENDING}
  //       onClick={() => dispatch(login({ username: "test", password: "test" }))}>
  //       {status === Status.RESOLVED ? "Log out" : "Sign in"}
  //     </Button>
  //   );
  // };

  return (
    <div className={styles.background}>
    </div>
  );
};

export default Home;
