# Technology Stack

## Runtime & Build System

- **Runtime**: Bun (required) - modern JavaScript runtime and package manager
- **Language**: TypeScript with strict mode enabled
- **Module System**: ESNext modules with bundler resolution
- **Package Manager**: Bun with exact version locking

## Key Libraries

- **CLI Framework**: `@commander-js/extra-typings` for type-safe command definitions
- **Interactive Prompts**: `inquirer` for user input collection
- **Template Engine**: `mustache` for variable substitution in templates

## Code Quality Tools

- **Linter**: Oxlint with correctness, pedantic, and performance rules
- **Formatter**: Prettier with ES5 trailing commas
- **Type Checker**: TypeScript compiler in strict mode

## Common Commands

```bash
# Development
bun run cli                 # Run CLI locally
bun install                 # Install dependencies

# Quality Checks
bun run lint               # Run Oxlint
bun run typecheck          # TypeScript type checking

# Distribution
bun run cli                # Test CLI functionality
bunx dasolve [command]     # Run published version
```

## Configuration Notes

- Uses `bunfig.toml` with telemetry disabled and exact installs
- TypeScript configured for ESNext target with strict checking
- Emits declaration files only (runtime handled by Bun)
