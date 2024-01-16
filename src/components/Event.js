import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [ariaExpanded, setAriaExpanded] = useState(false);

  const showHideDetails = () => {
    setShowDetails(!showDetails);
    setAriaExpanded(!ariaExpanded);
  };

  return (
    <li>
      <div className="event" aria-expanded={ariaExpanded}>
        <h2>{event.summary}</h2>
        {showDetails ? 
          <p></p>
        : 
          <button onClick={showHideDetails} className="show-hide__button" aria-label="Show details">Show Details</button>
        }
      </div>
    </li>
  );
};

export default Event;