import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Terminal, Copy, Check, ArrowLeft, Download, Star } from 'lucide-react';
import Navbar from "@/components/Navbar";

// We need a small client component to handle the copy button state
import CopyButton from './CopyButton';

export default async function SkillPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // Find the skill directory
  let agentsDir = path.join(process.cwd(), '..', '.agents', 'skills');
  if (!fs.existsSync(agentsDir)) {
    agentsDir = path.join(process.cwd(), '.agents', 'skills');
  }

  const skillFilePath = path.join(agentsDir, slug, 'SKILL.md');
  
  if (!fs.existsSync(skillFilePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(skillFilePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Fallback to reading the first header if title isn't in frontmatter
  let title = data.name || slug;
  if (!data.name) {
    const match = content.match(/^#\s+(.*)/m);
    if (match) title = match[1];
  }

  const description = data.description || "A powerful agent skill.";
  const author = data.author || "local-user";
  const installCommand = `npx my-agent-skills-cli add ${slug}`;

  return (
    <main className="min-h-screen bg-background text-text-primary font-sans selection:bg-surface selection:text-text-inverse pb-20">
      <Navbar />
      
      {/* Header Section */}
      <div className="border-b border-border bg-background pt-10 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary font-bold transition-colors mb-8 focus:outline-none focus:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-[var(--radius-control)] bg-surface/5 flex items-center justify-center border border-border">
                  <Terminal className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary tracking-tight">{title}</h1>
                  <p className="text-text-secondary mt-1 text-sm">by <span className="font-bold text-text-primary">{author}</span></p>
                </div>
              </div>
              <p className="text-lg text-text-secondary max-w-2xl leading-relaxed font-sans">{description}</p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-text-secondary font-bold md:pt-4">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>— downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                <span>— rating</span>
              </div>
            </div>
          </div>

          {/* Installation Command Box */}
          <div className="mt-10 p-4 rounded-[var(--radius-control)] bg-surface border border-surface flex items-center justify-between gap-4">
            <div className="flex-1 font-mono text-sm text-text-inverse overflow-x-auto whitespace-nowrap hide-scrollbar">
              <span className="text-accent font-bold select-none mr-3">$</span>
              {installCommand}
            </div>
            <CopyButton command={installCommand} />
          </div>
        </div>
      </div>

      {/* Markdown Content */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <article className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-text-primary prose-a:text-primary hover:prose-a:text-accent prose-code:bg-surface/10 prose-code:text-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-[var(--radius-control)] prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface prose-pre:text-text-inverse prose-pre:border prose-pre:border-surface prose-strong:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
