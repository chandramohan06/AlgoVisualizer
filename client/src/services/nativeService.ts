export const isNativePlatform = (): boolean => {
  return typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.() || false;
};

export const triggerHaptic = async (style: 'LIGHT' | 'MEDIUM' | 'HEAVY' = 'LIGHT') => {
  if (!isNativePlatform()) return;
  try {
    const cap = (window as any).Capacitor;
    if (cap?.Plugins?.Haptics) {
      await cap.Plugins.Haptics.impact({ style });
    }
  } catch {
    // Non-native fallback
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (isNativePlatform()) {
    try {
      const cap = (window as any).Capacitor;
      if (cap?.Plugins?.Clipboard) {
        await cap.Plugins.Clipboard.write({ string: text });
        return true;
      }
    } catch {
      // Fallback
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const shareContent = async (title: string, text: string, url: string): Promise<boolean> => {
  if (isNativePlatform()) {
    try {
      const cap = (window as any).Capacitor;
      if (cap?.Plugins?.Share) {
        await cap.Plugins.Share.share({ title, text, url, dialogTitle: 'Share with friends' });
        return true;
      }
    } catch {
      // Fallback
    }
  }

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch {
      return false;
    }
  }

  return copyToClipboard(url);
};

export const initNativeListeners = async () => {
  if (!isNativePlatform()) return;

  try {
    const cap = (window as any).Capacitor;
    if (cap?.Plugins?.App) {
      cap.Plugins.App.addListener('backButton', (data: { canGoBack: boolean }) => {
        if (data?.canGoBack) {
          window.history.back();
        } else {
          cap.Plugins.App.minimizeApp();
        }
      });
    }
  } catch {
    // Non-native fallback
  }
};
