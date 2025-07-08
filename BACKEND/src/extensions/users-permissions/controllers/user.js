const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
  async update(ctx) {
    // You can add custom logic here before the update
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in to update your profile.");
    }

    const { profile_photo, firstName, lastName, bio } = ctx.request.body;

    // Build update payload
    const updateData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(bio && { bio }),
      ...(profile_photo && { profile_photo }),
    };

    try {
      // Perform the update
      const updatedUser = await strapi.entityService.update(
        'plugin::users-permissions.user',
        user.id,
        {
          data: updateData,
          populate: ['profile_photo'],
        }
      );

      // Return sanitized response
      const sanitizedUser = await this.sanitizeOutput(updatedUser, ctx);
      return this.transformResponse(sanitizedUser);
    } catch (err) {
      strapi.log.error('Error updating user profile:', err);
      return ctx.badRequest('Profile update failed', { error: err });
    }

    // const response = await super.update(ctx);
    // // You can add custom logic here after the update
    // return response;
  },
}));