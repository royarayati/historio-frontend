#!/bin/sh
# shellcheck source=/dev/null

set -Ee

if [ $# -eq 0 ]; then
  printf "entrypoint choice is not provided\n"
  exit 4
fi

case "$1" in
  dev)
    npm install
    exec npm run dev
    ;;
  start)
    npm install
    npm run build
    exec npm run start
    ;;
  supervisord)
    npm install
    exec supervisord
    ;;
  *)
    if [ $# -gt 0 ]; then
      exec "$@"
    fi
    exit 0
    ;;
esac

if [ $# -gt 1 ]; then
  printf "WARNING: extra args passed to the entrypoint are ignored.\n"
fi
