module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // Notify Admin
    await strapi.plugin('email').services.email.send({
      to: 'vianneykimuri@gmail.com',
      subject: `New Contact Message from ${result.name} - ArtisanHub`,
      text: `
        Subject: ${result.subject}
        Message: ${result.message}
        From: ${result.name} <${result.email}>

        From ArtisanHub Platform
      `,
    });

    // Auto-response to sender
    await strapi.plugin('email').services.email.send({
      to: result.email,
      subject: 'We received your message at ArtisanHub!',
      text: `
        Hi ${result.name},

        Thanks for reaching out! We've received your message:
        "${result.message}"

        Our team will get back to you soon.

        — The ArtisanHub Team
      `,
    });
  }
};