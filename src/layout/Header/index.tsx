import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { useAppSelector } from 'hooks';
import { selectAuthStatus } from 'selectors';

import { config, dom } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import { selectIsLoggedIn } from 'selectors/common.selector';
config.autoAddCss = false;
function Header() {
  const status = useAppSelector(selectAuthStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isShowSidebar = isLoggedIn;
  return (
    <>
      <Head>
        <style>{dom.css()}</style>
      </Head>
      {isShowSidebar ? <Sidebar /> : <Navbar />}
    </>
  );
}

export default Header;
