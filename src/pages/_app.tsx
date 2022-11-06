import { ChakraProvider } from '@chakra-ui/react';
import 'assets/styles/globals.scss';
import AuthGuard from 'guards/AuthGuard';
import Layout from 'layout';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Firebase from 'services/firebase';
import Slack from 'services/slack';
import store from 'store';

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthGuard>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;

export const firebaseCore = new Firebase();
export const slackCore = new Slack();
