const uuid = require('uuid');

let request = {
  id: 'no-request-id',
};

const Context = {
  create: (req, res, next) => {
    // Get request id from header or generate a new one
    request.id = req.headers['x-request-id'] || uuid.v4();
    next();
  },

  getRequestId: () => {
    return request.id;
  },
};

module.exports = Context;
