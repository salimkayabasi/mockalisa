const { parse } = require('yaml');
const { resolve, isAbsolute } = require('path');
const { readFileSync, existsSync } = require('fs');
const merge = require('lodash.merge');

const cwd = process.cwd();

const parser = p =>
  parse(readFileSync(isAbsolute(p) ? p : resolve(cwd, p), 'utf8'));

const merger = paths => {
  const [first, ...rest] = paths
    .filter(Boolean)
    .map(p => (isAbsolute(p) ? p : resolve(cwd, p)))
    .filter(t => existsSync(t));
  return rest.reduce(
    (result, current) => merge(result, parser(current)),
    parser(first),
  );
};

module.exports = {
  parser,
  merger,
};
