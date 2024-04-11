const CacheKeys = {
  USER_TOY_LIST: (userId) => `user_toy_list_${userId}`,
  NEW_TOYS_ADDED: 'new_toys_added',
  USER_TOY_RANKING: 'user_toy_ranking',
};

module.exports = CacheKeys;
