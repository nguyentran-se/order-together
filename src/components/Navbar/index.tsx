import styles from './index.module.scss';

import { Box, Button, Flex, Show, Spacer } from '@chakra-ui/react';
import { Status } from '@types';
import Link from 'next/link';
import { useState } from 'react';
import { selectAuthStatus } from 'selectors';
// import { HamburgerIcon } from "@chakra-ui/icons";
import { useAppSelector } from 'hooks';
import { slackCore } from 'pages/_app';

const signinBtn = (isLoading = false) => {
  return (
    <a className={styles['btn-login']} href={slackCore.createAuthRequest()}>
      <Button
        colorScheme="blackAlpha"
        variant="solid"
        isLoading={isLoading}
        className={styles['glow-on-hover']}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{
            height: '20px',
            width: '20px',
            marginRight: '12px',
          }}
          viewBox="0 0 122.8 122.8"
        >
          <path
            d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
            fill="#e01e5a"
          ></path>
          <path
            d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
            fill="#36c5f0"
          ></path>
          <path
            d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
            fill="#2eb67d"
          ></path>
          <path
            d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
            fill="#ecb22e"
          ></path>
        </svg>
        <span>Sign in &#x20; &#x20;</span>
        {/* <Icon as={ExternalLinkIcon}/> */}
      </Button>
    </a>
  );
};

// const avatar = (url: string) => {
//   return <Avatar src={url} />;
// };

function Navbar() {
  const status = useAppSelector(selectAuthStatus);
  const isLoading = status === Status.PENDING;

  const [isNavMenuToggled, toggleNavMenu] = useState(false);
  const onToggleNavMenu = () => {
    toggleNavMenu(!isNavMenuToggled);
  };
  return (
    <Box className={styles.Nav}>
      {
        // !isLoggedIn &&
        // ? (
        //   <Flex flexWrap="wrap" alignItems={"center"} style={{'background': 'lightsteelblue'}}>
        //     <Show above="lg">
        //       <Box className={styles["nav--logo__small"]}>
        //         <Link href="/">ORDER TOGETHER</Link>
        //       </Box>
        //       <Spacer />
        //       <Box style={{'textAlign': 'center'}}>
        //         {avatar(userProfile.picture)}
        //         <p>Hi, {userProfile.given_name} {userProfile.family_name}</p>
        //       </Box>
        //     </Show>
        //   </Flex>
        // ) :
        <>
          <Flex flexWrap="wrap" alignItems={'center'}>
            <Show above="lg">
              <Box className={styles['Nav--logo']}>
                <Link href="/">ORDER TOGETHER</Link>
              </Box>
              <Spacer />
              <Box>
                <ul>
                  <li>Home</li> <li>Blog</li> <li>About</li>
                  {signinBtn(isLoading)}
                </ul>
              </Box>
            </Show>
            <Show below="lg">
              <Show above="md">
                <Box w={40} h={0}></Box>
                <Box flexGrow={1} className={styles['Nav--logo']}>
                  <Link href="/">ORDER TOGETHER</Link>
                </Box>
                <Box className={styles['Nav--menu-btn']} margin={10}>
                  <Link href="/">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        onToggleNavMenu();
                      }}
                    >
                      {/* <Icon
                        href="/"
                        color="ActiveBorder"
                        as={HamburgerIcon}
                        w={10}
                        h={10}
                      ></Icon> */}
                    </a>
                  </Link>
                </Box>
              </Show>
              <Show below="md">
                <Box flexGrow={1} className={styles['Nav--logo__small']}>
                  <Link href="/">ORDER TOGETHER</Link>
                </Box>
                <Box className={styles['Nav--menu-btn']} margin={5}>
                  <Link href="/">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        onToggleNavMenu();
                      }}
                    >
                      {/* <Icon
                        href="/"
                        color="ActiveBorder"
                        as={HamburgerIcon}
                        w={8}
                        h={8}
                      ></Icon> */}
                    </a>
                  </Link>
                </Box>
              </Show>
            </Show>
          </Flex>
          <Show below="lg">
            <Box
              boxShadow="base"
              className={`${styles['Nav--menu']} ${
                styles[isNavMenuToggled ? 'Nav--menu__show' : 'Nav--menu__hidden']
              }`}
            >
              <ul>
                <li>Home</li>
                <li>About me</li>
                {signinBtn(isLoading)}
              </ul>
            </Box>
          </Show>
        </>
      }
    </Box>
  );
}

export default Navbar;
