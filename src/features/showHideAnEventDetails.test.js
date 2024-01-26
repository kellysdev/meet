import { render, within, waitFor } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";
import Event from "../components/Event";

const event = {
  "kind": "calendar#event",
    "etag": "\"3181161784712000\"",
    "id": "4eahs9ghkhrvkld72hogu9ph3e_20200519T140000Z",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
    "created": "2020-05-19T19:17:46.000Z",
    "updated": "2020-05-27T12:01:32.356Z",
    "summary": "Learn JavaScript",
    "description": "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",
    "location": "London, UK",
    "creator": {
     "email": "fullstackwebdev@careerfoundry.com",
     "self": true
    },
    "organizer": {
     "email": "fullstackwebdev@careerfoundry.com",
     "self": true
    },
    "start": {
     "dateTime": "2020-05-19T16:00:00+02:00",
     "timeZone": "Europe/Berlin"
    },
    "end": {
     "dateTime": "2020-05-19T17:00:00+02:00",
     "timeZone": "Europe/Berlin"
    },
    "recurringEventId": "4eahs9ghkhrvkld72hogu9ph3e",
    "originalStartTime": {
     "dateTime": "2020-05-19T16:00:00+02:00",
     "timeZone": "Europe/Berlin"
    },
    "iCalUID": "4eahs9ghkhrvkld72hogu9ph3e@google.com",
    "sequence": 0,
    "reminders": {
     "useDefault": true
    },
    "eventType": "default"
};

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    let AppComponent;
    given("the user is on the main page of the app", () => {
      AppComponent = render(<App />);
    });

    when("the event data loads", async () => {
      await waitFor(() => {
        getEvents();
      })
    });

    let AppDOM;
    then("the event details should be collapsed", () => {
      AppDOM  = AppComponent.container.firstChild;
      expect(AppDOM).not.toHaveTextContent("About event");
    });
  });

  test("User can expand an event to see details", ({ given, and, when, then }) => {
    let EventComponent;
    given("the user views an event item", () => {
      EventComponent = render(<Event event={event} />);
    });

    let hiddenDetails;
    let showDetailsButton;
    and("the event details are collapsed", () => {
      hiddenDetails = EventComponent.container.querySelector(".event-details");
      showDetailsButton = EventComponent.container.querySelector(".show-details");
      expect(hiddenDetails).not.toBeInTheDocument();
      expect(showDetailsButton).toBeInTheDocument();
    });

    when("the user clicks the \"Show details\" button", async () => {
      const user = userEvent.setup();
      await user.click(showDetailsButton);
    });

    let hideDetailsButton;
    then("the user should be able to view additional details about the event", () => {
      hideDetailsButton = EventComponent.container.querySelector(".hide-details");
      expect(hideDetailsButton).toBeInTheDocument();
      expect(showDetailsButton).not.toBeInTheDocument();
    });
  });

  test("User can collapse an event to hide details", ({ given, when, then }) => {
    let EventComponent;
    let showDetailsButton
    let eventDetails;
    given("the user is viewing the expanded details for an event", async () => {
      const user = userEvent.setup();
      EventComponent = render(<Event event={event} />);
      showDetailsButton = EventComponent.container.querySelector(".show-details");

      await user.click(showDetailsButton);
      
      eventDetails = EventComponent.container.querySelector(".event-details");
      expect(eventDetails).toBeInTheDocument();
    });

    let hideDetailsButton;
    when("the user clicks on the \"Hide details\" button", async () => {
      const user = userEvent.setup();
      hideDetailsButton = EventComponent.container.querySelector(".hide-details");

      await user.click(hideDetailsButton);
    });

    then("the details should be hidden", () => {
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

});