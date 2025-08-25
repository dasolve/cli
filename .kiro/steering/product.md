# Product Overview

Dasolve CLI is a command-line tool for managing Dasolve projects. It provides project scaffolding, template management, and CLI utilities for the Dasolve framework ecosystem.

## Core Features

- **Project Initialization**: Scaffold new Dasolve projects with interactive prompts
- **Template Management**: Download and apply project templates from GitHub
- **CLI Upgrades**: Self-updating CLI tool
- **Interactive Setup**: Guided configuration with smart defaults

## Target Platforms

- macOS and Linux (primary)
- Windows support only through WSL2
- Requires Bun runtime

## Key Dependencies

- Bun runtime (required)
- Templates sourced from `github.com/dasolve/templates`
- Interactive CLI prompts using inquirer
- Template rendering with Mustache
