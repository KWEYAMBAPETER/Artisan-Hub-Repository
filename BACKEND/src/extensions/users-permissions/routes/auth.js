module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/local/register',
      handler: 'plugin::users-permissions.auth.register',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};