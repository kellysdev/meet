Feature: Show/Hide an events details
  Scenario: An event element is collapsed by default
    Given the user is on the main page of the app
    When the event data loads
    Then the event details should be collapsed
  
  Scenario: User can expand an event to see details
    Given the user views an event item
    And the event details are collapsed
    When the user clicks the "Show details" button
    Then the user should be able to view additional details about the event

  Scenario: User can collapse an event to hide details
    Given the user is viewing the expanded details for an event
    When the user clicks on the "Hide details" button
    Then the details should be hidden