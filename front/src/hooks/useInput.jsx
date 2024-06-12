import { useState } from 'react';

const useInput = (e) => {
  const [values, setValue] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setValue({
      ...values,
      [name]: value
    })
  };

  return {
    values,
    onChange: handleChange
  };
};

export default useInput;
