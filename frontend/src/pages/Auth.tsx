import { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-gray-800 rounded-xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
            {isLogin ? 'Bienvenue' : 'Créer un compte'}
        </h2>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 hover:text-purple-300"
          >
            {isLogin ? "Vous n'avez pas de compte ? Inscrivez-vous" : 'Vous avez déjà un compte ? Connectez-vous'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;