import { useState, useCallback, useEffect, useRef } from 'react';
import { useBirthdayStore } from '../store/birthdayStore';

export default function CandleBlow() {
  const { candleBlown, setCandleBlown } = useBirthdayStore();
  const [flameIntensity, setFlameIntensity] = useState(1);
  const [smokeParticles, setSmokeParticles] = useState<number[]>([]);
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const [blowing, setBlowing] = useState(false);
  const [breathLevel, setBreathLevel] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startBlowing = useCallback(() => {
    if (candleBlown) return;
    setBlowing(true);
    let intensity = 1;
    intervalRef.current = setInterval(() => {
      intensity -= 0.04;
      setFlameIntensity(Math.max(0, intensity));
      setBreathLevel(0.6 + Math.random() * 0.4);
      if (intensity <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCandleBlown(true);
      }
    }, 50);
  }, [candleBlown, setCandleBlown]);

  const stopBlowing = useCallback(() => {
    setBlowing(false);
    setBreathLevel(0);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    if (!candleBlown && flameIntensity > 0.1) {
      const regrow = setInterval(() => {
        setFlameIntensity((prev) => {
          const next = Math.min(1, prev + 0.05);
          if (next >= 1) clearInterval(regrow);
          return next;
        });
      }, 50);
    }
  }, [candleBlown, flameIntensity]);

  useEffect(() => {
    if (candleBlown) {
      setSmokeParticles(Array.from({ length: 8 }, (_, i) => i));
      setTimeout(() => setSurpriseRevealed(true), 2000);
    }
  }, [candleBlown]);

  useEffect(() => { return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, []);

  return (
    <div className="text-center">
      <h3 className="font-dancing text-xl md:text-2xl text-[var(--color-deep-purple)] mb-14 mt-4">Tiup Lilinnya! 🕯️</h3>
      <div className="relative inline-block mb-6">
        <div className="relative mx-auto" style={{ width: 60, height: 180 }}>
          {!candleBlown && flameIntensity > 0 && (
            <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 185 }}>
              <div style={{
                width: 20 * flameIntensity, height: 30 * flameIntensity,
                background: `radial-gradient(ellipse at center bottom, #FFD700 0%, #FF8C00 40%, #FF4500 70%, transparent 100%)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                animation: `candleFlicker ${0.3 + (1 - flameIntensity) * 0.5}s ease-in-out infinite`,
                opacity: flameIntensity,
                filter: `blur(${(1 - flameIntensity) * 2}px)`,
                boxShadow: `0 0 ${20 * flameIntensity}px ${10 * flameIntensity}px rgba(255,140,0,${0.5 * flameIntensity})`,
              }} />
            </div>
          )}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{
            width: 20, height: 150, borderRadius: '4px 4px 8px 8px',
            background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 50%, #FFB6C1 100%)',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.1)',
          }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{
            width: 40, height: 20, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD4E8 0%, #FFB6C1 100%)',
            boxShadow: '0 2px 8px rgba(232,143,160,0.3)',
          }} />
        </div>

        {candleBlown && smokeParticles.map((_, i) => (
          <div key={i} className="absolute left-1/2 -translate-x-1/2" style={{
            bottom: 185 + i * 10, width: 8, height: 8, borderRadius: '50%',
            background: 'rgba(200,200,200,0.6)',
            animation: `smoke 2s ease-out ${i * 0.2}s forwards`,
            transform: `translateX(${(Math.random() - 0.5) * 30}px)`,
          }} />
        ))}
      </div>

      {!candleBlown ? (
        <div>
          <p className="font-body text-sm text-[var(--color-warm-brown)] mb-4">
            {blowing ? '🔥 Terus tiup...' : 'Tekan dan tahan untuk meniup'}
          </p>
          <button
            onMouseDown={startBlowing} onMouseUp={stopBlowing} onMouseLeave={stopBlowing}
            onTouchStart={startBlowing} onTouchEnd={stopBlowing}
            className="px-8 py-3 rounded-full font-body font-semibold text-white transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, var(--color-peach), var(--color-rose))', boxShadow: '0 4px 16px rgba(244,169,125,0.4)' }}
          >
            💨 Tiup Lilin
          </button>
          <div className="mt-3 w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full rounded-full transition-all duration-100" style={{
              width: `${(1 - flameIntensity) * 100}%`,
              background: 'linear-gradient(90deg, var(--color-gold), var(--color-rose))',
            }} />
          </div>
        </div>
      ) : (
        <div style={{ animation: 'bounce-in 0.8s ease-out forwards' }}>
          {surpriseRevealed && (
            <div className="glass-card p-6 max-w-md mx-auto">
              <p className="font-dancing text-xl text-[var(--color-deep-purple)] mb-2">🎉 Yeay! Lilin sudah mati!</p>
              <p className="font-romantic text-lg text-[var(--color-deep-purple)]">Semoga semua doamu terkabul ya, Balqis! ✨</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
