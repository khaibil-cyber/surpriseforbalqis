import { useState } from 'react';
import { useBirthdayStore } from '../store/birthdayStore';

const GIFT_MESSAGE = "hadiah ulang tahunmu adalah having me as your friend... don't lose it 💖";

export default function GiftUnwrap() {
  const { giftOpened, setGiftOpened } = useBirthdayStore();
  const [unwrapping, setUnwrapping] = useState(false);
  const [shakePhase, setShakePhase] = useState(0);

  const handleShake = () => {
    if (unwrapping) return;

    setShakePhase((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setUnwrapping(true);
        setTimeout(() => {
          setGiftOpened(true);
        }, 1200);
        return next;
      }
      return next;
    });
  };

  return (
    <div className="text-center">
      <h3 className="font-dancing text-xl md:text-2xl text-[var(--color-deep-purple)] mb-6">
        🎁 Hadiah Virtual
      </h3>

      {!giftOpened ? (
        <div className="relative">
          <div
            className="relative inline-block cursor-pointer mx-auto"
            onClick={handleShake}
            style={{
              animation: shakePhase > 0
                ? `sway 0.3s ease-in-out ${shakePhase >= 5 ? '1' : shakePhase * 0.1}s`
                : 'float 3s ease-in-out infinite',
            }}
          >
            {/* Box body */}
            <div
              className="relative w-40 h-36 md:w-52 md:h-44 rounded-2xl mx-auto"
              style={{
                background: 'linear-gradient(135deg, #E88FA0 0%, #FFB6C1 50%, #E88FA0 100%)',
                boxShadow: '0 8px 24px rgba(232,143,160,0.3)',
                animation: unwrapping ? 'unwrapping 1.2s ease-in forwards' : 'none',
              }}
            >
              {/* Ribbon vertical */}
              <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-gradient-to-b from-[var(--color-gold)] to-[#B8860B] opacity-80" />
              {/* Ribbon horizontal */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full h-6 bg-gradient-to-r from-[var(--color-gold)] to-[#B8860B] opacity-80" />

              {/* Bow */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-0.5">
                <div className="w-8 h-6 rounded-full bg-[var(--color-gold)] -rotate-12 opacity-90" />
                <div className="w-8 h-6 rounded-full bg-[var(--color-gold)] rotate-12 opacity-90" />
              </div>
            </div>

            {shakePhase === 0 && (
              <p className="font-body text-sm text-[var(--color-rose)] mt-4 animate-pulse">
                👆 Ketuk untuk menggoyang
              </p>
            )}

            {shakePhase > 0 && shakePhase < 5 && (
              <p className="font-dancing text-sm text-[var(--color-gold)] mt-4">
                Lebih kuat! {'✨'.repeat(shakePhase)}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div style={{ animation: 'bounce-in 0.8s ease-out forwards' }}>
          <div className="glass-card p-8 max-w-md mx-auto">
            {/* Gift Photo */}
            <div className="mb-6">
              <div className="relative inline-block">
                <img
                  src="/gift-photo.jpg"
                  alt="Hadiah untukmu 🎁"
                  className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl mx-auto shadow-lg border-4 border-[var(--color-gold)]"
                  style={{ animation: 'float 3s ease-in-out infinite' }}
                />
                <div className="absolute -top-3 -right-3 text-3xl" style={{ animation: 'sparkle 1.5s ease-in-out infinite' }}>
                  ✨
                </div>
                <div className="absolute -bottom-3 -left-3 text-2xl" style={{ animation: 'sparkle 1.5s ease-in-out infinite 0.5s' }}>
                  💖
                </div>
              </div>
            </div>

            {/* Gift message */}
            <div className="text-5xl mb-4" style={{ animation: 'float 2s ease-in-out infinite' }}>
              🎁
            </div>
            <p className="font-pacifico text-lg md:text-xl text-[var(--color-deep-purple)] leading-relaxed italic">
              "{GIFT_MESSAGE}"
            </p>

            <div className="mt-4">
              <p className="font-dancing text-base md:text-lg text-[var(--color-deep-purple)] leading-relaxed">
                Makasih ya udah mau jadi bespren Nabil. Semoga umur 16 ini penuh kebahagiaan. Kalau suatu hari kita udah sibuk masing masing, inget kink Nabil pernah effort berhari hari bikin ini.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-2 text-2xl">
              {['🎉', '🎊', '✨', '🎉', '🎊'].map((s, i) => (
                <span key={i} style={{ animation: `sparkle 1.5s ease-in-out infinite ${i * 0.2}s` }}>
                  {s}
                </span>
              ))}
            </div>
            <button
              onClick={() => {
                setGiftOpened(false);
                fit();
              }}
              className="mt-6 px-6 py-2 text-sm font-body text-[var(--color-rose)] hover:text-[var(--color-gold)] transition-colors underline underline-offset-4"
            >
              🔄 Buka Hadiah Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
