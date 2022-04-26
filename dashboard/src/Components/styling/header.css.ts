import React from "react";
import { customTheme } from "./theme";


export const styles: { [key: string]: React.CSSProperties } = {
    navBar: {
      background: customTheme.tertiary,
    },
    navBarLinks: {
      marginLeft: "auto",
      display: "flex",
      justifyContent: "space-between"
    },
    linkText: {
      textDecoration: "none",
      textTransform: "uppercase",
      color: customTheme.primary
    },
};