import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import { createManifest } from './manifest.config';

export default defineConfig(({ mode }) => {
    const browser = mode === 'firefox' ? 'firefox' : 'chrome';

    return {
        build: {
            outDir: `dist/${browser}`,
        },
        plugins: [crx({ manifest: createManifest(browser) })],
    };
});
