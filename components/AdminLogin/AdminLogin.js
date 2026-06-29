'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/page.module.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter the username or phone number.');
      return;
    }
    if (!password) {
      setError('Please enter the password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials. Access denied.');
      }
    } catch (err) {
      console.error('Login request failed:', err);
      setError('A connection error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.glassCard}>
        <div className={styles.logoSection}>
          <img src="/logo.png" alt="National Packers & Movers Logo" className={styles.logo} />
          <h1 className={styles.brandTitle}>National Packers & Movers</h1>
          <p className={styles.subtitle}>Administrative Portal</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Username or Phone Number</label>
            <input
              type="text"
              id="username"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin or 9835168368"
              disabled={loading}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Admin Password</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={loading}
              required
            />
          </div>

          {error && <div className={styles.errorAlert}>⚠️ {error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span className={styles.spinner}></span>
            ) : (
              'Unlock Dashboard'
            )}
          </button>
        </form>

        <div className={styles.cardFooter}>
          <a href="/" className={styles.backLink}>← Return to Homepage</a>
        </div>
      </div>
    </div>
  );
}

