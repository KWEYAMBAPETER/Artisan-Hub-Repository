'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    try {
      // Attempt to require and apply the users-permissions override
      const usersPermissionsOverride = require('./extensions/users-permissions/strapi-server');
      if (strapi.plugins && strapi.plugins['users-permissions']) {
        // Apply the override and get the modified plugin
        const plugin = usersPermissionsOverride(strapi.plugins['users-permissions']);
        // Explicitly assign custom controllers
        if (plugin && plugin.controllers && plugin.controllers.auth) {
          strapi.plugins['users-permissions'].controllers.auth.register = plugin.controllers.auth.register;
          strapi.plugins['users-permissions'].controllers.auth.callback = plugin.controllers.auth.callback;
        }
        if (plugin && plugin.controllers && plugin.controllers.user) {
          strapi.plugins['users-permissions'].controllers.user.me = plugin.controllers.user.me;
        }
        // strapi.log.info('[DEBUG] users-permissions override applied from src/index.js');
      }
    } catch (err) {
      strapi.log.error('[ERROR] Failed to apply users-permissions override:', err);
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    await createRoleIfNotExists(strapi, {
      name: "Artist",
      type: "artist",
      description: "Manages the artist dashboard and all aspects of artwork on ArtisanHub platform",
    });
    await createRoleIfNotExists(strapi, {
      name: "Buyer",
      type: "buyer",
      description: "Regular user on ArtisanHub. Browses and purchases artwork on the platform",
    });
  },
};

async function createRoleIfNotExists(strapi, roleData) {
  const existing = await strapi.db.query("plugin::users-permissions.role").findOne({
    where: { type: roleData.type },
  });

  if (!existing) {
    await strapi.db.query("plugin::users-permissions.role").create({ data: roleData });
    strapi.log.info(`Created role '${roleData.name}'`);
  }
}
