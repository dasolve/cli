import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";
import { internalPath } from "../helpers/paths";

new Command("clean")
  .description("Clean the CLI temp files")
  .action(async () => {
    const destinationPath = internalPath();
    await $`rm -rf ${destinationPath}`.nothrow().quiet();
    console.log(`🧹 ${destinationPath} cleaned up`);
  })
  .parse();
