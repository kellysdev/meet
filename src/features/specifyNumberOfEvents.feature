Feature: Specify Number of Events
  Scenario: When user hasn't specified a number, 32 events are shown by default
    Given the user is on the homepage of the meet app
    When the events have loaded
    Then 32 events should be displayed by default

  Scenario: User can change the number of events displayed
    Given the user is on the homepage of the meet app
    When the user changes the number in the number of events input element
    Then the number of events displayed should be the same as the number the user typed