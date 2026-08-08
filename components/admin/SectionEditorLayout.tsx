'use client';

import { useState, useEffect, useRef } from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function SectionEditorLayout({ children }: { children: React.ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Listen for the custom 'content-saved' and 'live-preview-update' events dispatched by FieldEditor / ArrayEditor
  useEffect(() => {
    const handleContentSaved = () => {
      setIsRefreshing(true);
      setRefreshKey((prev) => prev + 1);
      
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    };

    const handleLivePreviewUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { ...customEvent.detail, type: 'LIVE_PREVIEW_UPDATE', contentType: customEvent.detail.type },
          '*'
        );
      }
    };

    window.addEventListener('content-saved', handleContentSaved);
    window.addEventListener('live-preview-update', handleLivePreviewUpdate);
    return () => {
      window.removeEventListener('content-saved', handleContentSaved);
      window.removeEventListener('live-preview-update', handleLivePreviewUpdate);
    };
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full min-h-[calc(100vh-120px)]">
      {/* Left side: Editor Forms */}
      <div className="w-full lg:w-[45%] xl:w-[40%] shrink-0">
        <div className="pr-2 h-full">
          {children}
        </div>
      </div>

      {/* Right side: Live Preview */}
      <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-[800px] lg:h-auto sticky top-4">
        {/* Preview Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Preview
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleManualRefresh}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-teal transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-teal' : ''}`} />
              Ανανέωση
            </button>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-teal transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Άνοιγμα
            </Link>
          </div>
        </div>
        
        {/* Iframe */}
        <div className="flex-1 bg-slate-100 relative">
          <iframe
            ref={iframeRef}
            key={refreshKey}
            src={`/?preview=${refreshKey}`}
            className="absolute inset-0 w-full h-full border-0"
            title="Live Preview"
          />
        </div>
      </div>
    </div>
  );
}
