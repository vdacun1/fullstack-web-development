module.exports = async () => {
  await globalThis.__MONGO_SERVER__.stop();
  await globalThis.__REDIS_SERVER__.stop();
};
