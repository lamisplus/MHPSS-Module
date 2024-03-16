// RadioGroupWrapper.jsx
import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const RadioGroupWrapper = ({ name, label, legend, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <FormControl>
      <FormLabel component="legend">{legend}</FormLabel>
      <RadioGroup {...field} onChange={handleChange} {...otherProps} row>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupWrapper;
