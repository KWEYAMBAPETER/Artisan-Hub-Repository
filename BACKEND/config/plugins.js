// module.exports = ({ env }) => ({
//     email: {
//         config: {
//             provider: 'sendgrid',
//             providerOptions: {
//                 host: env('SENDGRID_HOST'),
//                 port: 587,
//                 auth: {
//                     user: 'apiKey',
//                     pass: env('SENDGRID_API_KEY'),
//                 },
//             },
//             settings: {
//                 defaultFrom: env('SENDGRID_DEFAULT_FROM'),
//                 defaultReplyTo: env('SENDGRID_REPLY_TO'),
//             },
//         },
//     },
// });

module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('SENDGRID_DEFAULT_FROM'),
        defaultReplyTo: env('SENDGRID_REPLY_TO'),
        testAddress: env('SENDGRID_DEFAULT_FROM'),
      },
    },
  },
  // ...
});
