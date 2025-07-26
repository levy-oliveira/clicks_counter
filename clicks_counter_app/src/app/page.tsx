'use client';

import { useState } from 'react';

export default function Home() {
  // Set body background to black
  if (typeof window !== 'undefined') {
    document.body.style.background = '#000000';
  }
  const [input, setInput] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/counter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: input }),
      });

      const data = await res.json();

      if (res.ok) {
        setCount(data.count);
        setSubmittedValue(input); // só atualiza ao enviar
        setError('');
      } else {
        setError(data.error || 'Erro ao processar');
        setCount(null);
      }
    } catch (e) {
      setError('Erro de rede');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Contador de Cliques</h1>
      <p style={styles.subtitle}>Digite um valor e veja quantas vezes ele já foi enviado.</p>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Digite um valor"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={loading ? styles.buttonDisabled : styles.button}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>

      {count !== null && (
        <div className="result">
          O valor <strong>{submittedValue}</strong> foi enviado <strong>{count}</strong> vez(es).
        </div>
      )}
      {error && <p style={styles.error}>{error}</p>}
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 500,
    margin: '60px auto',
    padding: 24,
    borderRadius: 12,
    background: '#ffffff',
    textAlign: 'center',
    fontFamily: 'system-ui, sans-serif',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 28,
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  form: {
    color: '#000000',
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #d1d5db',
    flexGrow: 1,
    minWidth: 0,
  },
  button: {
    padding: '10px 18px',
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#2563eb',
    color: 'white',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  buttonDisabled: {
    padding: '10px 18px',
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#93c5fd',
    color: 'white',
    cursor: 'not-allowed',
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    color: '#10b981',
  },
  error: {
    marginTop: 16,
    color: '#ef4444',
    fontWeight: 'bold',
  },
};
