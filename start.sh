#!/bin/bash

yarn barnard59 \
  run \
  --variable MAPPINGS \
  --variable TARGET_FILE \
  "$@" \
  --pipeline urn:pipeline:xrm#Main pipelines/main.ttl
