#!/bin/sh

node -r esm ./node_modules/.bin/barnard59 \
  run -v \
  --format text/turtle \
  --variable="inputDir=$INPUT_DIR" \
  --variable="targetFile=$OUTPUT" \
  --variable="mappingsDir=$MAPPINGS_DIR" \
  --pipeline=urn:pipeline:bar#Main pipelines/main.ttl
