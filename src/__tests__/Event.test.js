import { render } from "@testing-library/react";
import { getEvents } from "../api";
import Event from "../components/Event";

describe("<Event /> component", () => {
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event />);
  });

  test("the event component is collapsed by default and include a 'show details' button", () => {
    const listItem = EventComponent.queryByRole("listitem");
    const showDetailsButton = EventComponent.queryByRole("button");
    const hiddenDetails = EventComponent.container.querySelector(".event-details");
    expect(listItem).toBeInTheDocument();
    expect(hiddenDetails).not.toBeInTheDocument();
    expect(showDetailsButton).toBeInTheDocument();
    expect(showDetailsButton).toHaveClass("show-details");
  });

  test("renders event title", async () => {
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });
});