# Amazon Subscribe & Save one-click cancel browser extension

Easy way to cancel Amazon Subscribe & Save subscriptions with just one button click.

![Explanation image](https://github.com/longzheng/chrome-subscribe-save-oneclick-cancel/assets/484912/aca44179-f7b8-4fa2-b2ed-3c4770ff82fd)

- Supports Amazon.com, Amazon.ca, Amazon.co.uk, Amazon.de, Amazon.fr, Amazon.it, Amazon.es, Amazon.co.jp, Amazon.in, and Amazon.com.au (additional country URL need to be added to `manifest.config.ts`)
- Supports both the legacy Subscribe & Save pages and Amazon's redesigned subscriptions hub and delivery-detail pages
- Adds "One-click cancel" button to each subscription
- Adds "One-click cancel all" to each delivery schedule
- Adds "One-click cancel all" to all subscriptions
- Automatically clicks through the subscription dialog to cancel
- After cancellation, redirects users back to the "Deliveries" tab to cancel more subscriptions

## Development

This project uses the `create-crxjs` Vite-based extension structure and builds separate Chrome and Firefox packages. Project tasks are exposed through `just`.

1. `just install` - install the locked dependencies.
1. `just check` - run formatting, linting, tests, and both browser builds.
1. `just build-chrome` - generate the Chrome extension in `dist/`.
1. `just build-firefox` - generate the Firefox extension in `dist/firefox/`.
1. `just package-chrome` - create the Chrome store ZIP.
1. `just package-firefox` - create the Firefox store ZIP.
1. `pnpm run dev` - run Vite in watch mode for extension development.

Pushing a version tag such as `v1.0.14` runs the Firefox release workflow, derives the extension version from the tag, creates a GitHub Release with generated release notes, and attaches the Mozilla-signed Firefox XPI. Chrome remains covered by the regular build workflow but is not published by this fork. Local and manually dispatched builds fall back to version `1.0.13`. Firefox signing uses the `AMO_JWT_ISSUER` and `AMO_JWT_SECRET` GitHub Actions repository secrets.

## Install from Chrome Web Store

https://chrome.google.com/webstore/detail/lmhmoofhakpnlfighmgfkoonfkbjjgfh?authuser=0&hl=en-AU

## Install locally in Chrome

1. Build the project with `just install` and `just build-chrome`.
1. Open Chrome "Manage Extensions" page `chrome://extensions/`
1. Enable "Developer mode" toggle in top right corner
1. Click "Load unpacked" and select the project's `dist/` folder.

## Install locally in Firefox

1. Build the project with `just install` and `just build-firefox`.
1. Open Firefox's debugging page at `about:debugging#/runtime/this-firefox`
1. Click "Load Temporary Add-on"
1. Select `dist/firefox/manifest.json`

Temporary add-ons are removed when Firefox exits. The Firefox build includes the add-on ID and data-collection declaration required for signing and submission to addons.mozilla.org.

## Debug a live Firefox session from the development host

The macOS helper starts Firefox Developer Edition with WebDriver BiDi enabled and opens a loopback-only SSH reverse tunnel to the development host.

1. Quit Firefox Developer Edition with `Cmd+Q`.
1. Run `scripts/firefox-remote-debug-macos.zsh` on the Mac.
1. Open the page to debug.
1. Press `Ctrl+C` when finished to close both Firefox and the tunnel.

The script defaults to `dev@192.168.100.210`. Pass a different SSH destination as its first argument or set `FIREFOX_DEBUG_REMOTE`. Set `FIREFOX_DEBUG_PORT` to override port `9222`.
