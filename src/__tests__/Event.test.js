import { render } from "@testing-library/react";
import { getEvents } from "../api";
import Event from "../components/Event";

describe("<Event /> component", () => {
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event />);
  });

  test("the event component is collapsed by default and include a 'show details' button", () => {
    const suggestionListItem = EventComponent.queryByRole("listitem");
    const showDetailsButton = EventComponent.queryByRole("button");
    expect(suggestionListItem).toBeInTheDocument();
    expect(suggestionListItem).toHaveAttribute("aria-expanded", "false");
    expect(showDetailsButton).toBeInTheDocument();
    expect(showDetailsButton).toHaveClass("show-details");
  });

  test("renders event title", async () => {
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });
});