#!/usr/bin/env bun
import { program } from "@commander-js/extra-typings";
import packageJson from "../package.json";
import { createPathIfNotExists, paths } from "./helpers/paths";

if (typeof Bun === "undefined")
  throw new Error(
    "You need to run `dasolve` with Bun. Do `bunx dasolve [command]`"
  );

createPathIfNotExists(paths.cacheFolder);

program
  .name("dasolve")
  .version(packageJson.version)
  .description("CLI for managing Dasolve projects")
  .executableDir("commands")
  .command("init", "Initialize a new Dasolve project")
  .command("upgrade", "Upgrade the CLI")
  .parse();
