const cls = require('cls-hooked');
const uuid = require('uuid');

const namespace = cls.createNamespace('app');
const Context = {
  create: (req, res, next) => {
    // Get request id from header or generate a new one
    const requestId = req.headers['x-request-id'] || uuid.v4();

    namespace.run(() => {
      namespace.set('requestId', requestId);
      next();
    });
  },

  getRequestId: () => {
    const namespace = cls.getNamespace('app');
    return namespace.get('requestId') || 'no-request-id';
  },
};

module.exports = Context;
