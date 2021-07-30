import { csvw, rdf } from '@tpluscode/rdf-ns-builders/strict'

const csvwNs = csvw().value

/**
 * Filter callback to remove `csvw:` quads which are generated as per the CSVW processing standard
 *
 * @param quad
 * @returns {boolean}
 */
export function removeCsvwTriples (quad) {
  if (quad.predicate.value.startsWith(csvwNs)) {
    return false
  }
  if (rdf.type.equals(quad.predicate) && quad.object.value.startsWith(csvwNs)) {
    return false
  }
  return true
}
