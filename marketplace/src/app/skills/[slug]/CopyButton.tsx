"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyButton({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-accent text-text-inverse rounded-[var(--radius-control)] text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-primary flex-shrink-0"
      aria-label="Copy installation command"
    >
      {copied ? <Check className="w-4 h-4 text-text-inverse" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
