const mongoose = require("mongoose");
const app = require("./app");
const MongoDB = require("./infrastructure/MongoDB");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;

mongoose.connect(MongoDB.getURI()).then(() =>
  app.listen(PORT, () => {
    console.info(`\n\tApp listening on: http://localhost:${PORT}/\n`);
  }),
);
