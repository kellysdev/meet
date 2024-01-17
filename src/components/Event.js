import { useState } from "react";


const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [ariaExpanded, setAriaExpanded] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setAriaExpanded(!ariaExpanded);
  };

  return (
    <li>
      <div className="event">
        <h2 className="event-title">{event.summary}</h2>
        <p className="event-time">{event.created}</p>
        <p className="event-location">{event.location}</p>
        {showDetails ? 
          <div className="event-details" aria-expanded={ariaExpanded}>
            <h3><b>About event:</b></h3>
            <a href={event.htmlLink}>See details on Google Calendar</a>
            <p>{event.description}</p>
            <button onClick={toggleDetails} className="hide-details" aria-label="Hide details">Hide Details</button>
          </div>
        : 
          <button onClick={toggleDetails} className="show-details" aria-label="Show details">Show Details</button>
        }
      </div>
    </li>
  );
};

export default Event;