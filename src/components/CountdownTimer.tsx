import { useEffect, useState } from 'react';
import { useBirthdayStore } from '../store/birthdayStore';

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

export default function CountdownTimer() {
  const { birthDate, birthHour } = useBirthdayStore();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const target = new Date(`${birthDate}T${String(birthHour).padStart(2, '0')}:00:00`);
    const calculate = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) { setIsExpired(true); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [birthDate, birthHour]);

  const blocks = [
    { value: timeLeft.days, label: 'Hari' },
    { value: timeLeft.hours, label: 'Jam' },
    { value: timeLeft.minutes, label: 'Menit' },
    { value: timeLeft.seconds, label: 'Detik' },
  ];

  if (isExpired) {
    return (
      <div className="text-center py-8">
        <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-rose)] to-[var(--color-lavender)] text-white">
          <p className="font-dancing text-2xl md:text-3xl font-bold">🎉 Hari yang ditunggu-tunggu! 🎉</p>
          <p className="font-body text-sm mt-1 opacity-90">Selamat Ulang Tahun!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="font-dancing text-xl md:text-2xl text-[var(--color-deep-purple)] mb-6">Hitung Mundur Menuju Hari Spesial ✨</h3>
      <div className="flex justify-center gap-3 md:gap-5">
        {blocks.map((block) => (
          <div key={block.label} className="flex flex-col items-center" style={{ animation: 'bounce-in 0.6s ease-out forwards' }}>
            <div className="glass-card w-16 h-16 md:w-24 md:h-24 flex items-center justify-center mb-2" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <span className="font-pacifico text-2xl md:text-4xl text-gradient-gold">{String(block.value).padStart(2, '0')}</span>
            </div>
            <span className="font-body text-xs md:text-sm text-[var(--color-warm-brown)] font-medium uppercase tracking-wider">{block.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
