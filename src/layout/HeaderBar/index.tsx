import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderDrawer from 'components/Drawer';
import { useAppSelector } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { selectAuthUserProfile, selectIsLoggedIn } from 'selectors';
import { selectNumberOfOrders } from 'selectors/orders.selector';
import { logOut } from 'utils/logout';
import styles from './index.module.scss';

function HeaderBar() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userProfile = useAppSelector(selectAuthUserProfile);
  const numberOfOrders = useAppSelector(selectNumberOfOrders);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isLoggedIn && (
        <Box w="full">
          <OrderDrawer isDrawerOpen={isOpen} onDrawerClose={onClose}></OrderDrawer>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            h="66px"
            p="0 20px"
            borderBottom="solid #eee 2px"
          >
            <Box p="20px">
              <Text fontSize="32px">{router.pathname}</Text>
            </Box>
            <Box>
              <Flex>
                <Box>
                  <Button
                    position="relative"
                    variant="ghost"
                    size={'md'}
                    onClick={onOpen}
                    p="5px 10px"
                    w="80px"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} size="2x"></FontAwesomeIcon>
                    <Box className={styles['Cart__order-box']} position="absolute">
                      <Text fontSize="14px">{numberOfOrders}</Text>
                    </Box>
                  </Button>
                </Box>
                <Menu>
                  <MenuButton
                    _hover={{ boxShadow: 'outline' }}
                    _expanded={{ bg: 'blue.400' }}
                    borderRadius="50px"
                  >
                    <Link href={''}>
                      <a>{avatar(userProfile.picture as string)}</a>
                    </Link>
                  </MenuButton>
                  <MenuList>
                    <Text p={'0.375rem 0.75rem'}>Hi, {userProfile.name}</Text>
                    <MenuDivider />
                    <MenuItem onClick={() => logOut()}>Log out</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}

const avatar = (url: string) => {
  return <Avatar src={url} size="md" showBorder />;
};

export default HeaderBar;
