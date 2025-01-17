import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth.ts';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(firstname, lastname, phone, email, password);
      navigate('/');
    } catch (err) {
      setError('Échec de la création du compte. Veuillez vérifier vos informations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      
      <Typography component="h1" variant="h5" gutterBottom>
        Créez votre compte
      </Typography>

      <Input
        label="Prénom"
        type='text'
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
      />

      <Input
        label="Nom"
        type='text'
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />

      <Input
        label="Numéro de téléphone"
        type='tel'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        fullWidth
      >
        {loading ? 'Création en cours...' : 'Créer un compte'}
      </Button>
    </Box>
  );
};