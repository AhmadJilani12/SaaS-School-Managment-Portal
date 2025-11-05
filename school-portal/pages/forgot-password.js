import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Auth.module.css';
import Head from 'next/head';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      // Here you would implement your password reset logic
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.logo}>
            School Portal
          </div>

          <h1 className={styles.title}>Forgot Password</h1>
          <p className={styles.subtitle}>
            Enter your email address to receive a password reset link
          </p>

          {success ? (
            <div className={styles.success}>
              Reset link has been sent to your email address.
              Redirecting to login page...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button 
                type="submit" 
                className={styles.button}
                disabled={!email || loading}
              >
                {loading ? <div className={styles.loading}></div> : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className={styles.footer}>
            <p className={styles.switchText}>
              Remember your password?
              <Link href="/login" className={styles.switchLink}>
                Sign in
              </Link>
            </p>
            <div className={styles.creditsWrapper}>
              <div className={styles.credits}>
                <div>Designed & Created by</div>
                <div className={styles.developer}>Ahmad Jilani</div>
                <div className={styles.designation}>Software Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}