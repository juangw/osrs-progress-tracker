import type { AppProps } from 'next/app';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "../src/Components/styling/donation.css";

const THEME = createMuiTheme({
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider theme={THEME}>
      <Component {...pageProps} />
    </MuiThemeProvider>
  )
}

export default MyApp