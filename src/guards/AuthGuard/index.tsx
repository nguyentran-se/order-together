import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'selectors';

type LayoutProps = {
  children: React.ReactNode;
};

function AuthGuard({ children }: LayoutProps) {
  const router = useRouter();
  const pathName = router.pathname;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    if (pathName !== '/' && !isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, pathName, router]);
  return <>{children}</>;
}

export default AuthGuard;
