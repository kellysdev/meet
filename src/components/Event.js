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
        {showDetails ? 
          <div className="event-details" aria-expanded={ariaExpanded}>
          </div>
        : 
          <button onClick={toggleDetails} className="show-details" aria-label="Show details">Show Details</button>
        }
      </div>
    </li>
  );
};

export default Event;