import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const NetworkStatusIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showStatusToast, setShowStatusToast] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatusToast(true);
      setTimeout(() => setShowStatusToast(false), 4000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatusToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showStatusToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl border text-xs font-bold shadow-2xl flex items-center gap-2 backdrop-blur-xl ${
            isOnline
              ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/90 border-rose-500/40 text-rose-300'
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span>You are back online! Syncing progress...</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-rose-400" />
              <span>Offline Mode Active. Reading downloaded notes &amp; cached data.</span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NetworkStatusIndicator;
