import { useState, useEffect } from 'react';
import { useBirthdayStore } from './store/birthdayStore';
import ConfettiOnLaunch from './components/ConfettiOnLaunch';
import CountdownTimer from './components/CountdownTimer';
import BirthdayMessage from './components/BirthdayMessage';
import CandleBlow from './components/CandleBlow';
import MusicPlayer from './components/MusicPlayer';
import GiftUnwrap from './components/GiftUnwrap';
import Fireworks from './components/Fireworks';
import LockScreen from './components/LockScreen';
import LetterPage from './components/LetterPage';

function SectionDivider({ emoji = '✨' }: { emoji?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 my-12 md:my-16">
      <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[var(--color-gold)]/30" />
      <span className="text-xl opacity-60" style={{ animation: 'float 3s ease-in-out infinite' }}>
        {emoji}
      </span>
      <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[var(--color-gold)]/30" />
    </div>
  );
}

function FloatingDecoration() {
  const decorations = ['🎈', '🎀', '🌸', '⭐', '💫', '🦋', '🌟', '🌺'];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {decorations.map((d, i) => (
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
  );
}

function ExitButton() {
  const handleExit = () => {
    window.open('', '_self');
    window.close();
    setTimeout(() => { window.location.href = 'about:blank'; }, 500);
  };

  return (
    <div className="text-center my-12 md:my-16">
      <button
        onClick={handleExit}
        className="group relative px-8 py-4 rounded-2xl font-body font-bold text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, var(--color-rose) 0%, var(--color-lavender) 50%, var(--color-sky) 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 4s ease infinite',
          boxShadow: '0 4px 20px rgba(232,143,160,0.4)',
        }}
      >
        <span className="relative z-10 flex items-center gap-2">
          Terimakasih Nabil😁
          <span className="text-sm opacity-80">👋</span>
        </span>
      </button>
      <p className="font-body text-xs text-[var(--color-warm-brown)] mt-3 opacity-50">
        Klik untuk keluar
      </p>
    </div>
  );
}

function App() {
  const { showConfetti, showFireworks, setShowFireworks, birthdayName } = useBirthdayStore();
  const [loaded, setLoaded] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (unlocked) {
      setTimeout(() => setLoaded(true), 100);
      setShowFireworks(true);
      const timer = setTimeout(() => { setShowFireworks(false); }, 5000);
      return () => clearTimeout(timer);
    }
  }, [unlocked]);

  return (
    <>
      <div className="fixed bottom-4 left-4 z-[200] max-w-[280px]">
        <MusicPlayer />
      </div>

      {!letterOpened && (
        <LetterPage onOpen={() => setLetterOpened(true)} />
      )}

      {letterOpened && !unlocked && (
        <LockScreen onUnlocked={() => setUnlocked(true)} />
      )}

      {unlocked && (
        <div className="relative min-h-screen">
          {showConfetti && <ConfettiOnLaunch />}
          <Fireworks active={showFireworks} />
          <FloatingDecoration />

          <main className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16">
            <section className="text-center mb-16" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out' }}>
              <div className="mb-6">
                <span className="text-5xl md:text-7xl block mb-4" style={{ animation: 'float 3s ease-in-out infinite' }}>🎂</span>
                <h1 className="font-elegant text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gradient-gold leading-tight font-semibold">
                  Selamat Ulang Tahun
                </h1>
                <h2 className="font-pacifico text-2xl sm:text-3xl md:text-4xl text-gradient-rainbow mt-2">
                  {birthdayName}!
                </h2>
              </div>
              <p className="font-romantic text-xl md:text-2xl text-[var(--color-deep-purple)] max-w-xl mx-auto leading-relaxed italic tracking-wide">
                Selamat ulang tahun ya, Balqis. Semoga hari ini menjadi hari yang special untuk kamu, I'll always support you no matter what.
              </p>
            </section>

            <section className="mb-12" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out 0.2s' }}>
              <CountdownTimer />
            </section>

            <SectionDivider emoji="💌" />

            <section className="mb-12" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out 0.4s' }}>
              <BirthdayMessage />
            </section>

            <SectionDivider emoji="🕯️" />

            <section className="mb-12" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out 0.6s' }}>
              <CandleBlow />
            </section>

            <SectionDivider emoji="🎁" />

            <section className="mb-12" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out 0.8s' }}>
              <GiftUnwrap />
            </section>

            <ExitButton />

            <footer className="text-center py-8 opacity-60">
              <p className="font-dancing text-lg text-[var(--color-deep-purple)]">
                Dibuat dengan 💖 untuk {birthdayName}
              </p>
              <p className="font-body text-xs text-[var(--color-warm-brown)] mt-2">
                © {new Date().getFullYear()} — Hak Cipta Dilindungi
              </p>
            </footer>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
