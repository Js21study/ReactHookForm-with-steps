import React from 'react';
import Button from '@mui/material/Button';

export const ButtonComponent = ({ children, props }) => {
  return (
    <Button margin="normal" variant="contained" type="submit" color="primary" fullWidth {...props}>
      {children}
    </Button>
  );
};
