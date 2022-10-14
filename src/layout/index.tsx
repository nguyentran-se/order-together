import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  return (
    <>
      <Flex>
        <Header />
        <main style={{'width': '100%'}}>{children}</main>
        {/* <Footer /> */}
      </Flex>
    </>
  );
}

export default Layout;
