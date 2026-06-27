import { useState } from 'react';
import { useBirthdayStore } from '../store/birthdayStore';

export default function BirthdayMessage() {
  const { birthdayName } = useBirthdayStore();
  const [isEditing, setIsEditing] = useState(false);
  const [customMessage, setCustomMessage] = useState(
    `Happy 16th birthday, Balqis 🎉 I hope today treats you really well, like seriously, no stress, no bad mood, just good vibes all day. You're still too much of a kid to be compared with me 😭 but honestly that's part of what makes you fun to know.

Sorry ya pake bahasa Inggris, biar special aja🤭`
  );

  return (
    <div className="text-center">
      <div className="glass-card p-8 md:p-12 max-w-2xl mx-auto relative">
        <div className="absolute top-3 left-3 text-3xl opacity-40" style={{ animation: 'sway 4s ease-in-out infinite' }}>🌸</div>
        <div className="absolute top-3 right-3 text-3xl opacity-40" style={{ animation: 'sway 4s ease-in-out infinite 1s' }}>🌺</div>
        <div className="absolute bottom-3 left-3 text-3xl opacity-40" style={{ animation: 'sway 4s ease-in-out infinite 2s' }}>🌷</div>
        <div className="absolute bottom-3 right-3 text-3xl opacity-40" style={{ animation: 'sway 4s ease-in-out infinite 3s' }}>🌻</div>

        <h2 className="font-great-vibes text-4xl md:text-6xl text-gradient-gold mb-2">For</h2>
        <h3 className="font-pacifico text-xl md:text-2xl text-gradient-rainbow mb-2">{birthdayName} A.K.A Ball?? Bola??</h3>
        <p className="font-dancing text-base md:text-lg text-[var(--color-deep-purple)] mb-8 italic">what ever is it</p>

        {isEditing ? (
          <div className="space-y-4">
            <textarea value={customMessage} onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full h-40 p-4 rounded-xl border-2 border-[var(--color-rose)] bg-white/50 font-dancing text-lg text-[var(--color-deep-purple)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" />
            <button onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gradient-to-r from-[var(--color-rose)] to-[var(--color-lavender)] text-white rounded-full font-body font-semibold hover:scale-105 transition-transform">
              Simpan Pesan
            </button>
          </div>
        ) : (
          <div>
            <div className="whitespace-pre-line font-romantic text-xl md:text-2xl text-[var(--color-deep-purple)] leading-relaxed mb-6 px-4 tracking-wide">
              {customMessage}
            </div>
            <button onClick={() => setIsEditing(true)}
              className="text-sm font-body text-[var(--color-rose)] hover:text-[var(--color-gold)] transition-colors underline underline-offset-4">
              ✏️ Edit Pesan
            </button>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
          <span className="text-lg">✨</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
        </div>
      </div>
    </div>
  );
}
