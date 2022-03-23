import * as ns from './namespaces.js'

function isNotCsvwTriple (quad) {
  if (quad.predicate.value.startsWith(ns.csvw('').value)) {
    return false
  }

  if (ns.rdf.type.equals(quad.predicate) && quad.object.value.startsWith(ns.csvw('').value)) {
    return false
  }

  return true
}

export default isNotCsvwTriple
