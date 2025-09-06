import { $ } from "bun";
import logDebug from "./logDebug";
import path from "node:path";

export async function getParentFolderName() {
  if (Bun.which("git")) {
    logDebug("git exists. Fetching project name from git");
    const projectName = (
      await $`git rev-parse --show-toplevel`.nothrow().text()
    )
      .split("/")
      .at(-1)
      ?.trim();
    logDebug("Project name from git:", projectName);
    if (projectName) return projectName;
  }
  return path.basename(process.cwd());
}
