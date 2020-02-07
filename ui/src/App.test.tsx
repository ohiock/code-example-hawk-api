import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders a route for the hawk listing page", () => {
    const { getByTestId } = render(<App />);
  });
});
