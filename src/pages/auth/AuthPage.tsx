import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './login/LoginForm';

export const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container maxWidth="sm" className="bg-gray-800 rounded-2xl p-8 shadow-xl">
        <LoginForm />
        
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Vous n'avez pas de compte ?
          </p>
          <button
            onClick={() => navigate('/register')}
            className="mt-3 w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Créer un compte
          </button>
        </div>
      </Container>
    </div>
  );
};