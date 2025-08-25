export default function logDebug(...args: Parameters<typeof console.debug>) {
  if (process.env.DEBUG) console.warn("DEBUG:", ...args);
  if (process.env.TRACE) console.trace();
}
