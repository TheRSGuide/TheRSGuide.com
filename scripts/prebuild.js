#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const gitDir = path.join(process.cwd(), '.git');
const contentDir = path.join(process.cwd(), 'content');

// Check if .git directory exists
if (fs.existsSync(gitDir)) {
  try {
    console.log('Git repository detected. Updating submodules...');
    execSync('git submodule update --init --recursive', { stdio: 'inherit' });
    console.log('Submodules updated successfully.');
  } catch (error) {
    console.error('Error updating submodules:', error.message);
    process.exit(1);
  }
} else {
  console.log('No .git directory found. Checking if content directory exists...');
  
  // Check if content directory exists and has files
  if (fs.existsSync(contentDir)) {
    const contentFiles = fs.readdirSync(contentDir);
    if (contentFiles.length > 0) {
      console.log('Content directory already exists with files. Skipping submodule update.');
      console.log('If you need to update the submodule, ensure .git directory is available.');
    } else {
      console.warn('Content directory exists but is empty. Submodule may not be initialized.');
      console.warn('Please ensure the content directory is populated before building.');
    }
  } else {
    console.error('ERROR: Content directory does not exist and cannot initialize submodule without .git');
    console.error('Please ensure the content directory is present before building.');
    process.exit(1);
  }
}

