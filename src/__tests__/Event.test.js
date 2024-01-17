import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import Event from "../components/Event";

describe("<Event /> component Feature 2", () => {
  let allEvents;
  let EventComponent;
  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

// Feature 2: Scenario 1
  test("the event component is collapsed by default and include a 'show details' button", () => {
    const listItem = EventComponent.queryByRole("listitem");
    const showDetailsButton = EventComponent.queryByRole("button");
    const hiddenDetails = EventComponent.container.querySelector(".event-details");
    expect(listItem).toBeInTheDocument();
    expect(hiddenDetails).not.toBeInTheDocument();
    expect(showDetailsButton).toBeInTheDocument();
    expect(showDetailsButton).toHaveClass("show-details");
  });
  // render event info when collapsed
  test("renders event title", () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test("renders event start time", () => {
    expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
  });

  test("renders event location", () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });
// Feature 2: Scenario 2 & 3
  test("the event details are visible after clicking the 'show details' button", async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.getByText("Show Details");
    await user.click(showDetailsButton);
    expect(EventComponent.getByText("Hide Details")).toBeInTheDocument();
  });
});