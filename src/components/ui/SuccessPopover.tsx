import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Button } from './Button';
import { CheckCircle } from 'lucide-react';

interface SuccessPopoverProps {
  open: boolean;
  onClose: () => void;
}

export const SuccessPopover = ({ open, onClose }: SuccessPopoverProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
        <CheckCircle size={48} color="#4CAF50" style={{ marginBottom: '16px' }} />
        <Typography variant="h5">Registration Successful!</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography align="center" color="text.secondary">
          Your account has been created successfully. Please check your email to verify your account before signing in.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button variant="contained" onClick={onClose} sx={{ minWidth: 120 }}>
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
};