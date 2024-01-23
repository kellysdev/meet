const NumberOfEvents = ({ setCurrentNOE }) => {

  const handleChange = (e) => {
    setCurrentNOE(e.target.value);
  };

  return (
    <div id="number-of-events">
      <label>Show me</label>
      <input
        type="number"
        defaultValue={32}
        onChange={handleChange}
      /> events
    </div>
  )
};

export default NumberOfEvents;