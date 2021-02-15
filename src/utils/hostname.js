const os = require('os');

const getCurrentAddresses = () => {
  const interfaces = [].concat(...Object.values(os.networkInterfaces()));
  const [{ address } = {}] = interfaces.filter(
    i => i.family === 'IPv4' && i.address !== '127.0.0.1',
  );
  return address || 'unknown IP';
};

module.exports = {
  getCurrentAddresses,
};
