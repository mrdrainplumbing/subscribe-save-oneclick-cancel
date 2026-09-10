import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import chromeManifest from './manifest.config';
import firefoxManifest from './manifest.firefox.config';
import { VERSION } from './version.config';

export default defineConfig(({ mode }) => {
    const isFirefox = mode === 'firefox';

    return {
        build: isFirefox ? { outDir: 'dist/firefox' } : undefined,
        define: {
            EXTENSION_VERSION: JSON.stringify(VERSION),
        },
        plugins: [
            crx({
                manifest: isFirefox ? firefoxManifest : chromeManifest,
                browser: isFirefox ? 'firefox' : 'chrome',
            }),
        ],
    };
});
