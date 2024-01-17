import { useState } from "react";

const NumberOfEvents = () => {
  const [number, setNumber] = useState("32");

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div id="number-of-events">
      <input
        type="text"
        value={number}
        onChange={handleChange}
      />
    </div>
  )
};

export default NumberOfEvents;