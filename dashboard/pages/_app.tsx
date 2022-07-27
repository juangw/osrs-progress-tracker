import type { AppProps } from 'next/app';
import React from 'react';
import { createTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { QueryClient, QueryClientProvider } from "react-query";

import "../src/Components/styling/donation.css";

const THEME = createTheme({
  palette: {
    primary: {
      dark: "#EEEEEE",
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    }
  },
  typography: {
   "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500,
  }
});

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider theme={THEME}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </MuiThemeProvider>
  )
}

export default MyApp