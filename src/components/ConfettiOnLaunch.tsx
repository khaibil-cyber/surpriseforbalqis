import { useEffect, useState, useCallback } from 'react';

const COLORS = ['#E87D7D','#F4A97D','#F4D03F','#7ECFC0','#7DBBE8','#B8A9E8','#E88FA0','#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#98D8C8','#F7DC6F'];

interface ConfettiPiece { id: number; x: number; color: string; size: number; delay: number; duration: number; rotation: number; shape: 'square' | 'circle' | 'strip'; }

export default function ConfettiOnLaunch() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [visible, setVisible] = useState(true);

  const createPieces = useCallback(() => {
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 80; i++) {
      newPieces.push({
        id: i, x: Math.random() * 100, color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 10 + 5, delay: Math.random() * 2, duration: Math.random() * 3 + 3,
        rotation: Math.random() * 360, shape: (['square', 'circle', 'strip'] as const)[Math.floor(Math.random() * 3)],
      });
    }
    setPieces(newPieces);
  }, []);

  useEffect(() => {
    createPieces();
    const timer = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(timer);
  }, [createPieces]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      {pieces.map((piece) => (
        <div key={piece.id} style={{
          position: 'absolute', left: `${piece.x}%`, top: '-20px',
          width: piece.shape === 'strip' ? `${piece.size * 0.4}px` : `${piece.size}px`,
          height: piece.shape === 'strip' ? `${piece.size * 2}px` : `${piece.size}px`,
          backgroundColor: piece.color, borderRadius: piece.shape === 'circle' ? '50%' : '2px',
          animation: `confetti-fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
          transform: `rotate(${piece.rotation}deg)`, opacity: 0.9,
        }} />
      ))}
    </div>
  );
}
