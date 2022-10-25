import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import styles from './index.module.scss';
interface LogoProps {
  size?: 'sm' | 'md';
  flexGrow?: number;
  color?: 'light' | 'dark';
  minimized?: boolean;
}
const getColor = (colorMode: LogoProps['color']) => {
  switch (colorMode) {
    case 'light':
      return '#0060a9';
    case 'dark':
      return 'white';
    default:
  }
};
function Logo({ size = 'md', flexGrow = 1, color = 'light', minimized = false }: LogoProps) {
  const classes = `${styles.Logo} ${styles['Logo__' + size]}`;
  return (
    <Box flexGrow={flexGrow} color={getColor(color)} className={classes}>
      <Link href="/">{minimized ? 'O.T' : 'ORDER TOGETHER'}</Link>
    </Box>
  );
}

export default Logo;
