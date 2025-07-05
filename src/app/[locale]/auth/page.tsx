'use client';

import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import styles from './auth.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  username: string;
  email?: string;
  password: string;
}

export default function AuthPage() {
  const { dictionary } = useLanguage();
  const { auth } = dictionary;

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });

  const ErrorMessage = () => error && (
    <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded">
      {error}
    </div>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent, type: 'signin' | 'signup') => {
    e.preventDefault();
    setError(null);
    
    try {
      if (type === 'signin') {
        const result = await signIn('credentials', {
          email: formData.username, // Using username field for email
          password: formData.password,
          redirect: false
        });

        if (result?.error) {
          setError(result.error);
        } else if (result?.ok) {
          window.location.href = '/';
        }
      } else {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            username: formData.username
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error);
        } else {
          // Auto sign in after successful signup
          const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            callbackUrl: '/'
          });

          if (result?.error) {
            setError(result.error);
          }
        }
      }
    } catch (error) {
      setError(`${type === 'signin' ? 'Sign in' : 'Sign up'} error: ${error}`);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      setError(`Social login error: ${error}`);
    }
  };

  return (
    <div className={`${styles.container} ${isSignUpMode ? styles.signUpMode : ''}`}>
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          <form 
            className={styles.signInForm} 
            onSubmit={(e) => handleSubmit(e, 'signin')}
          >
            <h2 className={styles.title}>{auth.signIn.title}</h2>
            <div className={styles.inputField}>
              <i className={`fas fa-user ${styles.icon}`} />
              <input
                className={styles.input}
                type="text"
                name="username"
                placeholder={auth.signIn.username}
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <i className={`fas fa-lock ${styles.icon}`} />
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder={auth.signIn.password}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <ErrorMessage />

            <button type="submit" className={styles.btn}>
              {auth.signIn.button}
            </button>
            <p className={styles.socialText}>{auth.signIn.socialText}</p>
            <div className={styles.socialMedia}>
              <button 
                type="button"
                onClick={() => handleSocialLogin('linkedin')}
                className={styles.socialIcon}
                aria-label={auth.social.linkedin}
              >
                <i className="fab fa-linkedin-in" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className={styles.socialIcon}
                aria-label={auth.social.facebook}
              >
                <i className="fab fa-facebook-f" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                className={styles.socialIcon}
                aria-label={auth.social.google}
              >
                <i className="fab fa-google" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('twitter')}
                className={styles.socialIcon}
                aria-label={auth.social.twitter}
              >
                <i className="fab fa-twitter" />
              </button>
            </div>
          </form>

          <form 
            className={styles.signUpForm} 
            onSubmit={(e) => handleSubmit(e, 'signup')}
          >
            <h2 className={styles.title}>{auth.signUp.title}</h2>
            <div className={styles.inputField}>
              <i className={`fas fa-user ${styles.icon}`} />
              <input
                className={styles.input}
                type="text"
                name="username"
                placeholder={auth.signUp.username}
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <i className={`fas fa-envelope ${styles.icon}`} />
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder={auth.signUp.email}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <i className={`fas fa-lock ${styles.icon}`} />
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder={auth.signUp.password}
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
              />
            </div>

            <ErrorMessage />
            
            <button type="submit" className={styles.btn}>
              {auth.signUp.button}
            </button>
            <p className={styles.socialText}>{auth.signUp.socialText}</p>
            <div className={styles.socialMedia}>
              <button 
                type="button"
                onClick={() => handleSocialLogin('linkedin')}
                className={styles.socialIcon}
                aria-label={auth.social.linkedin}
              >
                <i className="fab fa-linkedin-in" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className={styles.socialIcon}
                aria-label={auth.social.facebook}
              >
                <i className="fab fa-facebook-f" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                className={styles.socialIcon}
                aria-label={auth.social.google}
              >
                <i className="fab fa-google" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('twitter')}
                className={styles.socialIcon}
                aria-label={auth.social.twitter}
              >
                <i className="fab fa-twitter" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.content}>
            <h3 className={styles.heading}>{auth.panels.left.title}</h3>
            <p className={styles.paragraph}>
              {auth.panels.left.description}
            </p>
            <button 
              type="button"
              className={styles.transparentBtn}
              onClick={() => setIsSignUpMode(true)}
            >
              {auth.panels.left.button}
            </button>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src="/img/log.svg"
                alt="Login illustration"
                width={500}
                height={500}
                className={styles.image}
                priority
              />
            </div>
          </div>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.content}>
            <h3 className={styles.heading}>{auth.panels.right.title}</h3>
            <p className={styles.paragraph}>
              {auth.panels.right.description}
            </p>
            <button 
              type="button"
              className={styles.transparentBtn}
              onClick={() => setIsSignUpMode(false)}
            >
              {auth.panels.right.button}
            </button>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src="/img/register.svg"
                alt="Register illustration"
                width={800}
                height={800}
                className={styles.image}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}