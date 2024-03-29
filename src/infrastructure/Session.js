const cls = require("cls-hooked");
const uuid = require("uuid");

const namespace = cls.createNamespace("app");
console.log("Session:", "Namespace created");
const Session = {
  setContext: (req, res, next) => {
    namespace.run(() => {
      const requestId = uuid.v4();
      namespace.set("requestId", requestId);
      next();
    });
  },

  getRequestId: () => {
    const namespace = cls.getNamespace("app");
    return namespace.get("requestId") || "no-request-id";
  },
};

module.exports = Session;
