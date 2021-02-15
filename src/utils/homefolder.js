const { existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const homedir = require('os').homedir();

const { name: homeFolderName } = require('../../package.json');

const homeFolderPath = resolve(homedir, `.${homeFolderName}`);

const createHomeFolder = () => {
  if (!existsSync(homeFolderPath)) {
    mkdirSync(homeFolderPath);
  }
};

module.exports = {
  createHomeFolder,
  homeFolderPath,
};
