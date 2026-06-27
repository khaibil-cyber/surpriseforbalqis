import { useState, useRef } from 'react';
import { useBirthdayStore } from '../store/birthdayStore';

export default function MemoryGallery() {
  const { galleryImages, addGalleryImage } = useBirthdayStore();
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        addGalleryImage({ id: Date.now().toString() + Math.random().toString(36).slice(2), url: ev.target?.result as string, caption: caption || 'Momen spesial ✨' });
        setCaption('');
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <h3 className="font-dancing text-xl md:text-2xl text-[var(--color-deep-purple)] mb-6 text-center">📸 Galeri Kenangan</h3>
      <div className="glass-card p-6 mb-6 max-w-lg mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Tulis catatan untuk foto..."
            className="flex-1 px-4 py-2 rounded-xl border border-[var(--color-lavender)] bg-white/60 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" />
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2 bg-gradient-to-r from-[var(--color-lavender)] to-[var(--color-sky)] text-white rounded-xl font-body font-semibold hover:scale-105 transition-transform text-sm whitespace-nowrap">
            📤 Unggah Foto
          </button>
        </div>
      </div>
      {galleryImages.length === 0 ? (
        <div className="text-center py-12 opacity-50">
          <div className="text-5xl mb-3">📷</div>
          <p className="font-body text-sm text-[var(--color-warm-brown)]">Unggah foto untuk membuat album kenangan</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {galleryImages.map((img, i) => (
            <div key={img.id} className="relative group cursor-pointer" style={{ animation: `bounce-in 0.5s ease-out ${i * 0.1}s forwards`, opacity: 0 }}
              onClick={() => setSelectedImage(img.url)}>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="font-dancing text-sm text-[var(--color-deep-purple)] mt-2 text-center">{img.caption}</p>
            </div>
          ))}
        </div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full size" className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
            <button onClick={() => setSelectedImage(null)} className="block mx-auto mt-4 px-6 py-2 bg-white/20 text-white rounded-full font-body hover:bg-white/30 transition-colors">✕ Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
