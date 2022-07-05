import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); //텍스트를 찾음.
  expect(linkElement).toBeInTheDocument(); //<App />에 learn react 텍스트가 존재하는지 체크
});

test("use jsdom in this test file", () => {
  const el = document.createElement("div");
  expect(el).not.toBeNull();
});
