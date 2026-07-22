import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Trash2, RotateCw, ZoomIn, Check, X, AlertCircle } from 'lucide-react';
import { userService } from '@services/userService';
import { useAuthStore } from '@store/authStore';
import { getInitials } from '@utils/index';

interface ProfileAvatarCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar?: string;
  userName: string;
  onAvatarUpdated: (newAvatarUrl?: string) => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const ProfileAvatarCropModal: React.FC<ProfileAvatarCropModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  userName,
  onAvatarUpdated,
}) => {
  const { user, setUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Reset state on open/close
  useEffect(() => {
    if (!isOpen) {
      setImagePreviewUrl(null);
      setZoom(1);
      setRotation(0);
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMessage('Invalid file format. Supported formats: JPG, JPEG, PNG, WEBP.');
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage('File size exceeds maximum limit of 5 MB.');
      return;
    }

    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
    setZoom(1);
    setRotation(0);
  };

  // Generate cropped base64 canvas preview
  const generateCroppedBase64 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!imagePreviewUrl) return reject('No image selected');

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imagePreviewUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas error');

        const size = 300;
        canvas.width = size;
        canvas.height = size;

        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.clip();

        // Translate to center for rotation & scaling
        ctx.translate(size / 2, size / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(zoom, zoom);

        const aspect = img.width / img.height;
        let drawW = size;
        let drawH = size;
        if (aspect > 1) {
          drawW = size * aspect;
        } else {
          drawH = size / aspect;
        }

        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();

        resolve(canvas.toDataURL('image/webp', 0.85));
      };
      img.onerror = () => reject('Failed to load image');
    });
  };

  const handleSaveUpload = async () => {
    if (!imagePreviewUrl) return;
    setIsUploading(true);
    setErrorMessage(null);

    try {
      const croppedBase64 = await generateCroppedBase64();
      const updatedUser = await userService.uploadAvatar(croppedBase64);

      if (user) {
        setUser({ ...user, avatar: updatedUser.avatar });
      }

      onAvatarUpdated(updatedUser.avatar);
      setSuccessMessage('Profile picture updated successfully!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    setIsUploading(true);
    setErrorMessage(null);

    try {
      await userService.deleteAvatar();
      if (user) {
        setUser({ ...user, avatar: undefined });
      }
      onAvatarUpdated(undefined);
      setSuccessMessage('Profile picture removed. Default avatar restored.');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMessage('Failed to remove profile picture.');
    } finally {
      setIsUploading(false);
    }
  };

  const activeAvatar = imagePreviewUrl || currentAvatar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-[#121620] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Profile Photo Editor</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Error / Success Banners */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Circular Crop Mask Preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 rounded-full border-4 border-indigo-500/60 overflow-hidden bg-black/60 shadow-2xl flex items-center justify-center">
              {activeAvatar ? (
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-100"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  }}
                >
                  <img
                    src={activeAvatar}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-indigo-600/30 text-indigo-200 text-4xl font-black flex items-center justify-center">
                  {getInitials(userName)}
                </div>
              )}

              {/* Circular Overlay Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20 pointer-events-none" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2">Circular Crop Mask</span>
          </div>

          {/* Controls: Zoom & Rotate */}
          {imagePreviewUrl && (
            <div className="space-y-3 bg-black/30 border border-white/5 rounded-xl p-3 text-xs font-mono">
              <div className="flex items-center gap-3">
                <ZoomIn className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-[11px] text-slate-400 w-12">Zoom:</span>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="w-8 text-right font-bold text-white">{Math.round(zoom * 100)}%</span>
              </div>

              <div className="flex items-center gap-3">
                <RotateCw className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-[11px] text-slate-400 w-12">Rotate:</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="w-8 text-right font-bold text-white">{rotation}°</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{imagePreviewUrl ? 'Change Photo' : 'Upload Photo'}</span>
              </button>

              {currentAvatar && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  disabled={isUploading}
                  className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Photo</span>
                </button>
              )}
            </div>

            {imagePreviewUrl && (
              <button
                type="button"
                onClick={handleSaveUpload}
                disabled={isUploading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isUploading ? (
                  <span className="flex items-center gap-2 font-mono">
                    <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Uploading Image...
                  </span>
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Save Profile Picture
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
