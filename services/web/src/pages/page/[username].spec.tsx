import React from "react";
import { render } from "@testing-library/react-native";
import UserPage from "@src/pages/page/[username]";

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));

describe("UserProfile", () => {
  it("renders correctly", async () => {
    const { toJSON } = render(<UserPage />);

    expect(toJSON()).toMatchSnapshot();
  });
});
