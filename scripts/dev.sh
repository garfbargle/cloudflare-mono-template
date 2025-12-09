#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${DEBUG_DEV_SCRIPT:-}" ]]; then
  set -x
fi

VITE_BACKEND_ORIGIN=${VITE_BACKEND_ORIGIN:-http://127.0.0.1:8787}

cleanup() {
  trap - EXIT INT TERM
  if [[ -n "${backend_pid:-}" ]]; then
    kill "${backend_pid}" 2>/dev/null || true
  fi
  if [[ -n "${frontend_pid:-}" ]]; then
    kill "${frontend_pid}" 2>/dev/null || true
  fi
}

handle_signal() {
  cleanup
  exit 0
}

trap handle_signal INT TERM
trap cleanup EXIT

printf '\n› Starting backend (Wrangler dev)\n'
npm run dev --workspace @cloudflare-mono-template/backend &
backend_pid=$!

printf '\n› Starting frontend (Vite dev)\n'
npm run dev --workspace @cloudflare-mono-template/frontend &
frontend_pid=$!

pids=("$backend_pid" "$frontend_pid")
exit_code=0
for pid in "${pids[@]}"; do
  if wait "${pid}"; then
    exit_code=0
  else
    exit_code=$?
    break
  fi
done

cleanup
exit "${exit_code}"
