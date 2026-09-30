import { loadMuted, saveMuted } from "../core/storage.js";

const PEAK_GAIN = 0.22;
const SILENT_GAIN = 0.0001;
const ATTACK_TIME = 0.02;
const NOTE_OVERLAP = 0.6;

let context = null;
let muted = loadMuted();

export const isMuted = () => muted;

export const toggleMuted = () => {
  muted = !muted;
  saveMuted(muted);
  return muted;
};

const getContext = () => {
  if (context) return context;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    context = new AudioContextClass();
  } catch {
    context = null;
  }
  return context;
};

const playTone = (ctx, { freq, start, duration, type }) => {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = freq;
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(SILENT_GAIN, start);
  gain.gain.exponentialRampToValueAtTime(PEAK_GAIN, start + ATTACK_TIME);
  gain.gain.exponentialRampToValueAtTime(SILENT_GAIN, start + duration);
  oscillator.start(start);
  oscillator.stop(start + duration);
};

export const beep = (frequencies, duration, type = "sine") => {
  if (muted) return;
  const ctx = getContext();
  if (!ctx) return;
  const startAt = ctx.currentTime;
  frequencies.forEach((freq, i) =>
    playTone(ctx, { freq, type, duration, start: startAt + i * duration * NOTE_OVERLAP })
  );
};
