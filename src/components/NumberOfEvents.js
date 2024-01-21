import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {

  const handleChange = (e) => {
    setCurrentNOE(e.target.value);
  };

  return (
    <div id="number-of-events">
      <input
        type="text"
        defaultValue="32"
        onChange={handleChange}
      />
    </div>
  )
};

export default NumberOfEvents;