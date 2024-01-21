import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  test("renders NumberOfEvents", () => {
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
});

describe("<App /> integration", () => {
  // for Feature 1: Scenario 3
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    const AppComponent= render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem");

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === "Berlin, Germany"
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  // Feature 3: Scenario 2: user can change the NOE displayed
  test("user can change the number of events displayed", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NOEDom = AppDOM.querySelector("#number-of-events");
    const NOEInput = within(NOEDom).queryByRole("spinbutton");
    
    await user.type(NOEInput, "{backspace}{backspace}10");

    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem");

    expect(allRenderedEventItems.length).toBe(10);
  });
});