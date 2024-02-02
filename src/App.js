import { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CityEventsChart from "./components/CityEventsChart";
import { getEvents, extractLocations } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";

import "./App.css";
import "./nprogress.css";

const App = () => {
  // NOE = number of events
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ? 
      allEvents : 
      allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are currently offline.  Be aware that the displayed event data may not be up to date.");
    }
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    // delay components rendering before fetch is complete:
    <div>
    {!events ? (
      <div>Loading...</div>
    ) : (
      <div className="App">

        <div className="header">
            <div className="logo">
              <p className="meet">meet</p>
              <p className="subtitle">& learn to code;</p>
            </div>
            
          <div className="inputs">
            <CitySearch 
              allLocations={allLocations} 
              setCurrentCity={setCurrentCity}
              setInfoAlert={setInfoAlert}
            />
            <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
          </div>
        </div>

        <div className="alerts-container">
            {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
            {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
            {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        </div>

        <div className="charts-container">
          <CityEventsChart allLocations={allLocations} events={events} />
        </div>

        <EventList events={events} />
      </div>
    )}
    </div>
  );
};

export default App;
