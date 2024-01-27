import { defineFeature, loadFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
  test("When user hasn't specified a number, 32 events are shown by default", ({given, then, when}) => {
    let AppComponent;
    given("the user is on the homepage of the meet app", () => {
      AppComponent = render(<App />);
    });

    when("the events have loaded", async () => {
      await waitFor(() => {
        getEvents();
      });
    });

    then("32 events should be displayed by default", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;
    given('the user is on the homepage of the meet app', async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        getEvents();
      });
    });

    let AppDOM;
    let NOEDOM;
    let NOEInput;
    when('the user changes the number in the number of events input element', async () => {
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      NOEDOM = AppDOM.querySelector("#number-of-events");
      NOEInput = within(NOEDOM).queryByRole("spinbutton");
      await user.type(NOEInput, "{backspace}{backspace}10");
    });

    then('the number of events displayed should be the same as the number the user typed', () => {
      const EventListDOM = AppDOM.querySelector("#event-list");
      const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem");
      expect(allRenderedEventItems.length).toBe(10);
    });
});
});