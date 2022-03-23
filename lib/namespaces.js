import rdf from 'rdf-ext'

const csvw = rdf.namespace('http://www.w3.org/ns/csvw#')
const rdfns = rdf.namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const schema = rdf.namespace('http://schema.org/')

export {
  csvw,
  rdfns as rdf,
  schema
}
