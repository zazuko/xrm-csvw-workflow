#!/usr/bin/env node
// Reads the header row of a CSV file and generates a logical-source block
// for mappings/Sources.xrm. Usage: npm run csv2xrm -- <csv-file>

import { createReadStream, existsSync } from 'node:fs'
import { appendFile, writeFile } from 'node:fs/promises'
import { createInterface } from 'node:readline'
import { basename, extname } from 'node:path'

const SOURCES_FILE = 'mappings/Sources.xrm'
const DIALECT_BLOCK = `dialect Comma {
  delimiter ","
  quoteChar '\\\"'
}\n`

const file = process.argv[2]
if (!file) {
  console.error('Usage: npm run csv2xrm -- <csv-file>')
  process.exit(1)
}

const input = createReadStream(file)
input.on('error', err => { console.error(err.message); process.exit(1) })

const rl = createInterface({ input, terminal: false })
rl.once('line', async line => {
  rl.close()

  const delimiter = detectDelimiter(line)
  const headers = parseCSVLine(line, delimiter)
  const sourceName = basename(file, extname(file))
  const block = createBlock(sourceName, headers)

  if (existsSync(SOURCES_FILE)) {
    const answer = await ask(
      `${SOURCES_FILE} already exists. (a)ppend / (o)verwrite / (s)kip? [a] `
    )
    const choice = (answer.trim().toLowerCase() || 'a')[0]
    if (choice === 's') {
      console.log('Skipped.')
    } else if (choice === 'o') {
      await writeFile(SOURCES_FILE, DIALECT_BLOCK + '\n' + block)
      console.log(`Overwrote ${SOURCES_FILE}`)
    } else {
      await appendFile(SOURCES_FILE, '\n' + block)
      console.log(`Appended to ${SOURCES_FILE}`)
    }
  } else {
    await writeFile(SOURCES_FILE, DIALECT_BLOCK + '\n' + block)
    console.log(`Created ${SOURCES_FILE}`)
  }
})

function detectDelimiter(line) {
  const candidates = [',', ';', '\t', '|', '~']
  return candidates.reduce((best, d) =>
    line.split(d).length > line.split(best).length ? d : best
  , ',')
}

function parseCSVLine(line, delimiter) {
  const results = []
  let current = ''
  let inQuotes = false
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === delimiter && !inQuotes) {
      results.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  results.push(current.trim())
  return results
}

function isValidIdentifier(name) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)
}

function toIdentifier(name) {
  const parts = name.split(/[^a-zA-Z0-9]+/).filter(Boolean)
  if (!parts.length) return '_'
  return parts[0][0].toLowerCase() + parts[0].slice(1) +
    parts.slice(1).map(p => p[0].toUpperCase() + p.slice(1)).join('')
}

function createBlock(sourceName, headers) {
  const fields = headers
    .map(col => isValidIdentifier(col) ? `    ${col}` : `    ${toIdentifier(col)} "${col}"`)
    .join('\n')
  return `logical-source ${sourceName} {
  type csv
  source "file:input/${sourceName}.csv"
  dialect Comma

  referenceables
${fields}
}\n`
}

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans) }))
}
