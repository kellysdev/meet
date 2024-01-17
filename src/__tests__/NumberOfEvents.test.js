import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
// Feature 3: Scenario 1
  test("renders an HTML element with role 'textbox'", () => {
    const NumOfEventsComponent = render(<NumberOfEvents />);
    expect(NumOfEventsComponent.queryByRole("textbox")).toBeInTheDocument();
  });
});