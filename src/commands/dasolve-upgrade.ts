import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";

new Command("upgrade")
  .description("Upgrade daSolve to the latest version")
  .action(async () => {
    console.log("Upgrading Dasolve CLI...");
    await $`bun update dasolve --global --latest --no-save`;
  })
  .parse();
