import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Find the skill directory
  let agentsDir = path.join(process.cwd(), '..', '.agents', 'skills');
  if (!fs.existsSync(agentsDir)) {
    agentsDir = path.join(process.cwd(), '.agents', 'skills');
  }

  const skillFilePath = path.join(agentsDir, slug, 'SKILL.md');

  if (!fs.existsSync(skillFilePath)) {
    return new NextResponse('Skill not found', { status: 404 });
  }

  const fileContent = fs.readFileSync(skillFilePath, 'utf8');

  // Return raw text (markdown) to the CLI
  return new NextResponse(fileContent, {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}
