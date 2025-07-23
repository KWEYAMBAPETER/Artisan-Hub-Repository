'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    createRoleIfNotExists(strapi, {
      name: "Artist",
      type: "artist",
      description: "Registered artists",
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
