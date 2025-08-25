import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";
import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import {
  copyTemplate,
  fetchTemplates,
  renderTemplate,
} from "../helpers/templates";

new Command("init")
  .description("Initialize a new Dasolve project")
  .action(async () => {
    const targetDir = process.cwd();
    try {
      // Get default project name from git if available
      let defaultProjectName;
      try {
        defaultProjectName = (await $`git rev-parse --show-toplevel`.text())
          .split("/")
          .at(-1)
          ?.trim();
      } catch {
        defaultProjectName = path.basename(process.cwd());
      }

      const emptyFolder = fs.readdirSync(targetDir).length === 0;

      // Collect project information
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Solution name:",
          validate: (input) =>
            input.trim() !== "" || "Solution name is required",
          default: defaultProjectName,
        },
        {
          type: "input",
          name: "description",
          message: "Solution short description:",
          default: `${defaultProjectName} solution`,
        },
        {
          type: "confirm",
          name: "delete",
          message:
            "Your current folder contents will be PERMANENTLY DELETED. Do you agree to that?",
          default: false,
          when: () => !emptyFolder,
        },
      ]);

      if (!answers.delete && !emptyFolder) {
        console.error("Aborting project initialization.");
        process.exit(1);
      }

      await fetchTemplates();

      console.log(`Creating new Dasolve project in ${targetDir}`);

      // Create variables for template substitution
      const templateVars = {
        name: answers.name,
        description: answers.description,
        year: new Date().getFullYear().toString(),
        token: "valid-token",
        version: "v1",
      };

      await copyTemplate("init", targetDir);
      await renderTemplate(targetDir, templateVars);

      console.log("🎉 Dasolve project initialized successfully!");
    } catch (error) {
      console.error("Error initializing project:", error.message);
      process.exit(1);
    }
  })
  .parse();
