import { Command } from "@commander-js/extra-typings";
import inquirer from "inquirer";
import fs from "fs";
import {
  copyTemplate,
  fetchTemplates,
  renderTemplate,
} from "../helpers/templates";
import logDebug from "../helpers/logDebug";
import { getParentFolderName } from "../helpers/getParentFolderName";

new Command("init")
  .description("Initialize a new Dasolve project")
  .action(async () => {
    const targetDir = process.cwd();
    logDebug("Target directory:", targetDir);
    try {
      // Get default project name from git if available
      const defaultProjectName = await getParentFolderName();

      const emptyFolder = fs.readdirSync(targetDir).length === 0;
      logDebug("Is target directory empty?", emptyFolder);

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
