import Layout from "layout";
import "globals";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "store";
import { ChakraProvider } from "@chakra-ui/react";
import Firebase from "services/firebase";
import { useEffect } from "react";

const app = new Firebase();
// console.log("app");

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // app.signIn(
    //   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1CMk1BeUtTbjU1NWlzZDBFYmRoS3g2bmt5QWk5eExxOHJ2Q0ViX25PeVkifQ.eyJpc3MiOiJodHRwczpcL1wvc2xhY2suY29tIiwic3ViIjoiVTAzR0hNV1FQRTAiLCJhdWQiOiIyNjk3MjIyNzkxLjQxNTU2MzA4OTk4NjEiLCJleHAiOjE2NjQ4MDg0MzQsImlhdCI6MTY2NDgwODEzNCwiYXV0aF90aW1lIjoxNjY0ODA4MTM0LCJub25jZSI6IiIsImF0X2hhc2giOiJYY01laVlJbmg1RWdwWTNBMVVhQ0VnIiwiaHR0cHM6XC9cL3NsYWNrLmNvbVwvdGVhbV9pZCI6IlQwMkxINkpQOSIsImh0dHBzOlwvXC9zbGFjay5jb21cL3VzZXJfaWQiOiJVMDNHSE1XUVBFMCIsImVtYWlsIjoiYmFvX3BoYW1AZGF0YWhvdXNlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJkYXRlX2VtYWlsX3ZlcmlmaWVkIjoxNjYzNDg3MzI4LCJsb2NhbGUiOiJlbi1VUyIsIm5hbWUiOiJCYW8gUGhhbSIsInBpY3R1cmUiOiJodHRwczpcL1wvYXZhdGFycy5zbGFjay1lZGdlLmNvbVwvMjAyMi0wNS0yM1wvMzU4NTAyMjcwMzEwNF8zNTg0ZTM3OWVmY2NhZTA3MmQwZF81MTIuanBnIiwiZ2l2ZW5fbmFtZSI6IkJhbyIsImZhbWlseV9uYW1lIjoiUGhhbSIsImh0dHBzOlwvXC9zbGFjay5jb21cL3RlYW1fbmFtZSI6IkRhdGFIb3VzZSIsImh0dHBzOlwvXC9zbGFjay5jb21cL3RlYW1fZG9tYWluIjoiZGF0YWhvdXNlIiwiaHR0cHM6XC9cL3NsYWNrLmNvbVwvdGVhbV9pbWFnZV8yMzAiOiJodHRwczpcL1wvYXZhdGFycy5zbGFjay1lZGdlLmNvbVwvMjAxNS0xMi0wMlwvMTU4MTUxMDI0MzNfZWU2YjFhZTY2ODg0NWYxM2YwMGFfMzQuanBnIiwiaHR0cHM6XC9cL3NsYWNrLmNvbVwvdGVhbV9pbWFnZV9kZWZhdWx0IjpmYWxzZX0.BMcjsa_5zOVz87BtZxg9RkVwz0KsN18KprIddTG2wGonsBRBWCXqRwz4V9CNWbAc3KZG70vy_EqmySa2YhQkL5C9JkwDJ_Zh2ezlzgPtNlvN8HeWDcjhsnpYtRd8YCC5900KoZT8JROJ6_8sBJSgsStJFS_DSjRy_lSssfWxjG9j1nCe3IlHLUn0Ddh5QjlzlUrZO7sm4o8QjVow_Qnil9N6rQ8rIqmV_hdnWScJXw1NglVGI2wSE3YlyHQ1LvmpuSpTTKU-yDNpGjmn_OMrj7J-OrTO2HkVqQ4Q_MJS9Poe4k_KL4fQKhExyNUhKUL4w3JH6vE-BGigD6uSU4u9MA"
    // );

    return () => {};
  }, []);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
