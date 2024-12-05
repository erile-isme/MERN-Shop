import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
