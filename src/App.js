import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, allLocations, extractLocations } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  // NOE = number of events
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} />
      <NumberOfEvents />
      <EventList events={events} />
    </div>
  );
}

export default App;
