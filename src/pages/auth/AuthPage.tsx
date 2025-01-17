import { Container, Paper, Box } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { LoginForm } from './login/LoginForm';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm"  sx={{ px: { xs: 2, sm: 3 }, backgroundColor: 'background.form'}}>
      <Paper elevation={3} sx={{ mt: { xs: 4, sm: 8 }, p: { xs: 3, sm: 4 } }}>
        <LoginForm />
        <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Vous n'avez pas de compte ?
            </Typography>
          <Button
            onClick={() => navigate('/register')}
            variant="outlined"
            fullWidth
          >
            Créer un compte
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};