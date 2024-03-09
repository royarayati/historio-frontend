#!/bin/bash

set -Ee

for file in .next/static/css/*.css; do
    sed -i -E 's/(--token-[a-zA-Z0-9_-]{12})/\L\1/g' "$file"
    sed -i -E 's/(--mixin-[a-zA-Z0-9_-]{12})/\L\1/g' "$file"
done
