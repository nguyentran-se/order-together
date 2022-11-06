import { Flex } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import Header from './Header';
import HeaderBar from './HeaderBar';
import styles from './index.module.scss';
type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setIsSidebarExpandedCallback = useCallback(setIsSidebarExpanded, []);

  return (
    <>
      <Flex>
        <Header
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpandedCallback}
        />
        <Flex flexDirection="column" w="full">
          <Flex>
            <HeaderBar isSidebarExpanded={isSidebarExpanded} />
          </Flex>
          <Flex>
            <main className={styles.Main}>{children}</main>
          </Flex>
        </Flex>
        {/* <Footer /> */}
      </Flex>
    </>
  );
}

export default Layout;
