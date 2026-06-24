import { getLocalSkills } from "@/lib/skills";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillCard from "@/components/SkillCard";

export default async function Home() {
  const localSkills = await getLocalSkills();

  return (
    <main className="min-h-screen bg-background text-text-primary font-sans selection:bg-surface selection:text-text-inverse">
      <Navbar />
      <Hero />
      
      <div className="max-w-7xl mx-auto px-6 py-[var(--section-padding,80px)]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2 text-text-primary">Your Local Skills</h2>
            <p className="text-text-secondary text-sm">Skills discovered in your `.agents/skills` directory.</p>
          </div>
          <button 
            className="text-text-primary hover:text-primary font-bold text-sm flex items-center gap-1 focus:outline-none focus:underline"
            aria-label="View all your skills"
          >
            View all &rarr;
          </button>
        </div>

        {localSkills.length === 0 ? (
          <div role="status" className="text-center py-16 border-2 border-border rounded-[var(--radius-card)] bg-surface/5">
            <h3 className="mt-2 text-sm font-bold text-text-primary">No skills found</h3>
            <p className="mt-1 text-sm text-text-secondary">Install a skill using the CLI to see it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localSkills.map((skill, index) => (
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
