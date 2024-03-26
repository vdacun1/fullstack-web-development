const SequelizeRepository = require("./infrastructure/db/SequelizeRepository");

const app = require("./app.js");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;

const sequelize = SequelizeRepository.config();
SequelizeRepository.setup(sequelize);

app.listen(PORT, () => {
  console.info(`\n\tApp listening on: http://localhost:${PORT}/\n`);
});
