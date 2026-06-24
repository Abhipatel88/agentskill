import { getLocalSkills } from "@/lib/skills";
import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import { Compass, Search } from "lucide-react";

export default async function ExplorePage() {
  const allSkills = await getLocalSkills();

  return (
    <main className="min-h-screen bg-background text-text-primary font-sans selection:bg-surface selection:text-text-inverse">
      <Navbar />
      
      {/* Header Section */}
      <div className="border-b border-border bg-background pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface/5 border-2 border-border text-text-primary text-sm font-bold mb-6 rounded-[var(--radius-pill)]">
            <Compass className="w-4 h-4 text-primary" aria-hidden="true" />
            <span>Discover Skills</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Explore All Skills
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-text-secondary">
            Find the perfect modules, tools, and interfaces to supercharge your AI agents. All skills are fully compatible with your workspace.
          </p>

          {/* Visual Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-secondary group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 border-2 border-border rounded-[var(--radius-control)] leading-5 bg-background text-text-primary placeholder-text-secondary focus:outline-none focus:ring-0 focus:border-primary sm:text-sm font-medium transition-colors"
              placeholder="Search skills by name, tag, or author..."
            />
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-[var(--section-padding,80px)]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Showing {allSkills.length} available skill{allSkills.length !== 1 ? 's' : ''}
          </h2>
          <div className="flex gap-2">
            <select className="bg-background border-2 border-border text-text-primary text-sm rounded-[var(--radius-control)] focus:ring-primary focus:border-primary block p-2 font-bold focus:outline-none cursor-pointer">
              <option>Most Popular</option>
              <option>Recently Added</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>

        {allSkills.length === 0 ? (
          <div role="status" className="text-center py-20 border-2 border-border rounded-[var(--radius-card)] bg-surface/5">
            <h3 className="mt-2 text-lg font-bold text-text-primary">No skills found</h3>
            <p className="mt-2 text-sm text-text-secondary">It looks like there are no skills available to explore yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSkills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="border-t border-border bg-background py-10 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-text-secondary font-bold">
          <p>© 2026 AgentSkills. Built with production-quality UI.</p>
        </div>
      </footer>
    </main>
  );
}
