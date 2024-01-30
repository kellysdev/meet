const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

  const handleChange = (e) => {
    setCurrentNOE(e.target.value);
    if (isNaN(e.target.value) || e.target.value <= 0) {
      setErrorAlert("Please input a whole number for the number of events to display.");
    } else {
      setCurrentNOE(e.target.value);
      setErrorAlert("");
    }
  };

  return (
    <div id="number-of-events">
      <label>Show me</label>
      <input
        className="NOE-input"
        type="number"
        defaultValue={32}
        onChange={handleChange}
      /> events
    </div>
  )
};

export default NumberOfEvents;