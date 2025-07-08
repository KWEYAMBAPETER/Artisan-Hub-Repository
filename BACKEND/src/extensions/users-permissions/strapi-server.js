"use strict";

const utils = require("@strapi/utils");
const { ApplicationError, ValidationError } = utils.errors;
const { sanitize } = utils;

module.exports = (plugin) => {
  plugin.controllers.auth.register = async (ctx) => {
    // console.log("Custom controller override running ...")
    const pluginStore = strapi.store({
      type: "plugin",
      name: "users-permissions",
    });
    const settings = await pluginStore.get({ key: "advanced" });

    if (!settings.allow_register) {
      throw new ApplicationError("Registration is disabled");
    }

    const { username, email, password, role } = ctx.request.body;

    if (!username || !email || !password || !role) {
      throw new ValidationError(
        "All fields (username, email, password, role) are required"
      );
    }

    const existingUser = await strapi
      .query("plugin::users-permissions.user")
      .findOne({
        where: { email: email.toLowerCase() },
      });

    if (existingUser) {
      throw new ValidationError("Email is already taken");
    }

    const roleEntry = await strapi
      .query("plugin::users-permissions.role")
      .findOne({
        where: { name: role },
      });

    if (!roleEntry) {
      throw new ValidationError("Invalid role");
    }

    const newUser = await strapi
      .plugin("users-permissions")
      .service("user")
      .add({
        email: email.toLowerCase(),
        username,
        password,
        role: roleEntry.id,
        // confirmed: settings.email_confirmation,
        confirmed: true,
        provider: "local",
      });

    const newUserWithRole = await strapi
      .query("plugin::users-permissions.user")
      .findOne({
        where: { id: newUser.id },
        populate: ["role"],
      });

    // Email confirmation flow
    if (settings.email_confirmation) {
      await strapi
        .plugin("users-permissions")
        .service("user")
        .sendConfirmationEmail(newUser);
      return ctx.send({ user: newUserWithRole });
    }

    // Replace sanitizeUser with sanitize.output()
    const sanitizedUser = await sanitize.contentAPI.output(
      newUserWithRole,
      strapi.getModel("plugin::users-permissions.user")
    );

    const jwt = strapi
      .plugin("users-permissions")
      .service("jwt")
      .issue({ id: newUser.id });

    return ctx.send({
      jwt,
      user: sanitizedUser,
    });
  };

  plugin.controllers.auth.callback = async (ctx) => {
    // console.log("Custom login override running ...");

    const { identifier, password } = ctx.request.body;

    if (!identifier || !password) {
      throw new ValidationError("Missing identifier or password");
    }

    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: {
        $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
      },
      populate: ["role"],
    });

    if (!user) {
      throw new ValidationError("Invalid identifier or password");
    }

    const validPassword = await strapi
      .plugin("users-permissions")
      .service("user")
      .validatePassword(password, user.password);

    if (!validPassword) {
      throw new ValidationError("Invalid identifier or password");
    }

    if (user.blocked) {
      throw new ApplicationError(
        "Your account has been blocked by the administrator"
      );
    }

    if (!user.confirmed) {
      throw new ApplicationError("Your account email is not confirmed");
    }

    const sanitizedUser = await sanitize.contentAPI.output(
      user,
      strapi.getModel("plugin::users-permissions.user")
    );

    const jwt = strapi
      .plugin("users-permissions")
      .service("jwt")
      .issue({ id: user.id });

    return ctx.send({
      jwt,
      user: sanitizedUser,
    });
  };

  plugin.controllers.user.me = async (ctx) => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized();
    }

    const fullUser = await strapi
      .query("plugin::users-permissions.user")
      .findOne({
        where: { id: user.id },
        populate: ["role", "profile_photo"],
      });

    const sanitizedUser = await sanitize.contentAPI.output(
      fullUser,
      strapi.getModel("plugin::users-permissions.user")
    );

    return ctx.send(sanitizedUser);
  };

  return plugin;
};
