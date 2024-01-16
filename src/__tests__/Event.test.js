import { render } from "@testing-library/react";
// import { getEvents } from "../api";
import Event from "../components/Event";

describe("<Event /> component", () => {
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event />);
  });

  test("the event component is collapsed by default", () => {
    const suggestionListItem = Event.queryByRole("listitem");
    const showHideButton = Event.queryByRole("button");
    expect(suggestionListItem).toBeInTheDocument();
    expect(suggestionListItem).toHaveAttribute("aria-collapsed");
    expect(showHideButton).toBeInTheDocument();
    expect(showHideButton).toHaveClass("show-hide__button");
  });
});