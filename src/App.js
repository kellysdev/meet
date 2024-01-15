import './App.css';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
    </div>
  );
}

export default App;
