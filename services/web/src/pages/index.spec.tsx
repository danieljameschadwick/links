import React from "react";
import { render } from "@testing-library/react-native";
import Index from "@src/pages/index";

describe("Index", () => {
  it("renders correctly", async () => {
    const { toJSON } = render(<Index />);

    expect(toJSON()).toMatchSnapshot();
  });
});
