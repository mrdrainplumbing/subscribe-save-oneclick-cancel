# Amazon Subscribe & Save one-click cancel browser extension

Easy way to cancel Amazon Subscribe & Save subscriptions with just one button click.

![Explanation image](https://github.com/longzheng/chrome-subscribe-save-oneclick-cancel/assets/484912/aca44179-f7b8-4fa2-b2ed-3c4770ff82fd)

- Supports Amazon.com, Amazon.ca, Amazon.co.uk, Amazon.de, Amazon.fr, Amazon.it, Amazon.es, Amazon.co.jp, Amazon.in, and Amazon.com.au (additional country URL need to be added to `manifest.config.ts`)
- Adds "One-click cancel" button to each subscription
- Adds "One-click cancel all" to each delivery schedule
- Adds "One-click cancel all" to all subscriptions
- Automatically clicks through the subscription dialog to cancel
- After cancellation, redirects users back to the "Deliveries" tab to cancel more subscriptions

## Development

This project uses the `create-crxjs` Vite-based extension structure and builds separate Chrome and Firefox packages.

- `pnpm run dev` - run Vite in watch mode for extension development
- `pnpm run build` - generate production builds in `dist/chrome/` and `dist/firefox/`
- `pnpm run build:chrome` - build only the Chrome extension
- `pnpm run build:firefox` - build only the Firefox extension
- `pnpm run build-zip` - build both browsers and create their store-ready ZIP archives
- `pnpm run lint` - run oxlint using the project configuration
- `pnpm run format` - format the codebase with oxfmt

Pushing a version tag such as `v1.0.10` runs the build workflow, creates a GitHub Release with generated release notes, and attaches the Chrome ZIP and Mozilla-signed Firefox XPI. Firefox signing uses the `AMO_JWT_ISSUER` and `AMO_JWT_SECRET` GitHub Actions repository secrets.

## Install from Chrome Web Store

https://chrome.google.com/webstore/detail/lmhmoofhakpnlfighmgfkoonfkbjjgfh?authuser=0&hl=en-AU

## Install locally in Chrome

1. Build the project with `pnpm install` and `pnpm run build`
1. Open Chrome "Manage Extensions" page `chrome://extensions/`
1. Enable "Developer mode" toggle in top right corner
1. Click "Load unpacked" button and select the `dist/chrome` folder in the project

## Install locally in Firefox

1. Build the project with `pnpm install` and `pnpm run build`
1. Open Firefox's debugging page at `about:debugging#/runtime/this-firefox`
1. Click "Load Temporary Add-on"
1. Select `dist/firefox/manifest.json`

Temporary add-ons are removed when Firefox exits. The Firefox build includes the add-on ID and data-collection declaration required for signing and submission to addons.mozilla.org.
