import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [swUpdateAvailable, setSwUpdateAvailable] = useState<boolean>(false);

  useEffect(() => {
    // 1. Listen for PWA Install Prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user dismissed install banner before
      const dismissed = localStorage.getItem('pwa_banner_dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // 2. Service Worker Registration & Update Detection
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setSwUpdateAvailable(true);
              }
            });
          }
        });
      }).catch(() => {
        // SW registration fallback
      });
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa_banner_dismissed', 'true');
  };

  const handleReloadUpdate = () => {
    window.location.reload();
  };

  return (
    <>
      {/* 1. SW Update Toast Banner */}
      <AnimatePresence>
        {swUpdateAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 z-50 p-4 rounded-2xl glass-card border border-indigo-500/30 bg-[#09090b]/95 backdrop-blur-xl shadow-2xl max-w-sm flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2 text-white font-bold">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>New AlgoVisualizer update ready!</span>
            </div>
            <button
              onClick={handleReloadUpdate}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reload
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PWA Custom Install Banner */}
      <AnimatePresence>
        {showBanner && deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="fixed bottom-20 lg:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 p-4 rounded-2xl glass-card border border-indigo-500/40 bg-gradient-to-r from-indigo-950/90 via-[#0d1117]/95 to-black/90 backdrop-blur-xl shadow-2xl max-w-md space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Install AlgoVisualizer App</h4>
                  <p className="text-[11px] text-slate-400">Fast offline learning, instant launch, and full-screen experience.</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 rounded-lg text-slate-500 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Not Now
              </button>
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Install App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PWAInstallPrompt;
