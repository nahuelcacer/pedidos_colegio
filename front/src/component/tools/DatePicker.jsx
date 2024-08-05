import React, { useState } from 'react';

const DatePicker = ({ setFecha }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleChange = (event) => {
    const newDate = event.target.value;
    setFecha(newDate)
  };

  return (
    <div>
      <input
        id="datePicker"
        type="date"
        value={selectedDate}
        onChange={handleChange}
      />
    </div>
  );
};

export default DatePicker;
