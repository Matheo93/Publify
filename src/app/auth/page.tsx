// src/app/auth/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import styles from './auth.module.css';

interface FormData {
  username: string;
  email?: string;
  password: string;
}

export default function AuthPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent, type: 'signin' | 'signup') => {
    e.preventDefault();
    if (type === 'signin') {
      try {
        await signIn('credentials', {
          username: formData.username,
          password: formData.password,
          callbackUrl: '/'
        });
      } catch (error) {
        console.error('Sign in error:', error);
      }
    } else {
      console.log('Sign up:', formData);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error('Social login error:', error);
    }
  };

  return (
    <div className={`${styles.container} ${isSignUpMode ? styles.signUpMode : ''}`}>
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          {/* Formulaire de connexion */}
          <form 
            className={styles.signInForm} 
            onSubmit={(e) => handleSubmit(e, 'signin')}
          >
            <h2 className={styles.title}>Sign in</h2>
            <div className={styles.inputField}>
              <i className={`fas fa-user ${styles.icon}`} />
              <input
                className={styles.input}
                type="text"
                name="username"
                placeholder="Username"
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
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className={styles.btn}>
              Sign in
            </button>
            <p className={styles.socialText}>Or Sign in with social platforms</p>
            <div className={styles.socialMedia}>
              <button 
                type="button"
                onClick={() => handleSocialLogin('linkedin')}
                className={styles.socialIcon}
                aria-label="Sign in with LinkedIn"
              >
                <i className="fab fa-linkedin-in" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className={styles.socialIcon}
                aria-label="Sign in with Facebook"
              >
                <i className="fab fa-facebook-f" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                className={styles.socialIcon}
                aria-label="Sign in with Google"
              >
                <i className="fab fa-google" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('twitter')}
                className={styles.socialIcon}
                aria-label="Sign in with Twitter"
              >
                <i className="fab fa-twitter" />
              </button>
            </div>
          </form>

          {/* Formulaire d'inscription */}
          <form 
            className={styles.signUpForm} 
            onSubmit={(e) => handleSubmit(e, 'signup')}
          >
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles.inputField}>
              <i className={`fas fa-user ${styles.icon}`} />
              <input
                className={styles.input}
                type="text"
                name="username"
                placeholder="Username"
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
                placeholder="Email"
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
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
              />
            </div>
            <button type="submit" className={styles.btn}>
              Sign up
            </button>
            <p className={styles.socialText}>Or Sign up with social platforms</p>
            <div className={styles.socialMedia}>
              <button 
                type="button"
                onClick={() => handleSocialLogin('linkedin')}
                className={styles.socialIcon}
                aria-label="Sign up with LinkedIn"
              >
                <i className="fab fa-linkedin-in" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className={styles.socialIcon}
                aria-label="Sign up with Facebook"
              >
                <i className="fab fa-facebook-f" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                className={styles.socialIcon}
                aria-label="Sign up with Google"
              >
                <i className="fab fa-google" />
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('twitter')}
                className={styles.socialIcon}
                aria-label="Sign up with Twitter"
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
            <h3 className={styles.heading}>New here ?</h3>
            <p className={styles.paragraph}>
              Join our community and start sharing your content across multiple platforms with ease!
            </p>
            <button 
              type="button"
              className={styles.transparentBtn}
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/img/log.svg"
              alt="login illustration"
              width={500}
              height={500}
              className={styles.image}
              priority
            />
          </div>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.content}>
            <h3 className={styles.heading}>One of us ?</h3>
            <p className={styles.paragraph}>
              Welcome back! Sign in to continue managing your social media presence.
            </p>
            <button 
              type="button"
              className={styles.transparentBtn}
              onClick={() => setIsSignUpMode(false)}
            >
              Sign in
            </button>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/img/register.svg"
              alt="register illustration"
              width={500}
              height={500}
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}