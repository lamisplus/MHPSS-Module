import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#014D88 !important', // Add !important to override default styles
      },
    },
  },
}));

const TextfieldWrapper = ({
  name,
  ...otherProps
}) => {
  const [field, mata] = useField(name);

  const classes = useStyles();

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return (
    <TextField
    className={classes.textField}
    {...configTextfield} />
  );
};

export default TextfieldWrapper;