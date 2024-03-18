const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use("/authenticate", require("./app/presentation/routes/authentication"));
app.listen(port, () => {
  console.info(`\n\tApp listening on: http://localhost:${port}/\n`);
});
