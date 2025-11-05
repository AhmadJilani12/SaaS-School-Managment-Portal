'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Auth.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your password reset logic here
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.headerSection}>
          <Image 
            src="/logo.png"
            alt="School Portal Logo"
            width={50}
            height={50}
            className={styles.logo}
          />
          <h1 className={styles.title}>Forgot Password?</h1>
          <p className={styles.subtitle}>
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.button}>
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className={styles.successMessage}>
            <svg
              className={styles.successIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2>Check Your Email</h2>
            <p>We&apos;ve sent a password reset link to your email address.</p>
          </div>
        )}

        <div className={styles.footer}>
          <Link href="/login">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}