const FALLBACK_VERSION = '1.0.13';
const extensionVersion = (
    globalThis as typeof globalThis & {
        process?: { env?: Record<string, string | undefined> };
    }
).process?.env?.EXTENSION_VERSION;

export const VERSION = extensionVersion || FALLBACK_VERSION;

if (!/^\d+(\.\d+){0,3}$/.test(VERSION)) {
    throw new Error(`Invalid extension version: ${VERSION}`);
}
