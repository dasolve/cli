#!/usr/bin/env bun
import { program } from "@commander-js/extra-typings";
import packageJson from "../package.json";
import { createPathIfNotExists, paths } from "./helpers/paths";
import { semver } from "bun";

if (typeof Bun === "undefined")
  throw new Error(
    "You need to run `dasolve` with Bun. Do `bunx dasolve [command]`"
  );

if (!semver.satisfies(Bun.version, ">=1.2.21"))
  throw new Error("You need to update Bun to version 1.2.21 or higher");

createPathIfNotExists(paths.cacheFolder);

program
  .name("dasolve")
  .version(packageJson.version)
  .description("CLI for managing Dasolve projects")
  .executableDir("commands")
  .command("init", "Initialize a new Dasolve project")
  .command("upgrade", "Upgrade the CLI")
  .command("clean", "Clean the CLI temp files")
  .parse();
