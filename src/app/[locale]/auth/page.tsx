"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import styles from "./auth.module.css";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  name?: string;
}

export default function AuthPage() {
  const { dictionary, locale } = useLanguage();
  const { auth } = dictionary;
  const router = useRouter();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });

  const ErrorMessage = () =>
    error && (
      <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded">
        {error}
      </div>
    );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (
    e: React.FormEvent,
    type: "signin" | "signup"
  ) => {
    e.preventDefault();
    setError(null);

    try {
      if (type === "signin") {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else if (result?.ok) {
          router.push("/");
        }
      } else {
        try {
          const username = formData.email.split("@")[0];

          const response = await fetch("/api/auth/cognito/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email: formData.email,
              password: formData.password,
              name: formData.name,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            setError(data.error);
          } else {
            // Modification ici pour la redirection
            // Updated code
            router.push(
              `/${locale}/verify?email=${encodeURIComponent(
                formData.email
              )}&username=${encodeURIComponent(username)}`
            );
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(`Registration error: ${err.message}`);
          } else {
            setError("An unexpected error occurred during registration");
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Authentication error: ${err.message}`);
      } else {
        setError("An unexpected error occurred during authentication");
      }
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      setError(`Social login error: ${error}`);
    }
  };

  return (
    <div
      className={`${styles.container} ${isSignUpMode ? styles.signUpMode : ""}`}
    >
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          {/* Sign In Form */}
          <form
            className={styles.signInForm}
            onSubmit={(e) => handleSubmit(e, "signin")}
          >
            <h2 className={styles.title}>{auth.signIn.title}</h2>
            <div className={styles.inputField}>
              <i className={`fas fa-envelope ${styles.icon}`} />
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder={auth.signIn.email}
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
                onClick={() => handleSocialLogin("linkedin")}
                className={styles.socialIcon}
                aria-label={auth.social.linkedin}
              >
                <i className="fab fa-linkedin-in" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                className={styles.socialIcon}
                aria-label={auth.social.facebook}
              >
                <i className="fab fa-facebook-f" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                className={styles.socialIcon}
                aria-label={auth.social.google}
              >
                <i className="fab fa-google" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("twitter")}
                className={styles.socialIcon}
                aria-label={auth.social.twitter}
              >
                <i className="fab fa-twitter" />
              </button>
            </div>
          </form>

          {/* Sign Up Form */}
          <form
            className={styles.signUpForm}
            onSubmit={(e) => handleSubmit(e, "signup")}
          >
            <h2 className={styles.title}>{auth.signUp.title}</h2>
            <div className={styles.inputField}>
              <i className={`fas fa-user ${styles.icon}`} />
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder={auth.signUp.name}
                value={formData.name}
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
                onClick={() => handleSocialLogin("linkedin")}
                className={styles.socialIcon}
                aria-label={auth.social.linkedin}
              >
                <i className="fab fa-linkedin-in" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                className={styles.socialIcon}
                aria-label={auth.social.facebook}
              >
                <i className="fab fa-facebook-f" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                className={styles.socialIcon}
                aria-label={auth.social.google}
              >
                <i className="fab fa-google" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("twitter")}
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
            <p className={styles.paragraph}>{auth.panels.left.description}</p>
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
            <p className={styles.paragraph}>{auth.panels.right.description}</p>
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
