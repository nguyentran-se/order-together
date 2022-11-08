import { defineStyle, defineStyleConfig, extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const headingConfig = defineStyle({
  fontFamily: 'mono',
});
const headingTheme = defineStyleConfig({
  variants: {
    custom: headingConfig,
  },
});

const theme = extendTheme({
  components: {
    Heading: headingTheme,
  },
});

export default theme;
