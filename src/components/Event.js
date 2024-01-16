import { useState } from "react";

const Event = ({ events }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [ariaExpanded, setAriaExpanded] = useState(false);

  const showHideDetails = (event) => {
    if(showDetails === false) {
      setShowDetails(true);
      setAriaExpanded(true);
    } else {
      setShowDetails(false);
      setAriaExpanded(false);
    }
  };

  return (
    <li aria-expanded={ariaExpanded}>
        {showDetails ? 
          <div></div>
        : 
          <div>
            <button onClick={showHideDetails} className="show-hide__button" aria-label="Show details">Show Details</button>
          </div>          
        }
    </li>
  );
};

export default Event;