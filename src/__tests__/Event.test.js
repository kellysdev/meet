import { render } from "@testing-library/react";
import { getEvents } from "../api";
import Event from "../components/Event";

describe("<Event /> component", () => {

  test("the event component is collapsed by default and include a 'show details' button", () => {
    const EventComponent = render(<Event />);
    const listItem = EventComponent.queryByRole("listitem");
    const showDetailsButton = EventComponent.queryByRole("button");
    const hiddenDetails = EventComponent.container.querySelector(".event-details");
    expect(listItem).toBeInTheDocument();
    expect(hiddenDetails).not.toBeInTheDocument();
    expect(showDetailsButton).toBeInTheDocument();
    expect(showDetailsButton).toHaveClass("show-details");
  });

  test.only("renders event title", async () => {
    const allEvents = await getEvents();
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });
  
});