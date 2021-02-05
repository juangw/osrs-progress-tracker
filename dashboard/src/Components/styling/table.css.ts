import React from "react";


export const styles: { [key: string]: React.CSSProperties } = {
   tableHeader: {
      background: "#CF6D46",
   },
   tableCells: {
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
      color: "grey",
   }
};