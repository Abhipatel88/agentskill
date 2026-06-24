import { Terminal, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative border-b border-border bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border-2 border-surface/50 text-text-inverse text-sm font-medium mb-6 rounded-[var(--radius-control)]">
          <Zap className="w-4 h-4 text-accent" aria-hidden="true" />
          <span>The Package Manager for AI Agents</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight mb-6">
          Supercharge your AI Workflows
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-text-secondary mb-8 leading-relaxed">
          Discover, install, and integrate powerful skills into Claude, Cursor, and custom agents directly via npm. Build production-quality software faster.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/explore" 
            className="inline-flex items-center gap-2 bg-primary text-text-inverse px-6 py-3 rounded-[var(--radius-pill)] font-bold hover:bg-accent transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none"
            aria-label="Explore all agent skills"
          >
            Explore Skills
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <div className="inline-flex items-center gap-2 bg-surface border-2 border-surface text-text-inverse px-6 py-3 rounded-[var(--radius-control)] font-mono text-sm">
            <Terminal className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-accent font-bold">npx</span> my-agent-skills-cli add
          </div>
        </div>
      </div>
    </div>
  );
}
