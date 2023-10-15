import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({
  half,
  name,
  label,
  handleChange,
  autoFocus,
  type,
  handleShowPass,
}) => {
  return (
    <div>
      <Grid container>
        <TextField
          name={name}
          label={label}
          onChange={handleChange}
          fullWidth
          required
          variant='outlined'
          autoFocus={autoFocus}
          type={type}
          InputProps={
            name === 'password'
              ? {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleShowPass}>
                        {type === 'password' ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : null
          }
        />
      </Grid>
    </div>
  );
};

export default Input;
