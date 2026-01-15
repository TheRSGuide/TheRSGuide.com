# Contributing to The RS Guide

Welcome! This directory contains the MDX content for The RS Guide website, built with [Fumadocs](https://fumadocs.dev/).

> [!TIP]
> Updates made to the content here will be reflected on the [BETA site](https://beta.thersguide.com), not the [LIVE site](https://thersguide.com).
> The transition from the live site to the beta site is set to happen in January of 2025

## Table of Contents

- [How to Contribute](#how-to-contribute)
  - [Creating Issues](#creating-issues)
  - [Opening Pull Requests](#opening-pull-requests)
- [Documentation](#documentation)
  - [Understanding MDX](mdx-guide.md)
  - [JSX Components in MDX](jsx-components.md)
  - [Meta.json Files](meta-json-guide.md)
  - [Components Reference](components.md)
- [File Structure](#file-structure)
- [Need Help?](#need-help)

## How to Contribute

We welcome contributions from everyone! There are two main ways to contribute:

> [!TIP]
> Need help writing or editing MDX content? Check out our [online editor](https://editor.thersguide.com) which includes our full MDX component library, making it easy to preview and test your content before submitting a pull request.

### Creating Issues

If you've found a problem, have a suggestion, or want to request new content, please create an issue on GitHub:

1. Go to the [Issues](https://github.com/TheRSGuide/TheRSGuide-Content/issues) page
2. Click "New Issue"
3. Choose the appropriate issue template (if available) or select "Get started" for a blank issue
4. Fill in the title and description with:
   - What you'd like to see changed or added
   - Why it would be helpful
   - Any relevant details or examples
5. Click "Submit new issue"

### Opening Pull Requests

If you'd like to make changes directly to the content, you can open a pull request (PR). Here's how:

#### Option 1: Fork the Repository (Recommended for External Contributors)

1. **Fork the repository** by clicking the "Fork" button at the top right of the GitHub page
2. **Clone your fork** to your computer:
   ```bash
   git clone https://github.com/TheRSGuide/TheRSGuide-Content.git
   cd TheRSGuide
   ```
3. **Create a new branch** for your changes.
   ```bash
   git checkout -b your-branch-name
   ```

    > Replace `"your-branch-name"` with a brief description of what you will be contributing (e.g., `"fix-typeo-in-guide"` or `"fix-directions-in-guide"`). Avoid using the placeholder name `"your-branch-name"`.
4. **Make your changes** to the MDX files (see the [Documentation](#documentation) section for detailed guides)
5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "A short summary of your changes"
   ```

    > Replace `"A short summary of your changes"` with a brief but specific explanation of what you changed (e.g., `"Fix typo in melee guide"` or `"Add new section on threshold abilities"`). Avoid using the placeholder message of `"add description of your changes"`.
6. **Push to your fork**:
   ```bash
   git push origin your-branch-name
   ```

    > Replace `"your-branch-name"` with the name of the branch you chose in step 3.
7. **Open a Pull Request**:
   - Go to the repository on [GitHub](https://github.com/TheRSGuide/TheRSGuide-Content)
   - You should see a banner suggesting to create a PR from your recent push
   - Click "Compare & pull request"
   - Fill in the PR description explaining your changes
   - Click "Create pull request"

## Documentation

For detailed guides on working with this repository, see the following documentation files:

- **[Understanding MDX](mdx-guide.md)** - Learn about MDX file format, structure, and frontmatter
- **[JSX Components in MDX](jsx-components.md)** - Understand how to use JSX components in your content
- **[Meta.json Files](meta-json-guide.md)** - Learn how to manage navigation structure with meta.json files
- **[Components Reference](components.md)** - Complete reference for available JSX components

## File Structure

The content is organized in the `content/` directory with the following structure:

```
content/
├── getting-started/
│   ├── meta.json
│   ├── index.mdx
│   ├── combat-basics.mdx
│   └── combat-options/
│       ├── meta.json
│       ├── index.mdx
│       └── ...
├── guides/
│   ├── meta.json
│   ├── early-game/
│   ├── mid-game/
│   └── late-game/
└── setup/
    ├── meta.json
    └── ...
```

Each directory can contain:

- MDX files (the actual content)
- A `meta.json` file (defines page order)
- Subdirectories (for organizing related content)

## Need Help?

If you have questions or need clarification:

- Join our [Discord server](https://discord.gg/thersguy) to ask questions and get help
- Open an issue on GitHub with your question
- Check existing issues and pull requests for examples
- Ask in your pull request description - we're happy to help!

Thank you for contributing to The RS Guide!
