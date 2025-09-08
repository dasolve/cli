import { $ } from "bun";
import logDebug from "./logDebug";

export async function installProto() {
  if (Bun.which("proto")) {
    logDebug("Proto is already installed");
    return;
  }
  await $`curl -fsSL https://moonrepo.dev/install/proto.sh | bash`;
}

export async function installToolchain() {
  if (!Bun.which("proto")) await installProto();
  await $`proto install`;
}
