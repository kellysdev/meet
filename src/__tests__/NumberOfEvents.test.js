import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
// Feature 3: Scenario 1
  let NumOfEventsComponent;
  beforeEach(() => {
    NumOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} />);
  });

  test("renders an HTML element with role 'textbox'", () => {
    expect(NumOfEventsComponent.queryByRole("spinbutton")).toBeInTheDocument();
  });

  test("the default value in the textbox is 32", () => {
    expect(NumOfEventsComponent.queryByRole("spinbutton")).toHaveValue(32);
  });
// Feature 3: Scenario 2
  test("the value of the textbox changes when user types in it", async () => {
    const user = userEvent.setup();
    const textbox = NumOfEventsComponent.queryByRole("spinbutton");
    await user.type(textbox, "{backspace}{backspace}10");
    expect(textbox).toHaveValue(10);
  });
});