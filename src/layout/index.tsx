import { Flex } from '@chakra-ui/react';
import Header from './Header';
import HeaderBar from './HeaderBar';
type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  return (
    <>
      <Flex>
        <Header />
        <Flex flexDirection="column" w="full">
          <Flex>
            <HeaderBar />
          </Flex>
          <Flex>
            <main
              style={{
                width: '100%',
                padding: '20px',
                // background: '#EDF2F7'
              }}
            >
              {children}
            </main>
          </Flex>
        </Flex>
        {/* <Footer /> */}
      </Flex>
    </>
  );
}

export default Layout;
