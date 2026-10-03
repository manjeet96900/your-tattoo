/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { ImageSlotDefinition, useSiteData } from '@/src/context/SiteDataContext';
import { fileToDataUrl, uploadImageToServer } from '@/src/utils/imageUpload';
import { uploadImageToSupabase } from '@/src/lib/supabase';
import {
  UploadCloud,
  Check,
  RotateCcw,
  Copy,
  ExternalLink,
  Eye,
  Loader2,
  AlertCircle,
  FileImage,
} from 'lucide-react';

interface AdminCardProps {
  slot: ImageSlotDefinition;
  onPreviewModal?: (url: string, title: string) => void;
}

export const AdminCard: React.FC<AdminCardProps> = ({ slot, onPreviewModal }) => {
  const { updateImageSlot, resetSlot } = useSiteData();

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [justCopied, setJustCopied] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [urlInput, setUrlInput] = useState(slot.currentUrl);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize internal input if slot URL changed externally
  React.useEffect(() => {
    setUrlInput(slot.currentUrl);
  }, [slot.currentUrl]);

  const handleProcessFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select a valid image file (JPEG, PNG, WebP, etc.)');
        setTimeout(() => setErrorMessage(null), 4000);
        return;
      }

      setIsProcessing(true);
      setErrorMessage(null);

      try {
        // 1. Try Supabase cloud storage first
        let finalUrl: string | null = null;
        try {
          const supabaseRes = await uploadImageToSupabase(file, file.name, slot.id);
          if (supabaseRes.success && supabaseRes.url) {
            finalUrl = supabaseRes.url;
          }
        } catch (supabaseErr) {
          console.warn('Supabase cloud storage skipped:', supabaseErr);
        }

        // 2. Fall back to local server upload or dataUrl
        if (!finalUrl) {
          const dataUrl = await fileToDataUrl(file);
          const serverUrl = await uploadImageToServer(dataUrl, file.name, slot.id);
          finalUrl = serverUrl || dataUrl;
        }

        // 3. Update reactive siteData store & save
        await updateImageSlot(slot.id, finalUrl);
        setUrlInput(finalUrl);

        // Visual success pulse
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2500);
      } catch (err) {
        console.error('Failed to convert image to URL:', err);
        setErrorMessage('Could not convert image. Try another file.');
        setTimeout(() => setErrorMessage(null), 4000);
      } finally {
        setIsProcessing(false);
      }
    },
    [slot.id, updateImageSlot]
  );

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        handleProcessFile(file);
      }
    },
    [handleProcessFile]
  );

  // File input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleProcessFile(file);
      // Reset input value so same file can be re-selected if needed
      e.target.value = '';
    }
  };

  const handleTriggerFileInput = () => {
    if (!isProcessing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Direct URL save
  const handleSaveManualUrl = async () => {
    if (urlInput.trim()) {
      setIsProcessing(true);
      await updateImageSlot(slot.id, urlInput.trim());
      setIsProcessing(false);
      setIsEditingUrl(false);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  // Copy URL to clipboard
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(slot.currentUrl);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  // Category badge colors
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Hero':
        return 'text-indigo-300 border-indigo-500/30 bg-indigo-950/40';
      case 'Services':
        return 'text-emerald-300 border-emerald-500/30 bg-emerald-950/40';
      case 'Artists':
        return 'text-amber-300 border-amber-500/30 bg-amber-950/40';
      case 'Process':
        return 'text-blue-300 border-blue-500/30 bg-blue-950/40';
      case 'Editorial':
        return 'text-cyan-300 border-cyan-500/30 bg-cyan-950/40';
      case 'Instagram':
        return 'text-rose-300 border-rose-500/30 bg-rose-950/40';
      case 'Gallery':
        return 'text-fuchsia-300 border-fuchsia-500/30 bg-fuchsia-950/40';
      default:
        return 'text-neutral-300 border-neutral-700 bg-neutral-900';
    }
  };

  const isDataUrl = slot.currentUrl.startsWith('data:');

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-none border transition-all duration-200 bg-[#0c0c0c] text-neutral-200 ${
        slot.isModified
          ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.08)]'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />

      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-white/10 p-2 sm:p-2.5 bg-[#111111]/80 text-[11px]">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-mono font-bold tracking-wider text-white bg-white/10 px-1.5 py-0.5 border border-white/15">
            #{String(slot.slotNumber).padStart(2, '0')}
          </span>
          <span
            className={`font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border ${getCategoryBadgeClass(
              slot.category
            )}`}
          >
            {slot.category}
          </span>
        </div>

        {slot.isModified ? (
          <span className="flex items-center gap-1 font-mono text-[9px] text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        ) : (
          <span className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Default</span>
        )}
      </div>

      {/* Title & Placement Info */}
      <div className="p-2 sm:p-2.5 pb-1">
        <h4 className="font-serif text-sm font-normal text-white truncate" title={slot.title}>
          {slot.title}
        </h4>
        <p className="font-mono text-[10px] text-white/50 truncate" title={slot.description}>
          {slot.description}
        </p>
      </div>

      {/* Visual Image Preview with Hover Controls */}
      <div className="relative mx-2 sm:mx-2.5 aspect-[4/3] overflow-hidden border border-white/10 bg-[#050505]">
        <img
          src={slot.currentUrl}
          alt={slot.altText || slot.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback placeholder if broken URL
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Aspect Ratio Guide Tag */}
        <div className="absolute top-1.5 left-1.5 bg-[#050505]/85 border border-white/15 px-1.5 py-0.5 font-mono text-[8px] text-white/70 uppercase tracking-widest pointer-events-none">
          {slot.recommendedAspect}
        </div>

        {/* Quick View Full Modal Trigger */}
        <button
          type="button"
          onClick={() => onPreviewModal?.(slot.currentUrl, slot.title)}
          className="absolute top-1.5 right-1.5 p-1 bg-[#050505]/85 hover:bg-white hover:text-black border border-white/20 text-white transition-colors"
          title="Zoom Preview"
        >
          <Eye className="h-3 w-3" />
        </button>

        {/* Processing Spinner Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xs p-2 text-center">
            <Loader2 className="h-6 w-6 animate-spin text-white mb-1.5" />
            <span className="font-mono text-[10px] text-white tracking-widest uppercase">
              Converting to URL...
            </span>
            <span className="font-mono text-[8px] text-white/50 mt-0.5">Injecting into siteData</span>
          </div>
        )}

        {/* Just Saved Confirmation Badge */}
        {justSaved && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-950/90 text-emerald-200 backdrop-blur-xs p-2 text-center animate-fade-in">
            <Check className="h-6 w-6 text-emerald-300 mb-1" />
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
              siteData Updated
            </span>
            <span className="font-mono text-[8px] text-emerald-300/80 mt-0.5">Live on Website!</span>
          </div>
        )}
      </div>

      {/* Drag & Drop or Choose File Interactive Zone */}
      <div className="p-2 sm:p-2.5 pt-2">
        <div
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleTriggerFileInput}
          className={`cursor-pointer border border-dashed p-2 text-center transition-all duration-200 ${
            isDragging
              ? 'border-white bg-white/15 scale-[1.02]'
              : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleTriggerFileInput();
          }}
          title="Click to browse image or drag and drop onto card"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <UploadCloud
              className={`h-4 w-4 ${isDragging ? 'text-white scale-110' : 'text-white/60'} transition-transform`}
            />
            <div className="text-[10px] font-medium text-white tracking-tight leading-none">
              {isDragging ? 'Drop to Upload' : 'Drag & Drop Image'}
            </div>
            <div className="text-[9px] font-mono text-white/40 tracking-wider">or click Choose File</div>
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-1.5 flex items-center gap-1 text-[9px] text-rose-400 font-mono">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span className="truncate">{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Converted URL Display & Actions */}
      <div className="border-t border-white/10 p-2 sm:p-2.5 bg-[#0a0a0a] text-[10px] font-mono">
        <div className="flex items-center justify-between gap-1 mb-1.5 text-white/50 text-[9px]">
          <span className="uppercase tracking-widest flex items-center gap-1">
            <FileImage className="h-2.5 w-2.5" />
            {isDataUrl ? 'Data URL (Base64)' : 'Target URL'}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="text-white/60 hover:text-white flex items-center gap-0.5 px-1 py-0.5 hover:bg-white/10"
              title="Copy URL"
            >
              {justCopied ? <Check className="h-2.5 w-2.5 text-emerald-400" /> : <Copy className="h-2.5 w-2.5" />}
              <span>{justCopied ? 'Copied' : 'Copy'}</span>
            </button>
            {slot.isModified && (
              <button
                type="button"
                onClick={() => resetSlot(slot.id)}
                className="text-white/60 hover:text-rose-400 flex items-center gap-0.5 px-1 py-0.5 hover:bg-white/10"
                title="Revert to Default Image"
              >
                <RotateCcw className="h-2.5 w-2.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* URL Box / Manual Edit */}
        {isEditingUrl ? (
          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste image URL (https://...)"
              className="w-full bg-[#141414] border border-white/30 px-1.5 py-1 text-[10px] text-white focus:outline-none focus:border-white font-mono"
            />
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <button
                type="button"
                onClick={() => setIsEditingUrl(false)}
                className="px-1.5 py-0.5 text-[9px] text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveManualUrl}
                className="px-2 py-0.5 text-[9px] bg-white text-black font-semibold hover:bg-white/90"
              >
                Save URL
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsEditingUrl(true)}
            className="cursor-pointer group/url flex items-center justify-between bg-[#141414] border border-white/10 hover:border-white/20 px-1.5 py-1 text-white/70"
            title="Click to edit or paste URL directly"
          >
            <span className="truncate max-w-[130px] font-mono text-[9px]">
              {slot.currentUrl}
            </span>
            <span className="text-[8px] uppercase tracking-wider text-white/40 group-hover/url:text-white">
              Edit
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
