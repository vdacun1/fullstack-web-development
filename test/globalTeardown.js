module.exports = async () => {
  await globalThis.__MONGOSERVER__.stop();
  await globalThis.__REDISSERVER__.stop();
};
