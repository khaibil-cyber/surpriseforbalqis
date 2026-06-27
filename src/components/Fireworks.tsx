import { useEffect, useRef, useCallback } from 'react';

interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number; gravity: number; decay: number; trail: { x: number; y: number; alpha: number }[]; }

const COLORS = ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#9B59B6','#FF8C00','#FF1493','#00CED1','#FFD700','#FF69B4'];

function createBurst(x: number, y: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const speed = 2 + Math.random() * 4;
    particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, maxLife: 1, color: COLORS[Math.floor(Math.random() * COLORS.length)], size: 2 + Math.random() * 3, gravity: 0.02 + Math.random() * 0.02, decay: 0.008 + Math.random() * 0.008, trail: [] });
  }
  return particles;
}

export default function Fireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.trail.push({ x: p.x, y: p.y, alpha: p.life });
      if (p.trail.length > 8) p.trail.shift();
      p.trail.forEach((t, idx) => {
        ctx.beginPath();
        ctx.arc(t.x, t.y, p.size * (idx / p.trail.length) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(t.alpha * 80).toString(16).padStart(2, '0');
        ctx.fill();
      });
      p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.vx *= 0.99; p.life -= p.decay;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
      ctx.fill();
      if (p.life <= 0) particles.splice(i, 1);
    }
    if (particles.length > 0 || active) animRef.current = requestAnimationFrame(animate);
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (active) {
      let burstCount = 0;
      const maxBursts = 15;
      const interval = setInterval(() => {
        if (burstCount >= maxBursts) { clearInterval(interval); return; }
        const x = Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.2;
        const y = Math.random() * window.innerHeight * 0.4 + window.innerHeight * 0.1;
        particlesRef.current.push(...createBurst(x, y, 30 + Math.floor(Math.random() * 20)));
        if (!animRef.current) animRef.current = requestAnimationFrame(animate);
        burstCount++;
      }, 400);
      return () => clearInterval(interval);
    }
  }, [active, animate]);

  useEffect(() => { return () => { if (animRef.current) cancelAnimationFrame(animRef.current); }; }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 9998 }} />;
}
