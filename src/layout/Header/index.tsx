import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthStatus,
  selectAuthUserProfile,
  selectIsLoggedIn,
} from "selectors";

import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";

import { config, dom } from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
config.autoAddCss = false;

function Header() {
  const status = useSelector(selectAuthStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Head><style>{dom.css()}</style></Head>
      {
        isLoggedIn
        ? <Sidebar />
        : <Navbar />
      }
    </>
  );
}

export default Header;
