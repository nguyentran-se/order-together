import { Button, WrapItem, Wrap, Avatar } from "@chakra-ui/react";
import { Status } from "@types";
import { createAuthRequest } from "services/slack";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthAvatarUrl,
  selectAuthStatus,
  selectIsLoggedIn,
} from "selectors";
import { loginWithSlack } from "slices/auth/authSaga";
import styles from "./index.module.scss";

const signinBtn = (isLoading = false) => {
  return (
    <a className={styles["btn-login"]} href={createAuthRequest()}>
      <Button colorScheme="teal" variant="solid" isLoading={isLoading}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{
            height: "20px",
            width: "20px",
            marginRight: "12px",
          }}
          viewBox="0 0 122.8 122.8">
          <path
            d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
            fill="#e01e5a"></path>
          <path
            d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
            fill="#36c5f0"></path>
          <path
            d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
            fill="#2eb67d"></path>
          <path
            d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
            fill="#ecb22e"></path>
        </svg>
        Sign in with slack
      </Button>
    </a>
  );
};

const avatar = (url: string) => {
  return (
    <Wrap style={{ float: "right", margin: 0 }}>
      <WrapItem>
        <Avatar src={url} />
      </WrapItem>
    </Wrap>
  );
};

function Header() {
  const status = useSelector(selectAuthStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const avatarUrl = useSelector(selectAuthAvatarUrl);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = status === Status.PENDING;
  const { code } = router.query;
  useEffect(() => {
    if (code) {
      dispatch(loginWithSlack(code as string));
    }
  }, [code, dispatch]);

  return (
    <div className={styles.nav}>
      <ul>
        {/* <li>ORDER TOGETHER</li> */}
        <li>Home</li>
        <li>About me</li>
        {isLoggedIn ? avatar(avatarUrl) : signinBtn(isLoading)}
      </ul>
    </div>
  );
}

export default Header;
