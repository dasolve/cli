import { $, Glob } from "bun";
import path from "node:path";
import { paths } from "./paths";
import mustache from "mustache";
import logDebug from "./logDebug";
import { existsSync } from "node:fs";

type TemplateName = "init";

export async function copyTemplate(
  templateName: TemplateName,
  destinationPath: string
) {
  await $`rm -rf ${destinationPath}/*`.nothrow().quiet();
  await $`rm -rf ${destinationPath}/.*`.nothrow().quiet();
  await $`cp -r ${paths.template(templateName)}/. ${destinationPath}/`;
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

async function cleanTemplateFiles() {
  const templatesZipPath = paths.templatesZipFile;
  logDebug("Check Cleaning up template zip file", templatesZipPath);
  if (existsSync(templatesZipPath)) {
    logDebug("Cleaning up template files", templatesZipPath);
    await $`rm -f ${templatesZipPath}`.nothrow().quiet();
  }
  const templatesUnzippedFolder = paths.templatesUnzippedFolder;
  logDebug(
    "Check Cleaning up template unzipped folder",
    templatesUnzippedFolder
  );
  if (existsSync(templatesUnzippedFolder)) {
    logDebug("Cleaning up template unzipped folder", templatesUnzippedFolder);
    await $`rm -rf ${templatesUnzippedFolder}`.nothrow().quiet();
  }
  logDebug("Cache template files cleaned up");
}

export async function fetchTemplates() {
  console.log("Fetching templates from GitHub...");

  await cleanTemplateFiles();
  const templatesZipPath = paths.templatesZipFile;
  const templatesFile = Bun.file(templatesZipPath);
  logDebug("Downloading templates from", paths.templatesRemoteArchive);
  const response = await fetch(paths.templatesRemoteArchive);
  if (!response.ok) throw new Error("Failed to download template from GitHub");
  await Bun.write(templatesFile, response);
  logDebug("Templates downloaded to", templatesZipPath);

  if (!Bun.which("unzip"))
    throw new Error("Unzip command not found. Please install unzip.");
  logDebug("Unpacking Templates to", paths.templatesUnzippedFolder);
  await $`unzip -q ${templatesZipPath}`.cwd(paths.cacheFolder);
  logDebug("Templates Unpacked to", paths.templatesUnzippedFolder);
}
