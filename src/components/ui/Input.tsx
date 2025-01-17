import { TextField, TextFieldProps } from '@mui/material';

export const Input = (props: TextFieldProps) => {
  return <TextField fullWidth variant="outlined" {...props} />;
};