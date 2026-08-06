import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

let sharedAudioCtx: AudioContext | null = null;

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
};

// Unlock iOS Audio Context & Request Notification/Sound permissions on app startup
export const requestAudioAndNotificationPermissions = async (): Promise<boolean> => {
  try {
    // 1. Unlock Web Audio Context for iOS Safari / Capacitor WebView
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume();
    }

    // 2. Request native iOS Notification & Sound Permissions
    if (Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android') {
      const perm = await LocalNotifications.requestPermissions();
      console.log('[SoundService] Notification & Sound Permissions status:', perm.display);
      return perm.display === 'granted';
    }
    return true;
  } catch (error) {
    console.error('[SoundService] Error requesting sound/notification permissions:', error);
    return false;
  }
};

// Play realistic cute double kitten meow sound
export const playKittenWelcomeMeow = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const playSingleMeow = (startTime: number, pitchMultiplier = 1.0) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650 * pitchMultiplier, startTime);
      osc.frequency.exponentialRampToValueAtTime(1300 * pitchMultiplier, startTime + 0.14);
      osc.frequency.exponentialRampToValueAtTime(480 * pitchMultiplier, startTime + 0.32);

      gain.gain.setValueAtTime(0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.33);
    };

    const now = ctx.currentTime;
    playSingleMeow(now + 0.05, 1.0);
    playSingleMeow(now + 0.42, 1.15); // Second cute higher-pitched kitten meow
  } catch (e) {
    console.warn('[SoundService] Meow sound playback error:', e);
  }
};

// Play Clicker training sound
export const playClickerSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    console.warn('[SoundService] Clicker sound error:', e);
  }
};
