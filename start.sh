#!/bin/bash

variables=()

[[ -n "$INPUT_DIR" ]] && variables+=(--variable="inputDir=$INPUT_DIR")
[[ -n "$OUTPUT" ]] && variables+=(--variable="targetFile=$OUTPUT")
[[ -n "$MAPPINGS" ]] && variables+=(--variable="mappings=$MAPPINGS")

node ./node_modules/.bin/barnard59 \
  run \
  --format text/turtle \
  "${variables[@]}" \
  "$@" \
  --pipeline urn:pipeline:xrm#Main pipelines/main.ttl
