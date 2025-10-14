
import React, { useState } from 'react';
import Input from '../components/inputs/Input';
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import { FiUser, FiLock, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { GiPartyPopper } from 'react-icons/gi';

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
  onBackToHome: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBackToHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await onLogin(username, password);
      
      if (!success) {
        setError('Usuário ou senha incorretos');
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-blue-900 via-blue-500 via-70%">
      <div className="relative w-full max-w-md bg-white/15 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/30">
        {/* Botão Voltar */}
        <SecondaryButton
          onClick={onBackToHome}
          className="absolute top-5 left-5 bg-transparent border-none text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer text-xl p-2 rounded-full transition-all duration-300"
          type="button"
        >
          <FiArrowLeft />
        </SecondaryButton>

        {/* Header */}
        <div className="text-center mb-8 pt-5">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GiPartyPopper size={40} className="text-white drop-shadow-lg" />
            <h1 className="text-3xl font-bold text-white m-0 drop-shadow-lg">WhatsFest</h1>
          </div>
          <p className="text-white/80 text-base m-0 drop-shadow">Área Administrativa</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Campo Username */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white mb-2 drop-shadow">Usuário</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                required
                className="w-full pl-11 pr-3 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-purple-500 transition-colors outline-none bg-white/80"
                style={{paddingLeft: '2.75rem'}}
              />
            </div>
          </div>

          {/* Campo Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white mb-2 drop-shadow">Senha</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-purple-500 transition-colors outline-none bg-white/80"
                style={{paddingLeft: '2.75rem', paddingRight: '2.75rem'}}
              />
              <SecondaryButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 hover:text-gray-700 cursor-pointer text-lg p-1"
                style={{ minWidth: 0 }}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </SecondaryButton>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 py-3 px-4 rounded-lg mb-6 text-sm text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <PrimaryButton
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
              ${isLoading
                ? 'bg-gray-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-br from-amber-400 to-orange-400 text-white hover:-translate-y-0.5 hover:shadow-2xl cursor-pointer'}`}
          >
            {isLoading ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-transparent border-t-white rounded-full animate-spin"></span>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </PrimaryButton>
        </form>
      </div>

      {/* Animations handled by Tailwind (animate-spin) */}
    </div>
  );
};

export default LoginPage;