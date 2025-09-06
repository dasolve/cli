import { join } from "node:path";
import logDebug from "./logDebug";
import { existsSync, mkdirSync } from "node:fs";

export function internalPath(...path: string[]) {
  const internalFolder = join(
    process.env.HOME ?? process.env.USERPROFILE ?? "~",
    ".dasolve"
  );
  return join(internalFolder, ...path);
}

export const paths = {
  // TODO: this must follow the git tags matching the CLI version
  templatesRemoteArchive:
    "https://github.com/dasolve/templates/archive/refs/heads/main.zip",
  cacheFolder: internalPath("cache"),
  templatesZipFile: internalPath("cache", "templates.zip"),
  templatesUnzippedFolder: internalPath("cache", "templates-main"),
  template: (name: string) => internalPath("cache", "templates-main", name),
} as const;

logDebug("Paths:", paths);

export function createPathIfNotExists(path: string) {
  if (existsSync(path)) return;
  logDebug("Creating path:", path);
  mkdirSync(path, { recursive: true });
}
