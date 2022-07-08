import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HomePage } from "../HomePage";


it("Renders without crashing", () => {
  const div = document.createElement("div");
  const queryClient = new QueryClient()
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
