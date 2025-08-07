'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleSignIn = async (providerId: string) => {
    setIsLoading(providerId);
    try {
      await signIn(providerId, { callbackUrl: '/' });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍔</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">FreshBite</h1>
          </div>
          <CardTitle className="text-xl">Welcome Back!</CardTitle>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {providers && (
            <div className="space-y-3">
              {Object.values(providers).map((provider: any) => {
                if (provider.id === 'google') {
                  return (
                    <Button
                      key={provider.name}
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2 py-3 hover:bg-red-50 hover:border-red-300"
                      onClick={() => handleSignIn(provider.id)}
                      disabled={isLoading === provider.id}
                    >
                      {isLoading === provider.id ? (
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      )}
                      <span>Continue with Google</span>
                    </Button>
                  );
                }

                if (provider.id === 'facebook') {
                  return (
                    <Button
                      key={provider.name}
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2 py-3 hover:bg-blue-50 hover:border-blue-300"
                      onClick={() => handleSignIn(provider.id)}
                      disabled={isLoading === provider.id}
                    >
                      {isLoading === provider.id ? (
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      )}
                      <span>Continue with Facebook</span>
                    </Button>
                  );
                }

                return null;
              })}
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          <Button variant="outline" className="w-full py-3">
            Sign in with Email
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-orange-600 hover:text-orange-700 font-medium">
              Sign up
            </Link>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Back to FreshBite
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}