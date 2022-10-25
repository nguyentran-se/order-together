import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// const colors = {
//   transparent: 'transparent',
//   black: '#000',
//   white: '#fff',
//   blue: {
//     '50': '#EBF8FF',
//     '100': '#BEE3F8',
//     '200': '#90CDF4',
//     '300': '#63B3ED',
//     '400': '#4299E1',
//     '500': '#3182CE',
//     '600': '#2B6CB0',
//     '700': '#2C5282',
//     '800': '#2A4365',
//     '900': '#1A365D',
//   },
// };

// const fonts = {
//   body: 'system-ui, sans-serif',
//   heading: 'Georgia, serif',
//   mono: 'Menlo, monospace',
//   logo: 'Thunder, Roboto',
// };

// const fontSizes = {
//   xs: '0.75rem',
//   sm: '0.875rem',
//   md: '1rem',
//   lg: '1.125rem',
//   xl: '1.25rem',
//   '2xl': '1.5rem',
//   '3xl': '1.875rem',
//   '4xl': '2.25rem',
//   '5xl': '3rem',
//   '6xl': '3.75rem',
//   '7xl': '4.5rem',
//   '8xl': '6rem',
//   '9xl': '8rem',
// };

// const fontWeights = {
//   hairline: 100,
//   thin: 200,
//   light: 300,
//   normal: 400,
//   medium: 500,
//   semibold: 600,
//   bold: 700,
//   extrabold: 800,
//   black: 900,
// };

// const lineHeights = {
//   normal: 'normal',
//   none: 1,
//   shorter: 1.25,
//   short: 1.375,
//   base: 1.5,
//   tall: 1.625,
//   taller: '2',
//   '3': '.75rem',
//   '4': '1rem',
//   '5': '1.25rem',
//   '6': '1.5rem',
//   '7': '1.75rem',
//   '8': '2rem',
//   '9': '2.25rem',
//   '10': '2.5rem',
// };

// const letterSpacings = {
//   tighter: '-0.05em',
//   tight: '-0.025em',
//   normal: '0',
//   wide: '0.025em',
//   wider: '0.05em',
//   widest: '0.1em',
// };

// const space = {
//   px: '1px',
//   0.5: '0.125rem',
//   1: '0.25rem',
//   1.5: '0.375rem',
//   2: '0.5rem',
//   2.5: '0.625rem',
//   3: '0.75rem',
//   3.5: '0.875rem',
//   4: '1rem',
//   5: '1.25rem',
//   6: '1.5rem',
//   7: '1.75rem',
//   8: '2rem',
//   9: '2.25rem',
//   10: '2.5rem',
//   12: '3rem',
//   14: '3.5rem',
//   16: '4rem',
//   20: '5rem',
//   24: '6rem',
//   28: '7rem',
//   32: '8rem',
//   36: '9rem',
//   40: '10rem',
//   44: '11rem',
//   48: '12rem',
//   52: '13rem',
//   56: '14rem',
//   60: '15rem',
//   64: '16rem',
//   72: '18rem',
//   80: '20rem',
//   96: '24rem',
// };

// export const theme = extendTheme({
//   colors,
//   fonts,
//   fontSizes,
//   fontWeights,
//   lineHeights,
//   letterSpacings,
//   space,
// });

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
