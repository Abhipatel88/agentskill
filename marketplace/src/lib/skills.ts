import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ParsedSkill {
  title: string;
  description: string;
  packageName: string;
  author: string;
  downloads: string;
  slug?: string;
  thumbnail?: string;
}

export async function getLocalSkills(): Promise<ParsedSkill[]> {
  try {
    // Try to find the .agents directory in the parent folder (or current folder)
    let agentsDir = path.join(process.cwd(), '..', '.agents', 'skills');
    if (!fs.existsSync(agentsDir)) {
      agentsDir = path.join(process.cwd(), '.agents', 'skills');
    }

    if (!fs.existsSync(agentsDir)) {
      return [];
    }

    const skillFolders = fs.readdirSync(agentsDir);
    const skills: ParsedSkill[] = [];

    for (const folder of skillFolders) {
      const skillFilePath = path.join(agentsDir, folder, 'SKILL.md');
      if (fs.existsSync(skillFilePath)) {
        const fileContent = fs.readFileSync(skillFilePath, 'utf8');
        const { data, content } = matter(fileContent);

        // Fallback to reading the first header if title isn't in frontmatter
        let fallbackTitle = folder;
        if (!data.name) {
          const match = content.match(/^#\s+(.*)/m);
          if (match) fallbackTitle = match[1];
        }

        skills.push({
          title: data.name || fallbackTitle,
          description: data.description || "A powerful agent skill.",
          packageName: `npx my-agent-skills-cli add ${folder}`,
          author: data.author || "local-user",
          downloads: "—",
          slug: folder,
          thumbnail: data.thumbnail ? `/api/skills/${folder}/${data.thumbnail}` : undefined
        });
      }
    }
    return skills;
  } catch (error) {
    console.error("Failed to read local skills:", error);
    return [];
  }
}
