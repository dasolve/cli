import { $, Glob } from "bun";
import path from "node:path";
import { internalPath, paths } from "./paths";
import mustache from "mustache";
import logDebug from "./logDebug";

type TemplateName = "init";

function templatePath(templateName: TemplateName) {
  return internalPath("templates", templateName);
}

export async function copyTemplate(
  templateName: TemplateName,
  destinationPath: string
) {
  await $`rm -rf ${destinationPath}/*`.nothrow().quiet();
  await $`rm -rf ${destinationPath}/.*`.nothrow().quiet();
  await $`cp -r ${templatePath(templateName)}/. ${destinationPath}/`;
}

export async function renderTemplate(
  destinationPath: string,
  templateVariables: Record<string, string>
) {
  logDebug("Rendering template files with variables", templateVariables);
  const glob = new Glob("**/*.mustache");
  for await (const file of glob.scan({ cwd: destinationPath, dot: true })) {
    const fullPath = path.join(destinationPath, file);
    logDebug("Rendering template file", fullPath);
    const fileToRender = Bun.file(fullPath);
    const fileContent = await fileToRender.text();
    logDebug("FileContent", fileContent);
    const renderedContent = mustache.render(
      await fileToRender.text(),
      templateVariables
    );
    logDebug("Rendered Content", renderedContent);
    await Bun.write(file.replace(".mustache", ""), renderedContent);
    await Bun.file(fullPath).delete();
  }
}

async function cleanTemplateFiles(onlyCache = true) {
  logDebug("Cleaning up template files");
  const templatesZipPath = internalPath(paths.cacheFolder, "templates.zip");
  const templatesUnzippedFolder = internalPath(
    paths.cacheFolder,
    "templates-main"
  );
  const templatesFile = Bun.file(templatesZipPath);
  (await templatesFile.exists()) && (await templatesFile.delete());
  await $`rm -rf ${templatesUnzippedFolder}`;
  logDebug("Cache template files cleaned up");
  if (onlyCache) return;
  await $`rm -rf *`.cwd(paths.templatesFolder);
  logDebug("Templates folder cleaned up");
}

export async function fetchTemplates() {
  await cleanTemplateFiles(false);

  console.log("Fetching templates from GitHub...");
  const templatesZipPath = internalPath(paths.cacheFolder, "templates.zip");
  const templatesFile = Bun.file(templatesZipPath);
  const response = await fetch(paths.templatesRemoteArchive);
  if (!response.ok) throw new Error("Failed to download template from GitHub");
  await Bun.write(templatesFile, response);
  logDebug("Templates Downloaded");

  logDebug("Unpacking Templates");
  await $`unzip -q ${templatesZipPath}`.cwd(paths.cacheFolder);
  logDebug("Templates Unpacked");

  logDebug("Saving Templates");
  await $`mv templates-main/* ${paths.templatesFolder}`.cwd(paths.cacheFolder);
  logDebug("Templates Saved");
  await cleanTemplateFiles(true);
}
