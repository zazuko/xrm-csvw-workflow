#!/bin/bash

variables=()

[[ -n "$INPUT_DIR" ]] && variables+=(--variable="inputDir=$INPUT_DIR")
[[ -n "$OUTPUT" ]] && variables+=(--variable="targetFile=$OUTPUT")
[[ -n "$MAPPINGS" ]] && variables+=(--variable="mappings=$MAPPINGS")

yarn barnard59 \
  run \
  "${variables[@]}" \
  "$@" \
  --pipeline urn:pipeline:xrm#Main pipelines/main.ttl
