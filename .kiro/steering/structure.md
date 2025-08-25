# Project Structure

## Root Directory

```
├── src/                    # Source code
├── dist/                   # Build output (types only)
├── .kiro/                  # Kiro AI assistant configuration
├── .github/                # GitHub workflows and templates
├── .vscode/                # VS Code settings
└── node_modules/           # Dependencies
```

## Source Organization

```
src/
├── cli.ts                  # Main CLI entry point with shebang
├── commands/               # Command implementations
│   ├── dasolve-init.ts    # Project initialization
│   └── dasolve-upgrade.ts # CLI self-upgrade
└── helpers/               # Utility modules
    ├── logDebug.ts        # Debug logging utility
    ├── paths.ts           # Path management and cache
    └── templates.ts       # Template fetching and rendering
```

## Architecture Patterns

### Command Structure

- Each command is a separate executable file in `src/commands/`
- Commands use `@commander-js/extra-typings` for type safety
- Main CLI delegates to command files using `.executableDir("commands")`

### Helper Organization

- **paths.ts**: Manages internal paths (`~/.dasolve/`) and cache locations
- **templates.ts**: Handles GitHub template fetching, copying, and Mustache rendering
- **logDebug.ts**: Conditional debug logging based on environment variables

### File Naming Conventions

- Command files: `dasolve-[command].ts`
- Helper files: descriptive names in camelCase
- Configuration files: standard dotfile conventions

### Key Patterns

- Bun runtime validation at startup
- Cache management in `~/.dasolve/cache/`
- Template variables with Mustache syntax
- Interactive prompts with validation
- Shell command execution using Bun's `$` template literal
