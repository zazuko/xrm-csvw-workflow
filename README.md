# Template for a Barnard59 pipeline

Fork this repo to set up a project-specific pipeline which transform CSVW into RDF using CSVW mapping files.

See https://gitlab.ldbar.ch/tomasz.pluskiewicz/pipeline-example/ for a running example

## Setting up

Once the template is forked:

1. create the XRM files in the `mappings` directory
2. copy source CSVs to `input` directory

Make sure to commit the `input`, `mapping` and `src-gen` directories.

Push and watch GitLab pipeline for results.

## Parameters

The pipeline requires three parameters, which are set as environment variables:

| ENV variable | default | description |
| -- | -- | -- |
| MAPPINGS_DIR | `src-gen/*.json` | [glob pattern](https://www.npmjs.com/package/glob) for (XRM-generated) csvw mapping files |
| INPUT_DIR | `input` | location of input CSV files |
| OUTPUT | `output/transformed.nt` | path to write resulting n-triples |

They are stored in the `.env.defaults` file.

Note that if the `OUTPUT` is changed, then artifacts section of `gitlab-ci.yml` has to be updated so that the resulting file is picked up and stored as artifact.

### Configuring in GitLab CI

The configuration variables can be overridden by defining variables in GitLab's [CI/CD settings](https://gitlab.ldbar.ch/help/ci/variables/README#variables)

## Running locally

It is possible to run locally with `npm start`.

Parameters can be changed locally by creating a copy of the `.env.defaults` file

```
cp .env.default .env
```

The `.env` file is ignored from the repository
