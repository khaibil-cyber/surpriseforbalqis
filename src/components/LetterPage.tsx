import { useState } from 'react';

export default function LetterPage({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => onOpen(), 1000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center min-h-screen cursor-pointer"
      onClick={handleOpen}
      style={{
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF0E8 25%, #F8F0FF 50%, #F0F8FF 75%, #FFF8F0 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 20s ease infinite',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🎈', '🎀', '🌸', '⭐', '💫', '🦋', '🌟', '🌺'].map((d, i) => (
          <div
            key={i}
            className="absolute text-2xl md:text-3xl opacity-15"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${5 + (i * 17) % 85}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.5}s`,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div
        className="relative"
        style={{
          animation: opening ? 'bounce-in 0.5s ease-in forwards reverse' : 'float 3s ease-in-out infinite',
          opacity: opening ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div
          className="relative w-64 h-44 md:w-80 md:h-56 rounded-2xl mx-auto overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFD4E8 0%, #FFB6C1 50%, #FFD4E8 100%)',
            boxShadow: '0 8px 32px rgba(232,143,160,0.3)',
          }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '50%',
              background: 'linear-gradient(180deg, #E88FA0 0%, #FFB6C1 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl"
            style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
          >
            💝
          </div>
        </div>

        <p className="font-dancing text-lg md:text-xl text-[var(--color-deep-purple)] mt-8 text-center opacity-80">
          Yakin ingin membukanya?
        </p>
      </div>

      {opening && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `sparkle 1s ease-out ${i * 0.05}s forwards`,
              }}
            >
              {['✨', '💖', '🌟', '💫', '🎀'][i % 5]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
