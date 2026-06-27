import { useRef, useEffect, useCallback, useState } from 'react';
import { useBirthdayStore } from '../store/birthdayStore';

const HINDIA_EVALUASI_ID = 'cWrSjCZ5AeE';

export default function MusicPlayer() {
  const { musicPlaying, setMusicPlaying } = useBirthdayStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => { setPlayerReady(true); };
    return () => { /* @ts-ignore */ window.onYouTubeIframeAPIReady = null; };
  }, []);

  useEffect(() => {
    if (playerReady && iframeRef.current) {
      const timer = setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'seekTo', args: [15, true] }), '*'
        );
        setTimeout(() => {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo', args: '' }), '*'
          );
        }, 200);
        setMusicPlaying(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [playerReady, setMusicPlaying]);

  const togglePlay = useCallback(() => {
    if (!iframeRef.current) return;
    if (musicPlaying) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }), '*'
      );
      setMusicPlaying(false);
    } else {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'seekTo', args: [15, true] }), '*'
      );
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: '' }), '*'
        );
      }, 200);
      setMusicPlaying(true);
    }
  }, [musicPlaying, setMusicPlaying]);

  return (
    <div className="glass-card p-4 md:p-6 flex items-center gap-4 max-w-sm mx-auto">
      <iframe ref={iframeRef} width="0" height="0"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        src={`https://www.youtube.com/embed/${HINDIA_EVALUASI_ID}?enablejsapi=1&autoplay=0&start=15&loop=1&playlist=${HINDIA_EVALUASI_ID}&controls=0&modestbranding=1&rel=0`}
        allow="autoplay" title="Hindia - Evaluasi"
      />
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-rose))', animation: musicPlaying ? 'rotate-gift 3s linear infinite' : 'none' }}
      >🎵</div>
      <div className="flex-1 min-w-0">
        <p className="font-dancing text-sm text-[var(--color-deep-purple)] truncate">🎶 Hindia - Evaluasi</p>
        <p className="font-body text-xs text-[var(--color-warm-brown)] opacity-60">{musicPlaying ? 'Memutar...' : 'Ketuk untuk memutar'}</p>
      </div>
      <button onClick={togglePlay} className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 hover:scale-110 active:scale-95 transition-transform"
        style={{ background: musicPlaying ? 'linear-gradient(135deg, var(--color-coral), var(--color-rose))' : 'linear-gradient(135deg, var(--color-gold), var(--color-peach))', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
      >
        {musicPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><rect x="3" y="2" width="4" height="12" rx="1" /><rect x="9" y="2" width="4" height="12" rx="1" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M4 2l10 6-10 6V2z" /></svg>
        )}
      </button>
    </div>
  );
}
