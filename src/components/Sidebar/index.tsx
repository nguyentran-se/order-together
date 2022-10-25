import { Avatar, Box, Button, Flex, IconButton } from '@chakra-ui/react';
import {
  faArrowLeft,
  faArrowRight,
  faCartShopping,
  faHeart,
  faHouse,
  faLandmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from 'components/Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './index.module.scss';

const avatar = (url: string) => {
  return <Avatar src={url} size="xl" showBorder />;
};
function Sidebar() {
  const [isSidebarExpanded, onSidebarExpand] = useState(true);
  const router = useRouter();
  const toggleSidebarExpand = () => {
    onSidebarExpand(!isSidebarExpanded);
  };
  const isActive = (path: string) => router.pathname.includes(path);
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
        // style={{ background: 'brand.500' }}
        // color="gray.700"
        position="relative"
      >
        <Flex position="absolute" transform="translateX(50%)" right={0} top="6%">
          <IconButton
            aria-label="LeftBtn"
            borderRadius="50%"
            className={styles['Sidebar--btn__resize']}
            onClick={() => toggleSidebarExpand()}
          >
            <FontAwesomeIcon
              size="xs"
              icon={isSidebarExpanded ? faArrowLeft : faArrowRight}
            ></FontAwesomeIcon>
          </IconButton>
        </Flex>
        <Flex direction="column" width="full">
          <Flex direction="column">
            <Flex alignSelf="center" h="56px">
              <Logo flexGrow={0} size="md" color="light" minimized={!isSidebarExpanded}></Logo>
            </Flex>

            {/* 1st Sidebar Section */}
            <Flex
              className={styles['Sidebar--section']}
              direction="column"
              alignItems={isSidebarExpanded ? '' : 'center'}
            >
              <Box className={styles['Sidebar--divider']}></Box>
              <Link href={'/dashboard'}>
                <Button
                  className={`${styles['Sidebar--btn']} ${
                    isActive('dashboard') ? styles['active'] : ''
                  }`}
                  colorScheme="blue"
                >
                  <a>
                    <FontAwesomeIcon icon={faHouse} />
                    {isSidebarExpanded ? <span>Dashboard</span> : ''}
                  </a>
                </Button>
              </Link>
              <Link href={'/orders'}>
                <Button
                  className={`${styles['Sidebar--btn']} ${
                    isActive('orders') ? styles['active'] : ''
                  }`}
                  colorScheme="blue"
                >
                  <a>
                    <FontAwesomeIcon icon={faCartShopping} />
                    {isSidebarExpanded ? <span>My orders</span> : ''}
                  </a>
                </Button>
              </Link>
            </Flex>

            {/* Divider Line */}
            <Box className={styles['Sidebar--divider']}></Box>

            {/* 2nd Sidebar Section */}
            <Flex
              className={styles['Sidebar--section']}
              direction="column"
              alignItems={isSidebarExpanded ? '' : 'center'}
            >
              <Link href={'/lounge'}>
                <Button
                  className={`${styles['Sidebar--btn']} ${
                    isActive('lounge') ? styles['active'] : ''
                  }`}
                  colorScheme="blue"
                >
                  <a>
                    <FontAwesomeIcon icon={faLandmark} />
                    {isSidebarExpanded ? <span>Food Lounge</span> : ''}
                  </a>
                </Button>
              </Link>
              <Link href={''}>
                <Button
                  className={`${styles['Sidebar--btn']} ${
                    isActive('/favorite') ? styles['active'] : ''
                  }`}
                  colorScheme="blue"
                >
                  <a>
                    <FontAwesomeIcon icon={faHeart} />
                    {isSidebarExpanded ? <span>Favorites</span> : ''}
                  </a>
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
export default Sidebar;
