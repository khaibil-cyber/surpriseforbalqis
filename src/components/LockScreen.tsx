import { useState, useCallback, useEffect } from 'react';

const CORRECT_PASSWORD = '010710';
const PIN_LENGTH = 6;

export default function LockScreen({ onUnlocked }: { onUnlocked: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleKeyPress = useCallback((digit: string) => {
    if (pin.length >= PIN_LENGTH || success) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError(false);
    if (newPin.length === PIN_LENGTH) {
      if (newPin === CORRECT_PASSWORD) {
        setSuccess(true);
        setTimeout(() => onUnlocked(), 800);
      } else {
        setShaking(true);
        setTimeout(() => { setError(true); setShaking(false); setPin(''); }, 500);
      }
    }
  }, [pin, success, onUnlocked]);

  const handleDelete = useCallback(() => {
    if (success) return;
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  }, [success]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleKeyPress(e.key);
      else if (e.key === 'Backspace') handleDelete();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, handleDelete]);

  const numpad = [['1','2','3'],['4','5','6'],['7','8','9'],['','0','del']];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF0E8 25%, #F8F0FF 50%, #F0F8FF 75%, #FFF8F0 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 20s ease infinite',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🎈', '🎀', '🌸', '⭐', '💫', '🦋', '🌟', '🌺'].map((d, i) => (
          <div key={i} className="absolute text-2xl md:text-3xl opacity-15"
            style={{ left: `${10 + (i * 12) % 80}%`, top: `${5 + (i * 17) % 85}%`, animation: `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.5}s` }}
          >{d}</div>
        ))}
      </div>

      <div className="mb-6 text-6xl md:text-7xl" style={{ animation: 'float 3s ease-in-out infinite', filter: success ? 'none' : 'drop-shadow(0 4px 12px rgba(212,168,67,0.3))' }}>
        {success ? '🔓' : '🔐'}
      </div>

      <h1 className="font-elegant text-3xl sm:text-4xl md:text-5xl text-gradient-gold font-semibold mb-2 text-center" style={{ animation: 'bounce-in 0.8s ease-out forwards' }}>
        Masukkan Password
      </h1>
      <p className="font-body text-sm text-[var(--color-warm-brown)] opacity-70 mb-8">
        Ketuk angka untuk memasukkan PIN
      </p>

      <div className={`flex gap-3 md:gap-4 mb-4 ${shaking ? 'shake-animation' : ''}`}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <div key={i} className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            i < pin.length
              ? success ? 'border-[var(--color-mint)] bg-[var(--color-mint)]/20 scale-110' : 'border-[var(--color-gold)] bg-[var(--color-gold)]/15'
              : error ? 'border-[var(--color-coral)] bg-[var(--color-coral)]/10' : 'border-[var(--color-lavender)]/50 bg-white/40'
          }`}
            style={{ animation: i < pin.length && success ? `bounce-in 0.3s ease-out ${i * 0.05}s forwards` : 'none' }}
          >
            {i < pin.length && (
              <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${success ? 'bg-[var(--color-mint)]' : 'bg-[var(--color-deep-purple)]'}`}
                style={{ animation: i < pin.length ? 'bounce-in 0.2s ease-out' : 'none' }}
              />
            )}
          </div>
        ))}
      </div>

      <p className="font-dancing text-base md:text-lg text-[var(--color-deep-purple)] mb-4 opacity-60 italic">
        💡 Hint: Your Special Day
      </p>

      {error && <p className="font-body text-sm text-[var(--color-coral)] mb-4 animate-pulse">❌ Password salah, coba lagi!</p>}
      {success && <p className="font-body text-sm text-[var(--color-mint)] mb-4" style={{ animation: 'bounce-in 0.5s ease-out forwards' }}>✅ Benar! Selamat datang...</p>}

      <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-xs mx-auto">
        {numpad.flat().map((key, i) => {
          if (key === '') return <div key={i} />;
          if (key === 'del') return (
            <button key={i} onClick={handleDelete} className="w-16 h-14 md:w-20 md:h-16 rounded-2xl flex items-center justify-center font-body text-lg text-[var(--color-rose)] hover:bg-[var(--color-rose)]/10 active:scale-95 transition-all duration-150">⌫</button>
          );
          return (
            <button key={i} onClick={() => handleKeyPress(key)} disabled={success}
              className="w-16 h-14 md:w-20 md:h-16 rounded-2xl flex items-center justify-center font-body text-2xl font-semibold text-[var(--color-deep-purple)] hover:bg-white/60 active:scale-95 transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >{key}</button>
          );
        })}
      </div>
    </div>
  );
}
