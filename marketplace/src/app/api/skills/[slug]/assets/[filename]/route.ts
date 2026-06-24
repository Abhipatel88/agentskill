import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string; filename: string }> }
) {
  const { slug, filename } = await params;

  // Find the skill directory
  let agentsDir = path.join(process.cwd(), '..', '.agents', 'skills');
  if (!fs.existsSync(agentsDir)) {
    agentsDir = path.join(process.cwd(), '.agents', 'skills');
  }

  // Prevent directory traversal
  const safeFilename = path.basename(filename);
  const assetPath = path.join(agentsDir, slug, 'assets', safeFilename);

  if (!fs.existsSync(assetPath)) {
    return new NextResponse('Asset not found', { status: 404 });
  }

  // Determine content type based on extension
  const ext = path.extname(safeFilename).toLowerCase();
  let contentType = 'application/octet-stream';
  if (ext === '.png') contentType = 'image/png';
  else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
  else if (ext === '.gif') contentType = 'image/gif';
  else if (ext === '.svg') contentType = 'image/svg+xml';
  else if (ext === '.webp') contentType = 'image/webp';

  const fileBuffer = fs.readFileSync(assetPath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400', // Cache for a day
    },
  });
}
