import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
// Feature 3: Scenario 1
  let NumOfEventsComponent;
  beforeEach(() => {
    NumOfEventsComponent = render(<NumberOfEvents />);
  })
  test("renders an HTML element with role 'textbox'", () => {
    expect(NumOfEventsComponent.queryByRole("textbox")).toBeInTheDocument();
  });

  test("the default value in the textbox is 32", () => {
    expect(NumOfEventsComponent.queryByRole("textbox")).toHaveValue("32");
  });
});