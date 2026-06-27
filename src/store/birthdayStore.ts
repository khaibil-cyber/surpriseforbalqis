import { create } from 'zustand';

export interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  sticker: string;
  timestamp: number;
}

interface BirthdayState {
  showConfetti: boolean;
  setShowConfetti: (v: boolean) => void;
  candleBlown: boolean;
  setCandleBlown: (v: boolean) => void;
  musicPlaying: boolean;
  setMusicPlaying: (v: boolean) => void;
  guestbookEntries: GuestBookEntry[];
  addGuestbookEntry: (entry: GuestBookEntry) => void;
  giftOpened: boolean;
  setGiftOpened: (v: boolean) => void;
  showFireworks: boolean;
  setShowFireworks: (v: boolean) => void;
  birthDate: string;
  birthHour: number;
  birthdayName: string;
}

export const useBirthdayStore = create<BirthdayState>((set) => ({
  showConfetti: true,
  setShowConfetti: (v) => set({ showConfetti: v }),
  candleBlown: false,
  setCandleBlown: (v) => set({ candleBlown: v }),
  musicPlaying: false,
  setMusicPlaying: (v) => set({ musicPlaying: v }),
  guestbookEntries: [],
  addGuestbookEntry: (entry) =>
    set((state) => {
      const newEntries = [...state.guestbookEntries, entry];
      if (newEntries.length >= 10) {
        return { guestbookEntries: newEntries, showFireworks: true };
      }
      return { guestbookEntries: newEntries };
    }),
  giftOpened: false,
  setGiftOpened: (v) => set({ giftOpened: v }),
  showFireworks: false,
  setShowFireworks: (v) => set({ showFireworks: v }),
  birthDate: '2026-07-01',
  birthHour: 0,
  birthdayName: 'Balqissya Putri Yasmine',
}));
