import { render, screen } from "@testing-library/react";
import { Button } from "./button.component";


it('Button component should be render', () => {
  const { asFragment } = render(<Button />);

  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId('custom-button')).toBeInTheDocument();
})