const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::users-permissions.user', ({ strapi }) => ({

  async update(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in to update your profile.");
    }

    const { profile_photo, firstName, lastName, bio } = ctx.request.body;

    const updateData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(bio && { bio }),
      ...(profile_photo && { profile_photo }),
    };

    try {
      const updatedUser = await strapi.documents('plugin::users-permissions.user').update({
        documentId: user.documentId || user.id, // Strapi 5 prefers documentId
        data: updateData,
        populate: ['profile_photo'],
      });

      const sanitizedUser = await this.sanitizeOutput(updatedUser, ctx);
      return this.transformResponse(sanitizedUser);
    } catch (err) {
      strapi.log.error('Error updating user profile:', err);
      return ctx.badRequest('Profile update failed', { error: err });
    }
  },

  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in.");
    }

    try {
      const fullUser = await strapi.documents('plugin::users-permissions.user').findOne({
        documentId: user.documentId || user.id,
        populate: ['profile_photo'],
      });

      const sanitizedUser = await this.sanitizeOutput(fullUser, ctx);
      return this.transformResponse(sanitizedUser);
    } catch (err) {
      strapi.log.error('Error fetching current user:', err);
      return ctx.badRequest('Unable to fetch user profile', { error: err });
    }
  },

}));