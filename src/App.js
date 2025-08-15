import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { HelmetProvider } from "react-helmet-async";
import router from "./Router";
import authRouter from "./AuthRouter";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />

          {isLoggedIn ? (
              <RouterProvider router={router} />
            ) : (
              <RouterProvider router={authRouter} />
          )}

        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
