import { $ } from "bun";
import logDebug from "./logDebug";

export function installGit() {
  if (Bun.which("git")) {
    logDebug("Git is already installed");
    return;
  }
  console.log("🐙 Git is not installed. Installing...");
  if (process.platform === "darwin") return $`brew install git`;
  if (process.platform === "linux") return $`sudo apt-get install -y git`;
  throw new Error("Unsupported platform");
}
