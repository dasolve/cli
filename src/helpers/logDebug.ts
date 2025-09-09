import { styleText } from "node:util";

export default function logDebug(...args: Parameters<typeof console.debug>) {
  const header = styleText("bgWhite", "DEBUG:");
  if (process.env.DEBUG) console.warn(header, ...args);
  if (process.env.TRACE) console.trace();
}
