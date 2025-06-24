import { useState } from 'react';
import {useAuth}  from '../providers/AuthProvider';
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome to the admin');
      router.push('/');
    } catch {
      toast.error('Login failed');
    }
  };

  return (
      <section className="flex justify-center items-center w-full py-80">
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full p-6">
              <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                      Email
                  </label>
                  <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary p-2"
                      placeholder="Enter your email"
                  />
              </div>

              <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                  </label>
                  <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary p-2"
                      placeholder="Enter your password"
                  />
              </div>

              <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Sign In
              </button>
          </form>
      </section>

  );
} 