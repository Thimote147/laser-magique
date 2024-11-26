import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch('http://localhost:3010/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

      if (user && user.role === 'admin') {
        navigate('/gestion');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="firstname" className="block text-sm font-medium text-gray-300">
          Prénom
        </label>
        <input
          {...register('firstname')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="lastname" className="block text-sm font-medium text-gray-300">
          Nom
        </label>
        <input
          {...register('lastname')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
          Téléphone
        </label>
        <input
          {...register('phone')}
          type="tel"
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Mot de passe
        </label>
        <input
          {...register('password')}
          type="password"
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default RegisterForm;