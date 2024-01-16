import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [ariaExpanded, setAriaExpanded] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setAriaExpanded(!ariaExpanded);
  };

  return (
    <li aria-expanded={ariaExpanded}>
      <div className="event">
        <h2>{event.summary}</h2>
        {showDetails ? 
          <p></p>
        : 
          <button onClick={toggleDetails} className="show-details" aria-label="Show details">Show Details</button>
        }
      </div>
    </li>
  );
};

export default Event;