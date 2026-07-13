'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { GoogleLoginButton } from './GoogleLoginButton';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect') ?? '/dashboard';
    router.push(redirect);
  };

  return (
    <div className="bg-dark-card border border-gray-700 rounded-lg p-9 max-w-md w-full">
      <h1 className="text-2xl font-extrabold uppercase mb-2">Přihlášení</h1>
      <p className="text-gray-400 text-sm mb-8">Přihlas se ke svému Greenbett účtu</p>

      {error && (
        <div className="bg-red/10 border border-red text-red px-4 py-3 rounded-sm mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[0.78rem] font-semibold uppercase tracking-wider text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-sm text-white font-montserrat focus:outline-none focus:border-green"
          />
        </div>
        <div>
          <label className="block text-[0.78rem] font-semibold uppercase tracking-wider text-gray-300 mb-2">
            Heslo
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-sm text-white font-montserrat focus:outline-none focus:border-green"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
          {loading ? 'Přihlašování...' : 'Přihlásit se'}
        </button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-700" />
        <span className="text-gray-400 text-xs uppercase">nebo</span>
        <div className="flex-1 h-px bg-gray-700" />
      </div>

      <GoogleLoginButton />

      <p className="text-center text-gray-400 text-sm mt-6">
        Nemáš účet?{' '}
        <Link href="/registrace" className="text-green no-underline hover:underline">
          Registruj se
        </Link>
      </p>
    </div>
  );
}
