import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Order Together | Sign In</title>
        <meta name="description" content="Sign In to Order Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button isLoading>Sign In</Button>
    </div>
  );
};

export default Login;
