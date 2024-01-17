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
        {/* <h2>{event.summary}</h2> */}
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