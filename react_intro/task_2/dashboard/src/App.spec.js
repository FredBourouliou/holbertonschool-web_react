import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders h1 with text School dashboard", () => {
  render(<App />);
  const heading = screen.getByRole("heading", {
    name: /school dashboard/i,
  });
  expect(heading).toBeInTheDocument();
});

test("renders correct text in App-body and App-footer paragraphs", () => {
  render(<App />);
  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/copyright \d{4} - holberton school/i)
  ).toBeInTheDocument();
});

test("renders an img element with holberton logo alt text", () => {
  render(<App />);
  const img = screen.getByAltText(/holberton logo/i);
  expect(img).toBeInTheDocument();
});
