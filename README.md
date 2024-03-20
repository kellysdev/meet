# Meet App

A serverless, progressive web application built with React using a test-driven development technique.  This app uses the Google Calendar API to fetch upcoming events, utilizes OAuth2 authentication and AWS Lambda serverless functions, and features data visualization enabled by Recharts.

## Serverless

Serverless functions will, as the OAuth consumer, allow the user to log into the Google OAuth provider.  The serverless functions will then use the OAuth authorization code to receive and handle an access token for the user as they request events from the Google Calendar API through the React app.

## User Stories and Scenarios

### Feature 1: Filter Events by City
>As a user, I should be able to filter events by city, so that I can see a list of events taking place in that city.

- Scenario 1 : When user hasn't searched for a city, show upcoming events from all cities.
  - Given the user is on the home page of the meet app,
When the user has not entered any city in the search field,
Then the system should display upcoming events from all cities.

- Scenario 2 : User should see a list of suggestions when they search for a city.
  - Given the user is on the home page of the meet app,
When the user starts typing in the city search field,
Then the app should provide a list of suggestions related to the entered search query.

- Scenario 3 : User can select a city from the suggested list.
  - Given the user has entered a partial or full city name in the search field,
When the user selects a city from the suggested list,
Then the app should update the search field with the selected city
and the app should display upcoming events for the selected city.

### Feature 2: Show/Hide Event Details
>As a user, I should be able to toggle the visibility of event details, so that I can quickly access and review pertinent information when needed.

- Scenario 1 : An event element is collapsed by default.
  - Given the user is on the event page of the meet app
When the user views an event element
Then the event element should include a "Show Details" button
And the event details should be collapsed by default.

- Scenario 2 : User can expand an event to see details.
  - Given the user is on the event page of the meet app
And the event element is present with collapsed details
When the user clicks the "Show Details" button for a specific event
Then the system should expand the event details
And the user should be able to view additional information about the event.

- Scenario 3 : User can collapse an event to hide details
  - Given the user is on the event page of the meet app
And the event details are currently expanded
When the user clicks the "Hide Details" button for a specific event
Then the system should collapse the event details
And the user should no longer see the expanded information for that event.


### Feature 3: Specify Number of Events
>As a user, I should be able to specify the number of events displayed on the page, so that I can customize my viewing experience and focus on the most relevant events based on my preferences.

- Scenario 1 : When user hasn't specified a number, 32 events are shown by default.
  - Given the user is on the homepage of the meet app
When the page is loaded
Then the system should display 32 events by default.

- Scenario 2 : User can change the number of events displayed.
  - Given the user is on the homepage of the meet app
When the user interacts with the option to change the number of displayed events
Then the app should allow the user to specify a different number of events to be displayed.

### Feature 4: Use the App When Offline
>As a user, I should be able to use the application even when offline, so that I can access important information and functionalities without requiring an internet connection, ensuring a seamless user experience in various scenarios.

- Scenario 1 : Show cached data when there is no internet connection.
  - Given the user has previously used the meetup app and loaded data
When the user goes offline
Then the system should display cached data from the user's previous interactions
And the user should be able to view event information and details based on the cached data.

- Scenario 2 : Show error when user changes search settings.
  - Given the user has previously used the meetup app and loaded data
And the user is currently offline
When the user attempts to change the search settings (e.g., city, number of events) while offline
Then the system should display an error message indicating that the operation cannot be performed without an internet connection
And the user should not be able to modify the search settings until a connection is reestablished.

### Feature 5: Add an App Shortcut to the Home Screen
>As a user, I should be able to add a shortcut to the home screen of my web browser, so that I can quickly launch the application, enhancing accessibility and convenience.

- Scenario 1 : User can install the meet app as a shortcut on their device home screen.
  - Given the user has accessed the meet app through a web browser on their device
When the user chooses to add the app shortcut to the home screen
Then the system should prompt the user with an option to install the app shortcut
And the user should be able to confirm the installation
And the meetup app shortcut should be added to the device's home screen.

### Feature 6: Display Charts Visualizing Event Details
>As a user, I should be able to display charts visualizing event data, so that I can easily comprehend and analyze events in my desired location, gaining insights into trends and patterns for more informed decision-making and planning.

- Scenario 1 : Show a chart with the number of upcoming events in each city.
  - Given the user is on the meetup app's analytics or statistics page
When the user views the page for upcoming events
Then the system should display a chart
And the chart should represent the number of upcoming events in each city
And the user should be able to visually analyze the distribution of events across different cities.
