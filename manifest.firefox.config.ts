import type { ConfigEnv } from 'vite';
import chromeManifestExport from './manifest.config';

export default async function createFirefoxManifest(environment: ConfigEnv) {
    const chromeManifest =
        typeof chromeManifestExport === 'function'
            ? await chromeManifestExport(environment)
            : await chromeManifestExport;

    return {
        ...chromeManifest,
        browser_specific_settings: {
            gecko: {
                id: 'subscribe-save-oneclick-cancel@longzheng.net',
                strict_min_version: '140.0',
                data_collection_permissions: {
                    required: ['none'] as ['none'],
                },
            },
            gecko_android: {
                strict_min_version: '142.0',
            },
        },
    };
}
