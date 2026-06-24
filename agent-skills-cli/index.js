#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const program = new Command();

program
  .name('my-agent-skills')
  .description('CLI to install skills into your AI agents')
  .version('1.0.0');

program
  .command('add <skill-name>')
  .description('Download and install a skill into .agents/skills/')
  .option('-r, --repo <url>', 'Repository URL (optional)')
  .action(async (skillName, options) => {
    console.log(`Installing skill: ${skillName}...`);

    const fileUrl = `http://localhost:3000/api/skills/${skillName}`;

    try {
      console.log(`Fetching from ${fileUrl}...`);
      const response = await axios.get(fileUrl);
      const content = response.data;

      // Find the user's project root (assuming they run this command in their project root)
      const targetDir = path.join(process.cwd(), '.agents', 'skills', skillName);
      
      // Ensure directory exists
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Write the file
      const filePath = path.join(targetDir, 'SKILL.md');
      fs.writeFileSync(filePath, content, 'utf8');

      console.log(`\n✅ Success! Skill '${skillName}' has been installed to ${filePath}`);
      console.log(`You can now use this skill with your local agents.`);
    } catch (error) {
      console.error(`\n❌ Failed to install skill '${skillName}':`);
      console.error(error.message);
      console.log('Ensure the skill exists in your remote repository.');
    }
  });

program.parse(process.argv);
