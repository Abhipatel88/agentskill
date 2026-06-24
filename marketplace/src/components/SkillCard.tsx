"use client";

import { Download, Terminal, Copy, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface SkillCardProps {
  title: string;
  description: string;
  packageName: string;
  author: string;
  downloads: string;
  slug?: string;
  thumbnail?: string;
}

export default function SkillCard({
  title,
  description,
  packageName,
  author,
  downloads,
  slug,
  thumbnail,
}: SkillCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(packageName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CardWrapper = slug ? Link : 'div';
  const wrapperProps = slug ? { href: `/skills/${slug}` } : {};

  return (
    <CardWrapper {...wrapperProps as any} className="group bg-surface border border-border rounded-[var(--radius-card)] hover:border-primary/50 transition-all flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-primary overflow-hidden">
      {thumbnail && (
        <div className="w-full h-48 border-b border-background/20 relative shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumbnail} alt={`${title} preview`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {!thumbnail && (
              <div className="w-10 h-10 rounded-[var(--radius-control)] bg-background/10 flex items-center justify-center border border-background/20 group-hover:bg-background/20 transition-colors">
                <Terminal className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-text-inverse leading-tight group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-sm text-text-inverse/60">by <span className="text-text-inverse/80 font-bold">{author}</span></p>
            </div>
          </div>
        </div>

        <p className="text-text-inverse/80 text-sm mb-6 line-clamp-3 flex-grow font-sans">{description}</p>

        <div className="mt-auto pt-4 border-t border-background/20 flex flex-wrap items-center justify-between gap-3">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 bg-background/20 hover:bg-primary text-text-inverse px-3 py-1.5 rounded-[var(--radius-control)] text-xs font-mono font-bold transition-colors focus:ring-2 focus:ring-primary focus:outline-none whitespace-nowrap"
            aria-label={`Copy installation command for ${title}`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-text-inverse shrink-0" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
            {copied ? "Copied" : "Copy Command"}
          </button>

          {slug && (
            <div className="flex items-center gap-1.5 text-sm text-text-inverse/60 group-hover:text-accent font-bold transition-colors whitespace-nowrap">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}
