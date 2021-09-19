import React from "react";
import { customTheme } from "./theme";


export const styles: { [key: string]: React.CSSProperties } = {
   tableHeader: {
      color: customTheme.tertiary,
      background: customTheme.primary,
   },
   tableCells: {
      color: customTheme.tertiary,
      fontWeight: "bold" as "bold"
   },
   tableCellPositive: {
      fontWeight: "bold",
      color: "green",
   },
   tableCellNegative: {
      fontWeight: "bold",
      color: "red",
   },
   tableCellNeutral: {
      fontWeight: "bold",
      color: customTheme.tertiary,
   }
};