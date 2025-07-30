module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "sendgrid", // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: env("SENDGRID_DEFAULT_FROM"),
        defaultReplyTo: env("SENDGRID_REPLY_TO"),
        testAddress: env("SENDGRID_DEFAULT_FROM"),
      },
    },
  },
  // "users-permissions": {
  //   config: {
  //     register: {
  //       allowedFields: ["role"],
  //     },
  //   },
  // },
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["role", "profile_photo", "username", "email", "password"],
      },
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
