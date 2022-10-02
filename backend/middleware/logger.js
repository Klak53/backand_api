const logger = (req, res, next) => {
  let color = 0;

  switch (req.method) {
    case 'GET':
      color = 32;
      break;
    case 'POST':
      color = 33;
      break;
    case 'PATCH':
      color = 34;
      break;
    case 'DELETE':
      color = 31;
      break;
    default:
      color = 0;
      break;
  }

  console.log(`\x1B[${color}m${req.method}\x1B[m ${req.protocol}//${req.get('host')}${req.originalUrl}`);

  next();
};

module.exports = logger;
