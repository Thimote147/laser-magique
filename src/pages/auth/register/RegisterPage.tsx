import { Container, Paper, Box } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from './RegisterForm';

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm"  sx={{ px: { xs: 2, sm: 3 }, backgroundColor: 'background.form'}}>
      <Paper elevation={3} sx={{ mt: { xs: 4, sm: 8 }, p: { xs: 3, sm: 4 } }}>
        <RegisterForm />
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Vous avez déjà un compte ?
          </Typography>
          <Button
            onClick={() => navigate('/auth')}
            variant="outlined"
            fullWidth
          >
            Se connecter
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};