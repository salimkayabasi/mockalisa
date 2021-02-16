const { resolve } = require('path');

process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';
process.env.NODE_CONFIG_DIR = resolve(__dirname, '../../config');
