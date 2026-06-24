import { Search, Terminal, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full border-b border-border bg-background z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" aria-hidden="true" />
            <Link href="/" className="text-lg font-bold text-text-primary tracking-tight focus:outline-none focus:ring-2 focus:ring-primary rounded-[var(--radius-control)]">
              AgentSkills
            </Link>
          </div>
          
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <label htmlFor="search-skills" className="sr-only">Search for skills</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-text-inverse/60" aria-hidden="true" />
              </div>
              <input
                id="search-skills"
                type="search"
                className="block w-full pl-10 pr-3 py-2 border-2 border-surface rounded-[var(--radius-control)] bg-surface text-text-inverse placeholder-text-inverse/60 focus:outline-none focus:border-primary transition-all text-sm font-mono"
                placeholder="Search skills (e.g. ui, testing)..."
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-[var(--radius-control)]">
              Explore
            </Link>
            <Link href="/docs" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-[var(--radius-control)]">
              Docs
            </Link>
            <button className="bg-primary hover:bg-accent text-text-inverse px-4 py-2 rounded-[var(--radius-pill)] text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background">
              Publish Skill
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-text-secondary hover:text-primary p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-[var(--radius-control)]" aria-label="Open menu">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
