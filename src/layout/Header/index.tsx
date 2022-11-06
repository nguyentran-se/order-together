import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { useAppSelector } from 'hooks';
import { selectAuthStatus } from 'selectors';

import { config, dom } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import { selectIsLoggedIn } from 'selectors';
config.autoAddCss = false;
function Header({ isSidebarExpanded, setIsSidebarExpanded }: any) {
  const status = useAppSelector(selectAuthStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isShowSidebar = isLoggedIn;
  return (
    <>
      <Head>
        <style>{dom.css()}</style>
      </Head>
      {isShowSidebar ? (
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      ) : (
        <Navbar />
      )}
    </>
  );
}

export default Header;
