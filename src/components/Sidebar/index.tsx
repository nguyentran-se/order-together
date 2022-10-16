import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  useBoolean,
} from '@chakra-ui/react';
import Logo from 'components/Logo';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUserProfile } from 'selectors';
import styles from './index.module.scss';
import {
  faHouse,
  faCartShopping,
  faLandmark,
  faHeart,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from 'hooks';

const avatar = (url: string) => {
  return <Avatar src={url} size="xl" showBorder />;
};
function Sidebar() {
  const [isSidebarExpanded, onSidebarExpand] = useState(true);
  const userProfile = useAppSelector(selectAuthUserProfile);
  const toggleSidebarExpand = () => {
    onSidebarExpand(!isSidebarExpanded);
  };
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      <Flex
        flexWrap="wrap"
        className={`${styles.Sidebar} ${isSidebarExpanded ? '' : styles['Sidebar__minimized']}`}
        style={{ background: 'brand.500' }}
        position="relative"
      >
        <Flex position="absolute" transform="translateX(50%)" right={0} top="25%">
          <IconButton
            aria-label="LeftBtn"
            colorScheme="blue"
            className={styles['Sidebar--btn__resize']}
            onClick={() => toggleSidebarExpand()}
          >
            <FontAwesomeIcon
              icon={isSidebarExpanded ? faArrowLeft : faArrowRight}
            ></FontAwesomeIcon>
          </IconButton>
        </Flex>
        <Flex direction="column" width="full">
          <Flex direction="column">
            <Flex alignSelf="center" marginBottom={5}>
              <Logo flexGrow={0} size="md" color="dark" minimized={!isSidebarExpanded}></Logo>
            </Flex>
            <Flex alignSelf="center" marginBottom={5}>
              <Box style={{ textAlign: 'center' }}>
                {avatar(userProfile.picture as string)}
                <p style={{}}>
                  Hi {userProfile?.givenName} {userProfile?.familyName}
                </p>
              </Box>
            </Flex>
            <Flex
              className={styles['Sidebar--section']}
              direction="column"
              alignItems={isSidebarExpanded ? '' : 'center'}
            >
              <Box className={styles['Sidebar--divider']}></Box>
              <Button className={styles['Sidebar--btn']} colorScheme="blue">
                <Link href={'/dashboard'}>
                  <a>
                    <FontAwesomeIcon icon={faHouse} />
                    {isSidebarExpanded ? <span>Dashboard</span> : ''}
                  </a>
                </Link>
              </Button>
              <Button className={styles['Sidebar--btn']} colorScheme="blue">
                <Link href={'/orders'}>
                  <a>
                    <FontAwesomeIcon icon={faCartShopping} />
                    {isSidebarExpanded ? <span>My orders</span> : ''}
                  </a>
                </Link>
              </Button>
              {/* <Button className={styles["Sidebar--btn"]} colorScheme="blue">
            Food Lounge
          </Button> */}
            </Flex>
            <Box className={styles['Sidebar--divider']}></Box>
            <Flex
              className={styles['Sidebar--section']}
              direction="column"
              alignItems={isSidebarExpanded ? '' : 'center'}
            >
              <Button className={styles['Sidebar--btn']} colorScheme="blue">
                <Link href={'/lounge'}>
                  <a>
                    <FontAwesomeIcon icon={faLandmark} />
                    {isSidebarExpanded ? <span>Food Lounge</span> : ''}
                  </a>
                </Link>
              </Button>
              <Button className={styles['Sidebar--btn']} colorScheme="blue">
                <Link href={'/lounge'}>
                  <a>
                    <FontAwesomeIcon icon={faHeart} />
                    {isSidebarExpanded ? <span>Favorites</span> : ''}
                  </a>
                </Link>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
export default Sidebar;
