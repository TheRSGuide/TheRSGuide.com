#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const gitDir = path.join(process.cwd(), '.git');
const contentDir = path.join(process.cwd(), 'content');

// Submodule configuration from .gitmodules
const SUBMODULE_URL = 'https://github.com/TheRSGuide/TheRSGuide.git';
const SUBMODULE_PATH = 'content';

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
    try {
      const contentFiles = fs.readdirSync(contentDir);
      if (contentFiles.length > 0) {
        console.log('Content directory already exists with files. Skipping submodule update.');
        console.log('If you need to update the submodule, ensure .git directory is available.');
      } else {
        console.warn('Content directory exists but is empty. Fetching submodule content...');
        fetchSubmoduleContent();
      }
    } catch (error) {
      console.warn('Error reading content directory:', error.message);
      fetchSubmoduleContent();
    }
  } else {
    console.log('Content directory does not exist. Fetching submodule content...');
    fetchSubmoduleContent();
  }
}

function fetchSubmoduleContent() {
  try {
    console.log(`Cloning submodule from ${SUBMODULE_URL}...`);
    
    // Remove empty content directory if it exists
    if (fs.existsSync(contentDir)) {
      fs.rmSync(contentDir, { recursive: true, force: true });
    }
    
    // Clone the submodule repository directly
    execSync(`git clone --depth 1 ${SUBMODULE_URL} ${SUBMODULE_PATH}`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('Submodule content fetched successfully.');
  } catch (error) {
    console.error('ERROR: Failed to fetch submodule content:', error.message);
    console.error('Please ensure:');
    console.error('1. Git is installed and available in PATH');
    console.error('2. Network access to GitHub is available');
    console.error('3. Or set RAILWAY_GIT_CLONE_FLAGS="--recursive --depth 1" in Railway environment variables');
    process.exit(1);
  }
}

