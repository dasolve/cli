# Dasolve CLI

<div align="center">

🚀 **The CLI for managing Dasolve projects**

[![License: FSL-1.1-ALv2](https://img.shields.io/badge/License-FSL--1.1--ALv2-blue.svg)](LICENSE.md)
[![Release](https://github.com/dasolve/cli/actions/workflows/release.yml/badge.svg)](https://github.com/dasolve/cli/actions/workflows/release.yml)
[![npm version](https://badge.fury.io/js/dasolve.svg)](https://www.npmjs.com/package/dasolve)

</div>

## ✨ Features

- **Project Initialization**: Quickly scaffold new Dasolve projects with best practices
- **Template Management**: Automatically downloads and applies project templates
- **Interactive Setup**: Guided project configuration with smart defaults
- **Bun-Powered**: Built for speed and modern JavaScript/TypeScript development

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) runtime (required)
- macOS or Linux (Windows only supported through WSL2)

### Installation

```bash
# Run directly with bunx (recommended)
bunx dasolve [command]

# Or install globally
bun add -g dasolve
```

### Initialize a New Project

```bash
# Navigate to your project directory
cd my-new-project

# Initialize with interactive prompts
bunx dasolve init
```

The CLI will guide you through:

- Project name configuration
- Description setup
- Template application with smart defaults

## 📖 Commands

### `dasolve init`

Initialize a new Dasolve project in the current directory.

```bash
dasolve init
```

**What it does:**

- Downloads the latest project templates from GitHub
- Prompts for project configuration
- Applies templates with variable substitution
- Sets up your project structure with best practices

### `dasolve clean`

Clean the CLI temp files (removes the internal cache/temp directory used by Dasolve).

```bash
dasolve clean
```

**What it does:**

- Deletes the internal temp/cache directory used by Dasolve
- Useful for troubleshooting or freeing up disk space

### `dasolve upgrade`

Upgrade the Dasolve CLI to the latest version.

```bash
dasolve upgrade
```

**What it does:**

- Updates the globally installed Dasolve CLI to the latest version
- Uses Bun's package manager for fast, reliable updates
- Ensures you have access to the newest features and bug fixes

## 🤝 Contributing to the project

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for development setup, workflow, and project structure.

## 📄 License

This project is licensed under the [FSL-1.1-ALv2](LICENSE) license.

## 🔗 Links

- [Dasolve Website](https://dasolve.com)
- [GitHub Repository](https://github.com/dasolve/cli)
- [Issue Tracker](https://github.com/dasolve/cli/issues)
- [Templates Repository](https://github.com/dasolve/templates)

---

<div align="center">
Made with ❤️ by the Dasolve team
</div>
