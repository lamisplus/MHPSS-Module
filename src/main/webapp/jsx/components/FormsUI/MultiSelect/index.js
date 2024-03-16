import React from 'react';
import { TextField, MenuItem, InputLabel, Typography, makeStyles, FormControl } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import SelectMui from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";


const useStyles = makeStyles((theme) => ({
  outlinedInput: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#014D88 !important', // Add !important to override default styles
    },
  },
}));


const MultiSelectWrapper = ({
  name,
  options,
  label,
  id,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const selectedValues = Array.isArray(field.value) ? field.value : [];

  const classes = useStyles();


  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    size: 'small',
    onChange: handleChange,
    value: selectedValues, // Ensure that the value is always an array
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <>
      <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <SelectMui
        className={classes.outlinedInput}
        labelId={id}
        label = {label}
        multiple
        renderValue={(selected) => selected.join(", ")}
        {...configSelect}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            <Checkbox checked={selectedValues.includes(opt.value)} />
            <ListItemText primary={opt.label} />
          </MenuItem>
        ))}
      </SelectMui>
      {meta.touched && meta.error && (
        <Typography color="error">{meta.error}</Typography>
      )}
      </FormControl>
    </>
  );
};

export default MultiSelectWrapper;
