'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function VerifyCodePage() {
  const { locale } = useLanguage();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // Added username state
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  useEffect(() => {
    // Focus sur le premier input au chargement
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Récupérer l'email et le username des query params
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    const usernameParam = params.get('username');
    
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
    
    // Store the username in state
    if (usernameParam) {
      setUsername(decodeURIComponent(usernameParam));
    } else if (emailParam) {
      // Fallback: generate username from email if not provided
      const generatedUsername = decodeURIComponent(emailParam).split('@')[0];
      setUsername(generatedUsername);
    }
  }, []);

  // Timer pour le renvoi du code
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus sur l'input suivant
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const verificationCode = code.join('').trim();
      
      if (verificationCode.length !== 6) {
        setErrorMessage('Le code doit contenir 6 chiffres');
        setStatus('error');
        return;
      }

      // Add console logs for debugging
      console.log('Submitting verification:', {
        code: verificationCode,
        email: email,
        username: username
      });

      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: verificationCode,
          email: email,
          username: username // Include the username for verification
        }),
      });

      const data = await response.json();
      console.log('Verification response:', data);

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Code de vérification invalide');
      } else {
        setStatus('success');
        setTimeout(() => {
          router.push(`/${locale}/auth`);
        }, 2000);
      }
    } catch (err: unknown) {
      console.error('Verification error:', err);
      setStatus('error');
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Une erreur est survenue lors de la vérification');
      }
    }
  };

  const handleResendCode = async () => {
    try {
      setTimer(30);
      await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email,
          username: username // Include username for code resending
        }),
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Erreur lors de l'envoi du nouveau code");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center">
                <Mail className="w-10 h-10 text-blue-600" />
              </span>
            </div>
          </div>
          <div className="pt-24">
            <h1 className="text-2xl font-bold text-gray-900">
              Vérification de votre email
            </h1>
            <p className="mt-2 text-gray-600">
              Nous avons envoyé un code à {email || 'votre adresse email'}
            </p>
          </div>
        </div>

        {/* Formulaire de code */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 border-2 rounded-lg text-center text-2xl font-semibold text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            ))}
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || code.some(c => !c)}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all
              ${
                status === 'loading'
                  ? 'bg-blue-400 cursor-wait'
                  : status === 'success'
                  ? 'bg-green-500'
                  : code.some(c => !c)
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {status === 'loading' && <Loader className="w-5 h-5 animate-spin" />}
            {status === 'success' && <CheckCircle className="w-5 h-5" />}
            {status === 'loading'
              ? 'Vérification...'
              : status === 'success'
              ? 'Vérifié avec succès'
              : 'Vérifier'}
            {status === 'idle' && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Vous n&apos;avez pas reçu de code ?
          </p>
          <button
            onClick={handleResendCode}
            disabled={timer > 0}
            className={`text-sm font-medium ${
              timer > 0 ? 'text-gray-400' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {timer > 0 ? `Renvoyer le code (${timer}s)` : 'Renvoyer le code'}
          </button>
        </div>
      </div>
    </div>
  );
}