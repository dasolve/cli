# Contributing to Dasolve CLI

Thank you for your interest in contributing to Dasolve CLI! We welcome all kinds of contributions.

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/dasolve/cli.git
cd cli

# Install dependencies
bun install

# Run locally
bun run cli
```

### Scripts

```bash
# Run the CLI locally
bun run cli

# Run linting
bun run lint

# Type checking
bun run typecheck
```

### Project Structure

```
src/
├── cli.ts                 # Main CLI entry point
├── commands/
│   ├── dasolve-init.ts    # Project initialization command
│   ├── dasolve-upgrade.ts # CLI upgrade command
│   └── dasolve-clean.ts   # Clean CLI temp files command
└── helpers/
    ├── logDebug.ts        # Debug logging utilities
    ├── paths.ts           # Path helpers for internal directories
    └── templates.ts       # Template fetching and rendering utilities
```

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun run lint` and `bun run typecheck`
5. Submit a pull request

---

For more information, see the main README or open an issue if you have questions.
