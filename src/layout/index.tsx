import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Order Together | Home</title>
        <meta name="description" content="Order Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
