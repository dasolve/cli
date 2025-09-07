# Contributing to Dasolve CLI

Thank you for your interest in contributing to Dasolve CLI! We welcome all kinds of contributions.

> **Note:** Development is only supported on macOS, Linux, or Windows via WSL2. Native Windows development is not supported.

## � Quick Start

### Prerequisites

- Git
- [proto](https://moonrepo.dev/docs/proto) (for toolchain management)

### Setup

1. **Install proto** (if not already installed):

```bash
bash <(curl -fsSL https://moonrepo.dev/install/proto.sh)
```

After installation, restart your terminal or run `source ~/.zshrc` (or the appropriate file for your shell).

2. **Clone and setup the project**:

```bash
# Clone the repository
git clone https://github.com/dasolve/cli.git
cd cli

# Install the toolchain (Bun, npm, Node, etc.)
proto use

# Install dependencies
bun install
```

3. **Verify the setup**:

```bash
bun run cli
```

## 🛠️ Development

### Available Scripts

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

## 🔄 Contribution Workflow

1. **Fork the repository** on GitHub
2. **Create a feature branch** from `main`:

```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes** and commit them:

```bash
git add .
git commit -m "feat: your feature description"
```

4. **Run tests and checks**:

```bash
bun run lint
bun run typecheck
```

5. **Push to your fork**:

```bash
git push origin feature/your-feature-name
```

6. **Submit a pull request** to the main repository

## 📝 Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new functionality when applicable
- Update documentation as needed
- Ensure all checks pass before submitting

---

For more information, see the main [README](README.md) or [open an issue](https://github.com/dasolve/cli/issues) if you have questions.
