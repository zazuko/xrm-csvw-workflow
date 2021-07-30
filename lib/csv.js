import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Opens the source of the given CSVW mapping to transform.
 *
 * By default it returns a file stream, opened from the `csvw:url` property. Modify
 * this function to change the input file's origin, for example to load from the web,
 * such as by downloading an S3 link
 *
 * @param csvwPath
 * @returns {ReadStream}
 */
export function openFromCsvw (csvwPath) {
  const csvw = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../${csvwPath}`)).toString())

  return fs.createReadStream(path.resolve(__dirname, csvw.url))
}
