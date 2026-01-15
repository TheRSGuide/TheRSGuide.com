# The RS Guide

A comprehensive guide website for RuneScape players, covering everything from beginner basics to endgame content.

**Live Site:** [thersguide.com](https://thersguide.com)
**Beta Site:** [beta.thersguide.com](https://beta.thersguide.com)

## About

The RS Guide is designed to help RuneScape players of all experience levels. Whether you're just starting out or looking to optimize your endgame setup, this site provides guides on:

- **Getting Started** - Combat basics, the combat triangle, keybinds, and prayers/curses
- **Setup** - Client settings, interface layouts, and recommended configurations
- **Progression Guides** - Early, mid, and late-game quest and unlock paths
- **Combat Styles** - Magic, Melee, Ranged, and Necromancy ability guides

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [Fumadocs](https://fumadocs.dev/) - Documentation framework
- [MDX](https://mdxjs.com/) - Markdown with JSX components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Development

### Prerequisites

- Node.js 20+
- npm

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Building for Production

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t thersguide .
docker run -p 3000:3000 thersguide
```

## Project Structure

```
├── content/           # MDX content files
│   ├── getting-started/
│   ├── guides/
│   └── setup/
├── src/
│   ├── app/           # Next.js app router pages
│   └── mdx_components/ # Custom MDX components
└── source.config.ts   # Fumadocs configuration
```

## Contributing

We welcome contributions! See the [content README](content/README.md) for guidelines on contributing to the guides.

- **Online Editor:** [editor.thersguide.com](https://editor.thersguide.com) - Preview and test MDX content
- **Discord:** [discord.gg/thersguy](https://discord.gg/thersguy) - Get help and discuss contributions

## License

All rights reserved.
