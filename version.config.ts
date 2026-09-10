const FALLBACK_VERSION = '2026.9.10.1';
const extensionVersion = (
    globalThis as typeof globalThis & {
        process?: { env?: Record<string, string | undefined> };
    }
).process?.env?.EXTENSION_VERSION;

export const VERSION = extensionVersion || FALLBACK_VERSION;

if (!/^\d+(\.\d+){0,3}$/.test(VERSION)) {
    throw new Error(`Invalid extension version: ${VERSION}`);
}
