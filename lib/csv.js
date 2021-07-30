import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function openFromCsvw (csvwPath) {
  const csvw = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../${csvwPath}`)).toString())

  return fs.createReadStream(path.resolve(__dirname, csvw.url))
}

export function setCsvwVariable (pipeline, fileName) {
  pipeline.variables.set('csvw', fileName)
}
