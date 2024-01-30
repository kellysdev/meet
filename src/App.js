import { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { getEvents, extractLocations } from "./api";

import "./App.css";

const App = () => {
  // NOE = number of events
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ? 
      allEvents : 
      allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
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
              <h1 className="meet">meet</h1>
              <p className="subtitle">& learn to code;</p>
            </div>
            
          <div className="inputs">
            <CitySearch 
              allLocations={allLocations} 
              setCurrentCity={setCurrentCity}
            />
            <NumberOfEvents setCurrentNOE={setCurrentNOE} />
          </div>
        </div>
        
        <EventList events={events} />
      </div>
    )}
    </div>
  );
};

export default App;
