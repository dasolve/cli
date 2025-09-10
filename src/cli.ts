#!/usr/bin/env bun
import { program } from "@commander-js/extra-typings";
import packageJson from "../package.json";
import { createPathIfNotExists, paths } from "./helpers/paths";
import { semver } from "bun";
import { installGit } from "./helpers/git";

if (typeof Bun === "undefined")
  throw new Error(
    "You need to run `dasolve` with Bun. Do `bunx dasolve [command]`"
  );

if (!semver.satisfies(Bun.version, ">=1.2.21"))
  throw new Error("You need to update Bun to version 1.2.21 or higher");

if (!["darwin", "linux"].includes(process.platform))
  throw new Error("Dasolve only supports macOS and Linux");

createPathIfNotExists(paths.cacheFolder);

await installGit();

program
  .name("dasolve")
  .version(packageJson.version)
  .description("CLI for managing Dasolve projects")
  .executableDir("commands")
  .command("init", "Initialize a new Dasolve project")
  .command("start", "Start the solution locally")
  .command("frontend", "Frontend development")
  .command("upgrade", "Upgrade the CLI")
  .command("clean", "Clean the CLI temp files")
  .parse();
