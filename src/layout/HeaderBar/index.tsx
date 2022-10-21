import { useAppSelector } from 'hooks';
import { selectAuthStatus } from 'selectors';

import { selectIsLoggedIn } from 'selectors/common.selector';

function HeaderBar() {
  const status = useAppSelector(selectAuthStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isShowSidebar = isLoggedIn;
  return <></>;
}

export default HeaderBar;
