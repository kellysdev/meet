import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {

  const handleChange = (e) => {
    setCurrentNOE(e.target.value);
  };

  return (
    <div id="number-of-events">
      <label for="NOE-input">Show me</label>
      <input
        type="number"
        name="NOE-input"
        defaultValue={32}
        onChange={handleChange}
      /> events
    </div>
  )
};

export default NumberOfEvents;