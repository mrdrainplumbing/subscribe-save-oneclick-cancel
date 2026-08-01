#!/bin/zsh

set -euo pipefail

readonly FIREFOX='/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox'
readonly PORT="${FIREFOX_DEBUG_PORT:-9222}"
readonly REMOTE="${1:-${FIREFOX_DEBUG_REMOTE:-dev@192.168.100.210}}"

if [[ ! -x "$FIREFOX" ]]; then
    echo "Firefox Developer Edition was not found at: $FIREFOX" >&2
    exit 1
fi

if pgrep -f "$FIREFOX" >/dev/null; then
    echo 'Quit Firefox Developer Edition with Cmd+Q, then run this script again.' >&2
    exit 1
fi

if nc -z 127.0.0.1 "$PORT" 2>/dev/null; then
    echo "Port $PORT is already in use on the Mac." >&2
    exit 1
fi

firefox_pid=''

cleanup() {
    echo
    echo 'Stopping the Firefox debugging session...'
    if [[ -n "$firefox_pid" ]]; then
        kill "$firefox_pid" 2>/dev/null || true
        wait "$firefox_pid" 2>/dev/null || true
    fi
}

trap cleanup EXIT INT TERM

"$FIREFOX" --remote-debugging-port "$PORT" &
firefox_pid=$!

echo 'Waiting for Firefox Developer Edition...'
for _ in {1..50}; do
    if nc -z 127.0.0.1 "$PORT" 2>/dev/null; then
        break
    fi
    sleep 0.2
done

if ! nc -z 127.0.0.1 "$PORT" 2>/dev/null; then
    echo "Firefox did not open debugging port $PORT." >&2
    exit 1
fi

echo "Firefox is ready. Opening a secure reverse tunnel to $REMOTE..."
echo 'Press Ctrl+C to close the tunnel and Firefox.'

ssh -N \
    -o ExitOnForwardFailure=yes \
    -R "127.0.0.1:${PORT}:127.0.0.1:${PORT}" \
    "$REMOTE"
