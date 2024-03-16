import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { useField } from 'formik';


const useStyles = makeStyles((theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#014D88 !important', // Add !important to override default styles
      },
    },
  },
}));

const DateTimePicker = ({
  name,
  shouldDisableDate,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    },
    inputProps: {
      max: otherProps.maxDate != undefined ? otherProps.maxDate.toISOString().split('T')[0] : new Date(),
      min: otherProps.minDate != undefined ? otherProps.minDate.toISOString().split('T')[0] : new Date(2000, 0, 1),  // Format maxDate for input
    },
    shouldDisableDate: shouldDisableDate

  };


  if(meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  const classes = useStyles();

  return (
    <TextField
      className={classes.textField}
      {...configDateTimePicker}
    />
  );
};

export default DateTimePicker;