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
                width={500}
                height={500}
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