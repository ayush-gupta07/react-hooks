# Documentation

This folder contains the VitePress documentation for the React Hooks project.

## Structure

```
docs/
├── .vitepress/           # VitePress configuration
│   ├── config.ts         # Main configuration file
│   └── theme/            # Custom theme
│       ├── index.ts      # Theme entry point
│       └── custom.css    # Custom styling
├── hooks/                # Hook documentation pages
│   ├── index.md          # Hooks overview page
│   ├── 01_useState.md    # useState documentation
│   ├── 02_useEffect.md   # useEffect documentation
│   └── ...               # Other hook docs
├── public/               # Static assets
│   └── logo.svg          # Site logo
└── index.md              # Homepage
```

## Development

```bash
# Start the development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Features

- **Clean Design**: Modern, professional styling
- **Responsive**: Works on all devices
- **Fast**: Optimized for performance
- **Accessible**: Screen reader friendly
- **SEO Ready**: Proper meta tags and structure

## Content Guidelines

- Keep explanations concise and clear
- Include practical examples for each hook
- Use consistent formatting and structure
- Add difficulty levels and reading time estimates
