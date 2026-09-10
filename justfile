install:
    pnpm install --frozen-lockfile

format:
    pnpm run format

check:
    pnpm run format:check
    pnpm run lint
    pnpm run test
    pnpm run build
    pnpm exec vite build --mode firefox

build-chrome:
    pnpm run build

build-firefox:
    pnpm exec vite build --mode firefox

package-chrome:
    pnpm run build-zip

package-firefox: build-firefox
    cd dist/firefox && zip -r ../../firefox-subscribe-save-oneclick-cancel.zip .
