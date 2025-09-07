import { NpmProject } from "@simple-release/npm";

export const project = new NpmProject({
  mode: "fixed",
});

export const releaser = {
  verbose: true,
};

export const bump = {
  extraScopes: ["deps"],
};

export const publish = {
  access: "public",
};
